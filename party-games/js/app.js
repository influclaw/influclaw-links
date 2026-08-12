(() => {
  "use strict";

  // Relative path so it works on GitHub Pages project sites (user.github.io/repo/)
  const CARDS_BASE = "cards";
  const STORAGE_KEY = "party-games-state-v2";
  const COOKIE_NAME = "party_games_state_v2";

  const GAMES = {
    amigos: {
      id: "amigos",
      name: "Amigos de mierda",
      short: "Vota quién es el más… de la mesa",
      icon: "assets/icon-amigos.png",
      className: "amigos",
      count: 111,
      path: "amigos",
      pad: 3,
    },
    mente: {
      id: "mente",
      name: "Mente vacuna",
      short: "Adivina lo que pensará la mayoría",
      icon: "assets/icon-mente.png",
      className: "mente",
      count: 252,
      path: "mente",
      pad: 3,
    },
    wavelength: {
      id: "wavelength",
      name: "Wavelength",
      short: "Pistas en un espectro de opuestos",
      icon: "assets/icon-wavelength.png",
      className: "wavelength",
      count: 250,
      path: "wavelength",
      pad: 3,
    },
  };

  const RULES = {
    amigos: `
      <p class="meta">3–22 jugadores · 20–40 min · +18</p>
      <p>En <strong>Amigos de mierda</strong> puedes decirle a tus amigos lo que siempre pensaste… y nunca te atreviste.</p>
      <h4>Cómo se juega</h4>
      <ol>
        <li>Un jugador roba una carta del mazo y la lee en voz alta.</li>
        <li>Todos piensan un momento a quién de la mesa se ajusta mejor.</li>
        <li>A la cuenta de tres, todos votan <strong>señalando con el dedo</strong> a un jugador.</li>
        <li>Quien recibe más votos “gana” la carta y se la queda.</li>
        <li>El primero en conseguir <strong>5 cartas</strong> es coronado <em>Amigo de mierda</em>.</li>
      </ol>
      <h4>En el móvil</h4>
      <ul>
        <li><strong>Swipe izquierda</strong> = siguiente · <strong>derecha</strong> = anterior.</li>
        <li><strong>Swipe arriba</strong>: quitar del mazo (se guarda en Quitadas).</li>
        <li><strong>🗑</strong>: ver quitadas, seleccionar y recuperar.</li>
        <li>El progreso se guarda al recargar.</li>
      </ul>
    `,
    mente: `
      <p class="meta">4–20 jugadores · party · familia</p>
      <p>En <strong>Mente vacuna</strong> no gana quien es más original: gana quien piensa como el grupo.</p>
      <h4>Preparación</h4>
      <ul>
        <li>Cartas de pregunta en un montón accesible.</li>
        <li>Cada jugador con hoja/lápiz (o apunten en el móvil).</li>
        <li>Fichas de puntuación y la “vaca rosa” en el centro.</li>
      </ul>
      <h4>Cómo se juega</h4>
      <ol>
        <li>Un jugador elige una carta de pregunta y la lee en voz alta.<br><em>Ej.: «¿Cuál es tu casa de Hogwarts favorita?»</em></li>
        <li>Todos anotan en secreto la respuesta que creen que dará <strong>la mayoría</strong>.</li>
        <li>Se revelan las respuestas.</li>
        <li>Si coincidiste con la mayoría, sumas <strong>1 punto</strong>.</li>
        <li>Si diste una respuesta que <strong>nadie más</strong> ha dado, te llevas la <strong>vaca rosa</strong>.</li>
      </ol>
      <h4>Objetivo y vaca rosa</h4>
      <ul>
        <li>Gana quien llega a <strong>8 puntos</strong> sin tener la vaca rosa.</li>
        <li>Tener la vaca rosa te impide ganar, hasta que otro jugador se la quede.</li>
      </ul>
      <p><img class="rules-img" src="assets/mente-reglas.png" alt="Reglas Mente vacuna" /></p>
      <h4>En el móvil</h4>
      <ul>
        <li>← siguiente · → anterior · ↑ quitar · 🗑 quitadas · 🔀 barajar.</li>
      </ul>
    `,
    wavelength: `
      <p class="meta">2 equipos · juego social de adivinar en un espectro</p>
      <p><strong>Wavelength</strong>: un “médium” conoce la diana de la ruleta y da una pista según la carta de opuestos.</p>
      <h4>Resumen de ronda</h4>
      <ol>
        <li>Equipos se turnan. Un jugador es el <strong>Médium</strong>.</li>
        <li>Gira la ruleta (pantalla cerrada) y mira en secreto la diana.</li>
        <li>Roba una carta con dos extremos (ej. <em>Frío ← → Caliente</em>).</li>
        <li>Da <strong>una sola pista</strong> que sitúe el concepto en el punto del espectro.</li>
        <li>Su equipo mueve el marcador; el rival puede apostar izquierda/derecha.</li>
        <li>Se abre la pantalla y se puntúa.</li>
      </ol>
      <h4>En el móvil</h4>
      <ul>
        <li>Móvil <strong>de lado</strong> delante de la ruleta. Flechas ◀ ▶ marcan los extremos.</li>
        <li>Español por defecto · <strong>ES/EN</strong> · <strong>📷</strong> foto de la carta.</li>
        <li>← siguiente · → anterior · ↑ quitar · 🗑 recuperar quitadas.</li>
      </ul>
    `,
  };

  // ---------- state ----------
  let wavelengthCards = [];
  let currentGameId = null;
  let decks = {};
  let wlLang = "es";
  let wlShowPhoto = false;

  // removed sheet
  let removedGameId = null;
  let selectedRemoved = new Set();
  let previewRemovedId = null;

  // gesture
  let touchStart = null;
  let dragging = false;

  // ---------- DOM ----------
  const $ = (sel) => document.querySelector(sel);
  const views = {
    home: $("#view-home"),
    rules: $("#view-rules"),
    play: $("#view-play"),
    wavelength: $("#view-wavelength"),
  };

  function showView(name) {
    Object.values(views).forEach((v) => v.classList.remove("active"));
    views[name].classList.add("active");
  }

  function toast(msg, ms = 1600) {
    const el = $("#toast");
    el.textContent = msg;
    el.hidden = false;
    clearTimeout(toast._t);
    toast._t = setTimeout(() => {
      el.hidden = true;
    }, ms);
  }

  // ---------- persistence ----------
  function setCookie(name, value, days = 365) {
    const max = 3500;
    const chunks = [];
    for (let i = 0; i < value.length; i += max) {
      chunks.push(value.slice(i, i + max));
    }
    for (let i = 0; i < 30; i++) {
      document.cookie = `${name}_${i}=; Max-Age=0; path=/; SameSite=Lax`;
    }
    document.cookie = `${name}_n=${chunks.length}; Max-Age=${days * 86400}; path=/; SameSite=Lax`;
    chunks.forEach((chunk, i) => {
      document.cookie = `${name}_${i}=${encodeURIComponent(chunk)}; Max-Age=${days * 86400}; path=/; SameSite=Lax`;
    });
  }

  function getCookieChunks(name) {
    const map = Object.fromEntries(
      document.cookie
        .split(";")
        .map((c) => c.trim())
        .filter(Boolean)
        .map((c) => {
          const i = c.indexOf("=");
          return [c.slice(0, i), c.slice(i + 1)];
        })
    );
    const n = parseInt(map[`${name}_n`] || "0", 10);
    if (!n) return null;
    let out = "";
    for (let i = 0; i < n; i++) {
      const part = map[`${name}_${i}`];
      if (part == null) return null;
      out += decodeURIComponent(part);
    }
    return out;
  }

  function saveState() {
    const payload = {
      decks,
      wlLang,
      wlShowPhoto,
      updatedAt: Date.now(),
    };
    const raw = JSON.stringify(payload);
    try {
      localStorage.setItem(STORAGE_KEY, raw);
    } catch (_) {}
    try {
      setCookie(COOKIE_NAME, raw);
    } catch (_) {}
  }

  function loadState() {
    let raw = null;
    try {
      raw = localStorage.getItem(STORAGE_KEY);
    } catch (_) {}
    if (!raw) {
      try {
        raw = localStorage.getItem("party-games-state-v1");
      } catch (_) {}
    }
    if (!raw) {
      try {
        raw = getCookieChunks(COOKIE_NAME);
      } catch (_) {}
    }
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch (_) {
      return null;
    }
  }

  // ---------- deck helpers ----------
  function rangeIds(n) {
    return Array.from({ length: n }, (_, i) => i + 1);
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function defaultDeck(gameId) {
    const g = GAMES[gameId];
    return {
      order: shuffle(rangeIds(g.count)),
      index: 0,
      removed: [],
    };
  }

  function ensureDecks(saved) {
    for (const id of Object.keys(GAMES)) {
      const g = GAMES[id];
      const s = saved && saved.decks && saved.decks[id];
      const valid = new Set(rangeIds(g.count));

      if (s && Array.isArray(s.order) && typeof s.index === "number") {
        let order = s.order.filter((x) => valid.has(x));
        let removed = Array.isArray(s.removed)
          ? s.removed.filter((x) => valid.has(x))
          : [];

        // no duplicates between order and removed
        const inOrder = new Set(order);
        removed = removed.filter((x) => !inOrder.has(x));

        // cards missing from both → put back in order (migration / repair)
        const known = new Set([...order, ...removed]);
        for (const n of valid) {
          if (!known.has(n)) order.push(n);
        }

        // if order empty but we have data, keep empty order (all removed)
        if (order.length === 0 && removed.length === 0) {
          decks[id] = defaultDeck(id);
        } else {
          decks[id] = {
            order,
            removed,
            index:
              order.length === 0
                ? 0
                : Math.min(Math.max(0, s.index), order.length - 1),
          };
        }
      } else {
        decks[id] = defaultDeck(id);
      }
    }
  }

  function cardUrl(gameId, id) {
    const g = GAMES[gameId];
    const num = String(id).padStart(g.pad, "0");
    return `${CARDS_BASE}/${g.path}/${num}.png`;
  }

  function currentId(gameId) {
    const d = decks[gameId];
    if (!d || !d.order.length) return null;
    return d.order[d.index];
  }

  function padId(id) {
    return String(id).padStart(3, "0");
  }

  function refreshCurrentView(gameId) {
    if (gameId === "wavelength") renderWavelength();
    else if (gameId === currentGameId) renderPlay();
  }

  function updateRemovedBadges(gameId) {
    const n = (decks[gameId] && decks[gameId].removed
      ? decks[gameId].removed.length
      : 0);
    if (gameId === "wavelength") {
      const el = $("#wl-removed-count");
      if (el) el.textContent = String(n);
    } else {
      const el = $("#removed-count");
      if (el) el.textContent = String(n);
    }
  }

  // ---------- home ----------
  function renderHome() {
    const list = $("#game-list");
    list.innerHTML = "";
    for (const g of Object.values(GAMES)) {
      const btn = document.createElement("button");
      btn.className = `game-card ${g.className}`;
      btn.type = "button";
      btn.innerHTML = `
        <div class="game-icon-wrap"><img src="${g.icon}" alt="" /></div>
        <div class="game-info">
          <h3>${g.name}</h3>
          <p>${g.short}</p>
        </div>
        <span class="game-arrow">›</span>
      `;
      btn.addEventListener("click", () => openRules(g.id));
      list.appendChild(btn);
    }
  }

  function openRules(gameId) {
    currentGameId = gameId;
    const g = GAMES[gameId];
    $("#rules-title").textContent = "Reglas";
    $("#rules-name").textContent = g.name;
    $("#rules-icon").src = g.icon;
    $("#rules-content").innerHTML = RULES[gameId];
    showView("rules");
  }

  function startGame() {
    if (!currentGameId) return;
    if (currentGameId === "wavelength") {
      showView("wavelength");
      renderWavelength();
    } else {
      showView("play");
      renderPlay();
    }
  }

  // ---------- play (amigos / mente) ----------
  function renderPlay() {
    const g = GAMES[currentGameId];
    const d = decks[currentGameId];
    $("#play-title").textContent = g.name;
    const totalLeft = d.order.length;
    const removedN = d.removed.length;
    $("#play-counter").textContent =
      totalLeft === 0
        ? `0 en mazo · ${removedN} quitadas`
        : `${d.index + 1} / ${totalLeft} · ${removedN} quitadas`;
    updateRemovedBadges(currentGameId);

    const img = $("#card-image");
    const empty = $("#card-empty");
    const face = $("#card-face");
    face.style.transform = "";

    if (!totalLeft) {
      img.hidden = true;
      empty.hidden = false;
      return;
    }
    empty.hidden = true;
    img.hidden = false;
    const id = currentId(currentGameId);
    img.src = cardUrl(currentGameId, id);
    img.alt = `Carta ${id}`;
  }

  function goNext(gameId = currentGameId) {
    const d = decks[gameId];
    if (!d.order.length) return;
    d.index = (d.index + 1) % d.order.length;
    saveState();
    refreshCurrentView(gameId);
  }

  function goPrev(gameId = currentGameId) {
    const d = decks[gameId];
    if (!d.order.length) return;
    d.index = (d.index - 1 + d.order.length) % d.order.length;
    saveState();
    refreshCurrentView(gameId);
  }

  function removeCurrent(gameId = currentGameId) {
    const d = decks[gameId];
    if (!d.order.length) return;
    const removed = d.order.splice(d.index, 1)[0];
    d.removed.push(removed);
    if (d.index >= d.order.length) d.index = Math.max(0, d.order.length - 1);
    saveState();
    toast(`Carta ${padId(removed)} quitada`);
    refreshCurrentView(gameId);
  }

  function shuffleDeck(gameId = currentGameId) {
    const d = decks[gameId];
    if (d.order.length < 2) {
      toast("Pocas cartas para barajar");
      return;
    }
    const current = d.order[d.index];
    d.order = shuffle(d.order);
    d.index = Math.max(0, d.order.indexOf(current));
    saveState();
    toast("Mazo barajado");
    refreshCurrentView(gameId);
  }

  function resetDeck(gameId = currentGameId) {
    decks[gameId] = defaultDeck(gameId);
    saveState();
    toast("Mazo restaurado y barajado");
    refreshCurrentView(gameId);
  }

  // ---------- removed sheet ----------
  function openRemovedSheet(gameId) {
    removedGameId = gameId;
    selectedRemoved = new Set();
    previewRemovedId = null;
    renderRemovedSheet();
    $("#removed-sheet").hidden = false;
  }

  function closeRemovedSheet() {
    $("#removed-sheet").hidden = true;
    removedGameId = null;
    selectedRemoved = new Set();
    previewRemovedId = null;
  }

  function cardLabel(gameId, id) {
    if (gameId !== "wavelength") return "";
    const card = wavelengthCards.find((c) => c.id === id);
    if (!card) return "";
    if (wlLang === "en") {
      return `${card.izquierda} ← → ${card.derecha}`;
    }
    return `${card.izquierda_es || card.izquierda} ← → ${card.derecha_es || card.derecha}`;
  }

  function renderRemovedSheet() {
    const gameId = removedGameId;
    if (!gameId) return;
    const d = decks[gameId];
    const g = GAMES[gameId];
    const list = d.removed.slice().reverse(); // most recent first

    $("#removed-title").textContent = `Quitadas · ${g.name}`;
    $("#removed-sub").textContent =
      list.length === 0
        ? "Ninguna carta quitada"
        : `${list.length} carta${list.length === 1 ? "" : "s"} · toca para seleccionar (multi) · vista previa arriba`;

    const grid = $("#removed-grid");
    const empty = $("#removed-empty");
    grid.innerHTML = "";

    if (!list.length) {
      empty.hidden = false;
      grid.hidden = true;
      $("#removed-preview").hidden = true;
      $("#btn-restore").disabled = true;
      $("#removed-selected-count").textContent = "0 sel.";
      return;
    }

    empty.hidden = true;
    grid.hidden = false;

    for (const id of list) {
      const tile = document.createElement("button");
      tile.type = "button";
      tile.className = "removed-tile";
      if (selectedRemoved.has(id)) tile.classList.add("selected");
      if (previewRemovedId === id) tile.classList.add("previewing");
      tile.dataset.id = String(id);
      tile.innerHTML = `
        <img src="${cardUrl(gameId, id)}" alt="Carta ${padId(id)}" loading="lazy" />
        <span class="tile-id">#${padId(id)}</span>
        <span class="check">✓</span>
      `;
      tile.addEventListener("click", () => onRemovedTileClick(id));
      grid.appendChild(tile);
    }

    updateRemovedSelectionUI();
  }

  function onRemovedTileClick(id) {
    if (selectedRemoved.has(id)) {
      // segundo toque: deseleccionar
      selectedRemoved.delete(id);
      if (previewRemovedId === id) {
        const rest = [...selectedRemoved];
        previewRemovedId = rest.length ? rest[rest.length - 1] : null;
      }
    } else {
      selectedRemoved.add(id);
      previewRemovedId = id; // vista previa de la última seleccionada
    }
    renderRemovedSheet();
  }

  function updateRemovedSelectionUI() {
    const n = selectedRemoved.size;
    $("#removed-selected-count").textContent = `${n} sel.`;
    $("#btn-restore").disabled = n === 0;
    $("#btn-restore").textContent =
      n === 0 ? "Recuperar" : n === 1 ? "Recuperar 1" : `Recuperar ${n}`;

    const preview = $("#removed-preview");
    if (previewRemovedId != null && removedGameId) {
      preview.hidden = false;
      $("#removed-preview-img").src = cardUrl(removedGameId, previewRemovedId);
      $("#removed-preview-id").textContent = `#${padId(previewRemovedId)}`;
      $("#removed-preview-text").textContent = cardLabel(
        removedGameId,
        previewRemovedId
      );
    } else {
      preview.hidden = true;
    }
  }

  function selectAllRemoved() {
    if (!removedGameId) return;
    selectedRemoved = new Set(decks[removedGameId].removed);
    if (selectedRemoved.size && previewRemovedId == null) {
      previewRemovedId = decks[removedGameId].removed[
        decks[removedGameId].removed.length - 1
      ];
    }
    renderRemovedSheet();
  }

  function selectNoneRemoved() {
    selectedRemoved = new Set();
    previewRemovedId = null;
    renderRemovedSheet();
  }

  function restoreSelected() {
    if (!removedGameId || selectedRemoved.size === 0) return;
    const d = decks[removedGameId];
    const toRestore = [...selectedRemoved];
    const restoreSet = new Set(toRestore);

    d.removed = d.removed.filter((id) => !restoreSet.has(id));
    // insert restored cards after current index (or at start if empty)
    if (d.order.length === 0) {
      d.order = toRestore.slice();
      d.index = 0;
    } else {
      const insertAt = Math.min(d.index + 1, d.order.length);
      d.order.splice(insertAt, 0, ...toRestore);
    }

    saveState();
    toast(
      toRestore.length === 1
        ? `Carta ${padId(toRestore[0])} recuperada`
        : `${toRestore.length} cartas recuperadas`
    );

    selectedRemoved = new Set();
    previewRemovedId = null;
    renderRemovedSheet();
    refreshCurrentView(removedGameId);

    if (d.removed.length === 0) {
      // keep sheet open empty briefly so user sees it's empty, or close
      // close for cleaner UX
      closeRemovedSheet();
    }
  }

  // ---------- wavelength ----------
  function wlText(card) {
    if (!card) return { left: "—", right: "—" };
    if (wlLang === "en") {
      return { left: card.izquierda, right: card.derecha };
    }
    return {
      left: card.izquierda_es || card.izquierda,
      right: card.derecha_es || card.derecha,
    };
  }

  function renderWavelength() {
    const d = decks.wavelength;
    const totalLeft = d.order.length;
    const removedN = d.removed.length;
    $("#wl-counter").textContent =
      totalLeft === 0
        ? `0 en mazo · ${removedN} quitadas`
        : `${d.index + 1} / ${totalLeft} · ${removedN} quitadas`;
    updateRemovedBadges("wavelength");
    $("#btn-wl-lang").textContent = wlLang.toUpperCase();
    $("#btn-wl-photo").classList.toggle("active", wlShowPhoto);

    const spectrum = $("#wl-spectrum");
    const photoWrap = $("#wl-photo-wrap");
    const empty = $("#wl-empty");
    const cardEl = $("#wl-card");
    cardEl.style.transform = "";

    if (!totalLeft) {
      spectrum.style.visibility = "hidden";
      photoWrap.hidden = true;
      empty.hidden = false;
      return;
    }
    empty.hidden = true;
    spectrum.style.visibility = "visible";

    const id = currentId("wavelength");
    const card = wavelengthCards.find((c) => c.id === id) || {
      id,
      archivo: `${padId(id)}.png`,
      izquierda: "?",
      derecha: "?",
      izquierda_es: "?",
      derecha_es: "?",
    };
    const t = wlText(card);
    $("#wl-left").textContent = t.left;
    $("#wl-right").textContent = t.right;

    if (wlShowPhoto) {
      photoWrap.hidden = false;
      $("#wl-photo").src = cardUrl("wavelength", id);
    } else {
      photoWrap.hidden = true;
    }
  }

  // ---------- gestures (INVERTED: left = next, right = prev) ----------
  function bindGestures(el, gameIdGetter) {
    const onStart = (x, y) => {
      touchStart = { x, y, t: Date.now() };
      dragging = true;
    };
    const onMove = (x, y, targetEl) => {
      if (!dragging || !touchStart) return;
      const dx = x - touchStart.x;
      const dy = y - touchStart.y;
      const rotate = dx * 0.05;
      targetEl.style.transform = `translate(${dx}px, ${dy}px) rotate(${rotate}deg)`;

      const gameId = gameIdGetter();
      const fb =
        gameId === "wavelength" ? $("#wl-swipe-feedback") : $("#swipe-feedback");
      if (!fb) return;
      if (Math.abs(dy) > Math.abs(dx) && dy < -40) {
        fb.textContent = "QUITAR";
        fb.className = "swipe-feedback show remove";
      } else if (dx < -50) {
        // swipe left → siguiente
        fb.textContent = "SIGUIENTE";
        fb.className = "swipe-feedback show next";
      } else if (dx > 50) {
        // swipe right → anterior
        fb.textContent = "ANTERIOR";
        fb.className = "swipe-feedback show prev";
      } else {
        fb.className = "swipe-feedback";
        fb.textContent = "";
      }
    };
    const onEnd = (x, y, targetEl) => {
      if (!dragging || !touchStart) return;
      dragging = false;
      const dx = x - touchStart.x;
      const dy = y - touchStart.y;
      const gameId = gameIdGetter();
      targetEl.style.transform = "";
      const fb =
        gameId === "wavelength" ? $("#wl-swipe-feedback") : $("#swipe-feedback");
      if (fb) {
        fb.className = "swipe-feedback";
        fb.textContent = "";
      }

      const absX = Math.abs(dx);
      const absY = Math.abs(dy);
      const threshold = 70;

      if (absY > absX && dy < -threshold) {
        removeCurrent(gameId);
      } else if (absX > threshold) {
        // INVERTED: left = next, right = prev
        if (dx < 0) goNext(gameId);
        else goPrev(gameId);
      }
      touchStart = null;
    };

    el.addEventListener(
      "touchstart",
      (e) => {
        if (e.touches.length !== 1) return;
        const t = e.touches[0];
        onStart(t.clientX, t.clientY);
      },
      { passive: true }
    );
    el.addEventListener(
      "touchmove",
      (e) => {
        if (!dragging) return;
        e.preventDefault();
        const t = e.touches[0];
        const target =
          gameIdGetter() === "wavelength" ? $("#wl-card") : $("#card-face");
        onMove(t.clientX, t.clientY, target);
      },
      { passive: false }
    );
    el.addEventListener(
      "touchend",
      (e) => {
        const t = e.changedTouches[0];
        const target =
          gameIdGetter() === "wavelength" ? $("#wl-card") : $("#card-face");
        onEnd(t.clientX, t.clientY, target);
      },
      { passive: true }
    );

    el.addEventListener("mousedown", (e) => {
      onStart(e.clientX, e.clientY);
    });
    window.addEventListener("mousemove", (e) => {
      if (!dragging) return;
      const target =
        gameIdGetter() === "wavelength" ? $("#wl-card") : $("#card-face");
      if (
        !views.play.classList.contains("active") &&
        !views.wavelength.classList.contains("active")
      )
        return;
      onMove(e.clientX, e.clientY, target);
    });
    window.addEventListener("mouseup", (e) => {
      if (!dragging) return;
      const target =
        gameIdGetter() === "wavelength" ? $("#wl-card") : $("#card-face");
      onEnd(e.clientX, e.clientY, target);
    });
  }

  // ---------- wire UI ----------
  function wire() {
    $("#btn-rules-back").addEventListener("click", () => showView("home"));
    $("#btn-start").addEventListener("click", startGame);

    $("#btn-play-back").addEventListener("click", () => {
      currentGameId = null;
      showView("home");
    });
    $("#btn-shuffle").addEventListener("click", () => shuffleDeck(currentGameId));
    $("#btn-prev").addEventListener("click", () => goPrev(currentGameId));
    $("#btn-next").addEventListener("click", () => goNext(currentGameId));
    $("#btn-remove").addEventListener("click", () => removeCurrent(currentGameId));
    $("#btn-reset-deck").addEventListener("click", () => resetDeck(currentGameId));
    $("#btn-removed").addEventListener("click", () => openRemovedSheet(currentGameId));

    $("#btn-wl-back").addEventListener("click", () => {
      currentGameId = null;
      showView("home");
    });
    $("#btn-wl-shuffle").addEventListener("click", () => shuffleDeck("wavelength"));
    $("#btn-wl-prev").addEventListener("click", () => goPrev("wavelength"));
    $("#btn-wl-next").addEventListener("click", () => goNext("wavelength"));
    $("#btn-wl-remove").addEventListener("click", () => removeCurrent("wavelength"));
    $("#btn-wl-reset").addEventListener("click", () => resetDeck("wavelength"));
    $("#btn-wl-removed").addEventListener("click", () => openRemovedSheet("wavelength"));
    $("#btn-wl-lang").addEventListener("click", () => {
      wlLang = wlLang === "es" ? "en" : "es";
      saveState();
      renderWavelength();
      toast(wlLang === "es" ? "Idioma: español" : "Language: English");
    });
    $("#btn-wl-photo").addEventListener("click", () => {
      wlShowPhoto = !wlShowPhoto;
      saveState();
      renderWavelength();
    });

    // removed sheet
    $("#btn-removed-close").addEventListener("click", closeRemovedSheet);
    $("#btn-removed-close-2").addEventListener("click", closeRemovedSheet);
    $("#removed-backdrop").addEventListener("click", closeRemovedSheet);
    $("#btn-select-all").addEventListener("click", selectAllRemoved);
    $("#btn-select-none").addEventListener("click", selectNoneRemoved);
    $("#btn-restore").addEventListener("click", restoreSelected);

    bindGestures($("#deck-stage"), () => currentGameId);
    bindGestures($("#wl-stage"), () => "wavelength");

    window.addEventListener("keydown", (e) => {
      if (!$("#removed-sheet").hidden) {
        if (e.key === "Escape") closeRemovedSheet();
        return;
      }
      if (views.play.classList.contains("active")) {
        // inverted keyboard to match swipe feel: left = next
        if (e.key === "ArrowLeft") goNext(currentGameId);
        if (e.key === "ArrowRight") goPrev(currentGameId);
        if (e.key === "ArrowUp" || e.key === "Delete" || e.key === "Backspace") {
          e.preventDefault();
          removeCurrent(currentGameId);
        }
        if (e.key.toLowerCase() === "s") shuffleDeck(currentGameId);
        if (e.key.toLowerCase() === "r") openRemovedSheet(currentGameId);
      }
      if (views.wavelength.classList.contains("active")) {
        if (e.key === "ArrowLeft") goNext("wavelength");
        if (e.key === "ArrowRight") goPrev("wavelength");
        if (e.key === "ArrowUp" || e.key === "Delete" || e.key === "Backspace") {
          e.preventDefault();
          removeCurrent("wavelength");
        }
        if (e.key.toLowerCase() === "s") shuffleDeck("wavelength");
        if (e.key.toLowerCase() === "r") openRemovedSheet("wavelength");
        if (e.key.toLowerCase() === "l") {
          wlLang = wlLang === "es" ? "en" : "es";
          saveState();
          renderWavelength();
        }
        if (e.key.toLowerCase() === "p") {
          wlShowPhoto = !wlShowPhoto;
          saveState();
          renderWavelength();
        }
      }
    });
  }

  // ---------- boot ----------
  async function boot() {
    renderHome();
    wire();

    const saved = loadState();
    ensureDecks(saved);
    if (saved) {
      if (saved.wlLang === "en" || saved.wlLang === "es") wlLang = saved.wlLang;
      if (typeof saved.wlShowPhoto === "boolean") wlShowPhoto = saved.wlShowPhoto;
    }

    try {
      const res = await fetch("assets/wavelength-parejas.json");
      wavelengthCards = await res.json();
    } catch (err) {
      console.error(err);
      toast("No se pudo cargar el JSON de Wavelength");
      wavelengthCards = [];
    }

    showView("home");
  }

  boot();
})();
