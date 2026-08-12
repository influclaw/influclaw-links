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
      icon: "assets/icon-amigos.png?v=2",
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
      icon: "assets/icon-wavelength.png?v=2",
      className: "wavelength",
      count: 250,
      path: "wavelength",
      pad: 3,
    },
    timesup: {
      id: "timesup",
      name: "Time's Up",
      short: "Adivina personajes en 3 fases",
      icon: "assets/icon-timesup.png",
      className: "timesup",
      count: 354,
      path: "timesup",
      pad: 3,
    },
  };

  const RULES = {
    amigos: `
      <p class="meta">3–22 jugadores · 20–40 min · +18</p>
      <p>En <strong>Amigos de mierda</strong> puedes decirle a tus amigos lo que siempre pensaste… y nunca te atreviste.</p>
      <h4>Cómo se juega</h4>
      <ol>
        <li>🃏 Un jugador roba una carta del mazo y la lee en voz alta.</li>
        <li>Todos piensan un momento a quién de la mesa se ajusta mejor.</li>
        <li>A la cuenta de tres, todos votan <strong>señalando con el dedo</strong> 👉 a un jugador.</li>
        <li>Quien recibe más votos “gana” la carta y se la queda.</li>
        <li>El primero en conseguir <strong>5 cartas</strong> es coronado <em>Amigo de mierda</em> 👑.</li>
      </ol>
      <h4>Variantes</h4>
      <ul>
        <li>⏱️ <strong>Duración</strong>: para partidas más <strong>largas</strong>, se gana con <strong>7 cartas</strong>; para partidas más <strong>cortas</strong>, con <strong>4 cartas</strong>.</li>
      </ul>
      <p>🎭 <strong>Amigo invisible</strong> — las mismas reglas, pero antes de empezar cada jugador escribe en un papel el nombre de una persona o personaje que <em>no esté presente</em> y lo coloca delante suyo. Al momento de votar, se vota por el personaje del papel en lugar del jugador.</p>
      <p>🍻 <strong>Drinking</strong> — las mismas reglas, pero con bebidas:</p>
      <ul>
        <li>Siempre que alguien gana una votación <strong>sin ir al desempate</strong>, esa persona bebe.</li>
        <li>Si alguien gana una votación <strong>de manera unánime</strong>, bebe doble.</li>
        <li>Si en algún momento <strong>todos menos uno</strong> tienen cartas, el que no tiene cartas bebe.</li>
        <li>En caso de <strong>empate</strong>, todos beben.</li>
        <li>Si alguien <strong>se ríe</strong> 😂 mientras se está leyendo una carta, bebe.</li>
        <li>Siempre que un jugador <strong>se queje</strong> del resultado de una votación, ese jugador bebe.</li>
      </ul>
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
        <li>🃏 Cartas de pregunta en un montón accesible.</li>
        <li>Cada jugador con hoja/lápiz (o apunten en el móvil).</li>
        <li>Fichas de puntuación y la “vaca rosa” 🌸 en el centro.</li>
      </ul>
      <h4>Cómo se juega</h4>
      <ol>
        <li>Un jugador elige una carta de pregunta y la lee en voz alta.<br><em>Ej.: «¿Cuál es tu casa de Hogwarts favorita?»</em></li>
        <li>Todos anotan en secreto la respuesta que creen que dará <strong>la mayoría</strong>.</li>
        <li>Se revelan las respuestas.</li>
        <li>Si coincidiste con la mayoría, sumas <strong>1 punto</strong> ⭐.</li>
        <li>Si diste una respuesta que <strong>nadie más</strong> ha dado, te llevas la <strong>vaca rosa</strong> 🌸.</li>
      </ol>
      <h4>Objetivo y vaca rosa</h4>
      <ul>
        <li>Gana quien llega a <strong>8 puntos</strong> sin tener la vaca rosa 👑.</li>
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
      <p><strong>Wavelength</strong>: un “médium” 🔮 conoce la diana de la ruleta y da una pista según la carta de opuestos.</p>
      <h4>Resumen de ronda</h4>
      <ol>
        <li>Equipos se turnan. Un jugador es el <strong>Médium</strong>.</li>
        <li>Gira la ruleta (pantalla cerrada) y mira en secreto la diana 🎯.</li>
        <li>Roba una carta con dos extremos (ej. <em>Frío ← → Caliente</em>).</li>
        <li>Da <strong>una sola pista</strong> 💡 que sitúe el concepto en el punto del espectro.</li>
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
    timesup: `
      <p class="meta">Equipos de 2 · 3 fases · turnos de 30 s</p>
      <p><strong>Time's Up</strong> ⏱: adivina el mayor número de personajes en tres fases cada vez más difíciles.</p>
      <h4>Preparación</h4>
      <ul>
        <li>Formad equipos (ideal: de 2 personas). Sentad de forma que los turnos se alternen entre equipos.</li>
        <li>🃏 Sacad <strong>40 cartas + 2 por jugador</strong> y repartidlas lo más equitativo posible.</li>
        <li>Cada jugador mira sus cartas y <strong>elige 2 para devolver</strong> a la caja.</li>
        <li>Juntad todas las cartas, barajad y formad un único mazo frente al jugador inicial.</li>
      </ul>
      <h4>Las 3 fases (mismo mazo)</h4>
      <ol>
        <li><strong>Fase I · Descripción</strong>: describe al personaje sin usar derivados del nombre. Sin límite de intentos, pero no puedes cambiar de carta hasta acertar.</li>
        <li><strong>Fase II · Una palabra</strong>: una única palabra (no derivada del nombre). Puedes pasar de carta (va al fondo del mazo) y el equipo tiene <em>una sola oportunidad</em> por carta.</li>
        <li><strong>Fase III · Gestos</strong>: solo gestos y sonidos 🎭. Igual que la fase II: puedes pasar de carta y solo hay una oportunidad por carta.</li>
      </ol>
      <h4>Puntuación</h4>
      <ul>
        <li>Cada acierto es <strong>1 punto</strong>: la carta se guarda como punto de victoria.</li>
        <li>La fase termina cuando el mazo se vacía; se suman los aciertos de todos los jugadores del equipo.</li>
        <li>Gana el equipo con más puntos tras las 3 fases 👑. En caso de empate, se comparte la victoria.</li>
      </ul>
      <h4>En el móvil</h4>
      <ul>
        <li>🗂 <strong>Preparar mazo</strong>: elige con qué cartas jugaréis (toca para quitar las que devolvéis a la caja) y pulsa <em>Jugar</em>.</li>
        <li>⏱ <strong>temporizador de 30 s</strong> para cada turno (pulsa para iniciar/reiniciar).</li>
        <li>← siguiente · → anterior · ↑ quitar · 🗑 quitadas · 🔀 barajar.</li>
        <li>Usa el marcador 👤 para anotar los puntos de cada equipo.</li>
      </ul>
    `,
  };

  // ---------- state ----------
  let wavelengthCards = [];
  let currentGameId = null;
  let decks = {};
  let wlLang = "es";
  let wlShowPhoto = false;
  let scorePlayersByGame = { amigos: [], mente: [], wavelength: [], timesup: [] };
  let scoreGameId = null;
  let timerHandle = null;
  let timerLeft = 0;
  let timesupSelected = null;
  let timesupSetup = null;
  let viewerRotation = 0;

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

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[c]));
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
      playersByGame: scorePlayersByGame,
      timesupSelected,
      timesupSetup,
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
    const candidates = [];
    try {
      candidates.push(localStorage.getItem(STORAGE_KEY));
    } catch (_) {}
    try {
      candidates.push(localStorage.getItem("party-games-state-v1"));
    } catch (_) {}
    try {
      candidates.push(getCookieChunks(COOKIE_NAME));
    } catch (_) {}

    const states = candidates
      .filter(Boolean)
      .map((raw) => {
        try {
          return JSON.parse(raw);
        } catch (_) {
          return null;
        }
      })
      .filter(Boolean);

    if (!states.length) return null;
    return states.reduce((latest, state) => {
      if (!latest) return state;
      return (state.updatedAt || 0) >= (latest.updatedAt || 0)
        ? state
        : latest;
    }, null);
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
    let ids = rangeIds(g.count);
    if (gameId === "timesup" && timesupSelected && timesupSelected.length) {
      ids = timesupSelected;
    }
    return {
      order: shuffle(ids),
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
    $("#btn-prepare-deck").hidden = gameId !== "timesup";
    showView("rules");
  }

﻿  // ---------- deck setup (Time's Up) ----------
  function getTimesupPlayerCount() {
    const input = $("#deck-player-count");
    const value = Number(input.value);
    return Math.min(22, Math.max(2, Number.isFinite(value) ? Math.round(value) : 4));
  }

  function updateDeckPlayerInfo() {
    const count = getTimesupPlayerCount();
    const total = 40 + count * 2;
    $("#deck-player-count").value = String(count);
    $("#deck-pool-info").textContent = `Se repartirán ${total} cartas: 40 para el mazo y 2 por jugador para devolver.`;
  }

  function createTimesupSetup(playerCount) {
    const total = 40 + playerCount * 2;
    const pool = shuffle(rangeIds(GAMES.timesup.count)).slice(0, total);
    const base = Math.floor(total / playerCount);
    const extra = total % playerCount;
    const hands = [];
    let cursor = 0;
    for (let i = 0; i < playerCount; i++) {
      const size = base + (i < extra ? 1 : 0);
      hands.push({ cards: pool.slice(cursor, cursor + size), returnIds: [] });
      cursor += size;
    }
    return { playerCount, currentPlayer: 0, hands, completed: false };
  }

  function openDeckSheet() {
    renderDeckSheet();
    $("#deck-sheet").hidden = false;
  }

  function closeDeckSheet() {
    $("#deck-sheet").hidden = true;
  }

  function renderDeckSheet() {
    if (!timesupSetup) renderDeckConfig();
    else if (timesupSetup.completed) renderDeckComplete();
    else renderDeckHand();
  }

  function renderDeckConfig() {
    $("#deck-title").textContent = "Preparar mazo";
    $("#deck-sub").textContent = "Primero repartimos las cartas entre los jugadores.";
    $("#deck-config").hidden = false;
    $("#deck-hand").hidden = true;
    $("#deck-complete").hidden = true;
    updateDeckPlayerInfo();
  }

  function dealTimesup() {
    const playerCount = getTimesupPlayerCount();
    timesupSetup = createTimesupSetup(playerCount);
    timesupSelected = null;
    saveState();
    renderDeckSheet();
  }

  function renderDeckHand() {
    const handIndex = timesupSetup.currentPlayer;
    const hand = timesupSetup.hands[handIndex];
    const selected = new Set(hand.returnIds);
    $("#deck-title").textContent = `Jugador ${handIndex + 1} de ${timesupSetup.playerCount}`;
    $("#deck-sub").textContent = `Selecciona exactamente 2 cartas para devolver (${selected.size}/2).`;
    $("#deck-config").hidden = true;
    $("#deck-hand").hidden = false;
    $("#deck-complete").hidden = true;
    const grid = $("#deck-hand-grid");
    grid.innerHTML = "";
    for (const id of hand.cards) {
      const tile = document.createElement("button");
      tile.type = "button";
      tile.className = "removed-tile timesup-hand-tile";
      if (selected.has(id)) tile.classList.add("selected");
      tile.innerHTML = `
        <img src="${cardUrl("timesup", id)}" alt="Carta ${padId(id)}" />
        <span class="tile-id">#${padId(id)}</span>
        <span class="check">&#10003;</span>
      `;
      tile.addEventListener("click", () => {
        const next = new Set(hand.returnIds);
        if (next.has(id)) next.delete(id);
        else if (next.size < 2) next.add(id);
        hand.returnIds = [...next];
        saveState();
        renderDeckHand();
      });
      grid.appendChild(tile);
    }
    const confirm = $("#btn-confirm-hand");
    confirm.disabled = selected.size !== 2;
    confirm.textContent = selected.size === 2 ? "Devolver 2 y continuar" : `Seleccionadas ${selected.size}/2`;
  }

  function confirmTimesupHand() {
    const hand = timesupSetup.hands[timesupSetup.currentPlayer];
    if (hand.returnIds.length !== 2) {
      toast("Selecciona 2 cartas para devolver");
      return;
    }
    if (timesupSetup.currentPlayer < timesupSetup.playerCount - 1) {
      timesupSetup.currentPlayer += 1;
      saveState();
      renderDeckHand();
      return;
    }
    const returned = new Set(timesupSetup.hands.flatMap((item) => item.returnIds));
    timesupSelected = timesupSetup.hands
      .flatMap((item) => item.cards)
      .filter((id) => !returned.has(id));
    timesupSetup.completed = true;
    saveState();
    renderDeckComplete();
  }

  function renderDeckComplete() {
    $("#deck-title").textContent = "Mazo listo";
    $("#deck-sub").textContent = `Habéis elegido ${timesupSelected.length} cartas para jugar.`;
    $("#deck-config").hidden = true;
    $("#deck-hand").hidden = true;
    $("#deck-complete").hidden = false;
    $("#deck-final-count").textContent = `${timesupSelected.length} cartas preparadas`;
    $("#btn-deck-play").textContent = `Jugar con ${timesupSelected.length} cartas`;
  }

  function startPreparedTimesup() {
    if (!timesupSelected || !timesupSelected.length) return;
    decks.timesup = defaultDeck("timesup");
    saveState();
    closeDeckSheet();
    showView("play");
    renderPlay();
    toast(`Mazo preparado con ${timesupSelected.length} cartas`);
  }

  function resetTimesupSetup() {
    timesupSetup = null;
    timesupSelected = null;
    saveState();
    renderDeckConfig();
  }

  // ---------- fullscreen card viewer ----------
  function isCardViewerGame(gameId) {
    return gameId === "amigos" || gameId === "mente" || gameId === "timesup";
  }

  function openCardViewer() {
    if (!isCardViewerGame(currentGameId)) return;
    const img = $("#card-image");
    if (img.hidden || !img.src) return;
    viewerRotation = 0;
    applyViewerRotation();
    $("#card-viewer-img").src = img.src;
    $("#card-viewer-img").alt = img.alt;
    $("#card-viewer").hidden = false;
  }

  function closeCardViewer() {
    $("#card-viewer").hidden = true;
  }

  function rotateCardViewer() {
    viewerRotation = (viewerRotation + 90) % 360;
    applyViewerRotation();
  }

  function applyViewerRotation() {
    const stage = $("#viewer-stage");
    stage.classList.toggle("rot-90", viewerRotation === 90 || viewerRotation === 270);
  }

  // ---------- scoreboard ----------
  function isScoreGame(gameId) {
    return (
      gameId === "amigos" ||
      gameId === "mente" ||
      gameId === "wavelength" ||
      gameId === "timesup"
    );
  }

  function sanitizePlayers(list) {
    if (!Array.isArray(list)) return [];
    return list
      .filter((p) => p && typeof p.name === "string" && p.name.trim())
      .map((p) => ({
        name: p.name.trim().slice(0, 24),
        score: Number.isFinite(p.score) ? p.score : 0,
      }));
  }

  function loadScorePlayers(saved) {
    const savedByGame = saved && saved.playersByGame;
    const legacy = saved && Array.isArray(saved.players) ? saved.players : [];
    return {
      amigos: sanitizePlayers(
        savedByGame && Array.isArray(savedByGame.amigos)
          ? savedByGame.amigos
          : legacy
      ),
      mente: sanitizePlayers(
        savedByGame && Array.isArray(savedByGame.mente)
          ? savedByGame.mente
          : legacy
      ),
      wavelength: sanitizePlayers(
        savedByGame && Array.isArray(savedByGame.wavelength)
          ? savedByGame.wavelength
          : legacy
      ),
      timesup: sanitizePlayers(
        savedByGame && Array.isArray(savedByGame.timesup)
          ? savedByGame.timesup
          : legacy
      ),
    };
  }

  function renderScoreboard(gameId = scoreGameId) {
    if (!isScoreGame(gameId)) return;
    const list = $("#scoreboard-list");
    const empty = $("#scoreboard-empty");
    const currentPlayers = scorePlayersByGame[gameId];
    $("#score-title").textContent = `Marcador - ${GAMES[gameId].name}`;
    $("#score-sub").textContent =
      `${currentPlayers.length} jugador${currentPlayers.length === 1 ? "" : "es"}`;
    list.innerHTML = "";
    empty.hidden = currentPlayers.length > 0;
    currentPlayers.forEach((p, i) => {
      const li = document.createElement("li");
      li.className = "player-row";
      li.innerHTML = `
        <button class="score-btn del" data-i="${i}" aria-label="Eliminar jugador">&times;</button>
        <span class="player-name">${escapeHtml(p.name)}</span>
        <div class="player-controls">
          <button class="score-btn minus" data-i="${i}" aria-label="Restar punto">−</button>
          <span class="player-score">${p.score}</span>
          <button class="score-btn plus" data-i="${i}" aria-label="Sumar punto">+</button>
        </div>
      `;
      list.appendChild(li);
    });
    list.querySelectorAll(".score-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const i = Number(btn.dataset.i);
        const players = scorePlayersByGame[scoreGameId];
        if (!players || !players[i]) return;
        if (btn.classList.contains("minus")) players[i].score -= 1;
        else if (btn.classList.contains("plus")) players[i].score += 1;
        else players.splice(i, 1);
        saveState();
        renderScoreboard(scoreGameId);
      });
    });
  }

  function openScoreSheet(gameId = currentGameId) {
    if (!isScoreGame(gameId)) return;
    scoreGameId = gameId;
    renderScoreboard(gameId);
    $("#score-sheet").hidden = false;
  }

  function closeScoreSheet() {
    $("#score-sheet").hidden = true;
    scoreGameId = null;
  }

  function addPlayer() {
    const input = $("#score-input");
    const players = scorePlayersByGame[scoreGameId];
    if (!players) return;
    const name = input.value.trim().slice(0, 24);
    if (!name) {
      toast("Escribe un nombre");
      input.focus();
      return;
    }
    players.push({ name, score: 0 });
    input.value = "";
    saveState();
    renderScoreboard(scoreGameId);
    input.focus();
  }

  // ---------- round timer (Time's Up) ----------
  const ROUND_SECONDS = 30;

  function renderTimer() {
    const el = $("#btn-timer");
    el.textContent = `⏱ ${timerLeft}s`;
    el.classList.toggle("running", timerHandle != null);
    el.classList.toggle("done", timerLeft === 0);
  }

  function clearTimer() {
    if (timerHandle != null) {
      clearInterval(timerHandle);
      timerHandle = null;
    }
    timerLeft = 0;
    const el = $("#btn-timer");
    if (el) {
      el.textContent = `⏱ ${ROUND_SECONDS}s`;
      el.classList.remove("running", "done");
    }
  }

  function toggleTimer() {
    if (timerHandle != null) {
      clearTimer();
      return;
    }
    timerLeft = ROUND_SECONDS;
    renderTimer();
    timerHandle = setInterval(() => {
      timerLeft -= 1;
      if (timerLeft <= 0) {
        timerLeft = 0;
        clearTimer();
        toast("¡Tiempo!");
        return;
      }
      renderTimer();
    }, 1000);
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
    $("#btn-score-toggle").hidden = !isScoreGame(currentGameId);
    $("#btn-timer").hidden = currentGameId !== "timesup";
    $("#btn-rotate-card").hidden = !isCardViewerGame(currentGameId);
    if (currentGameId !== "timesup") clearTimer();
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
      return `${capitalizePhrase(card.izquierda)} ← → ${capitalizePhrase(card.derecha)}`;
    }
    return `${capitalizePhrase(card.izquierda_es || card.izquierda)} ← → ${capitalizePhrase(card.derecha_es || card.derecha)}`;
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
  function capitalizePhrase(value) {
    const text = String(value || "").trim();
    if (!text) return "—";
    return text.charAt(0).toLocaleUpperCase("es-ES") + text.slice(1);
  }

  function wlText(card) {
    if (!card) return { left: "—", right: "—" };
    if (wlLang === "en") {
      return {
        left: capitalizePhrase(card.izquierda),
        right: capitalizePhrase(card.derecha),
      };
    }
    return {
      left: capitalizePhrase(card.izquierda_es || card.izquierda),
      right: capitalizePhrase(card.derecha_es || card.derecha),
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
    $("#btn-wl-score-toggle").hidden = false;
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
    $("#btn-prepare-deck").addEventListener("click", openDeckSheet);

    $("#btn-play-back").addEventListener("click", () => {
      clearTimer();
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
      clearTimer();
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

    // fullscreen viewer
    $("#btn-rotate-card").addEventListener("click", openCardViewer);
    $("#card-viewer-close").addEventListener("click", closeCardViewer);
    $("#card-viewer-rotate").addEventListener("click", rotateCardViewer);
    $("#card-viewer-backdrop").addEventListener("click", closeCardViewer);

    // scoreboard
    $("#btn-timer").addEventListener("click", toggleTimer);
    $("#btn-score-toggle").addEventListener("click", () => openScoreSheet(currentGameId));
    $("#btn-wl-score-toggle").addEventListener("click", () => openScoreSheet("wavelength"));
    $("#btn-score-add").addEventListener("click", addPlayer);
    $("#score-input").addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        addPlayer();
      }
    });
    $("#btn-score-close").addEventListener("click", closeScoreSheet);
    $("#btn-score-close-2").addEventListener("click", closeScoreSheet);
    $("#score-backdrop").addEventListener("click", closeScoreSheet);

    // deck setup
    $("#btn-deck-close").addEventListener("click", closeDeckSheet);
    $("#btn-deck-close-2").addEventListener("click", closeDeckSheet);
    $("#deck-backdrop").addEventListener("click", closeDeckSheet);
    $("#deck-player-count").addEventListener("input", updateDeckPlayerInfo);
    $("#btn-deck-player-minus").addEventListener("click", () => {
      $("#deck-player-count").value = getTimesupPlayerCount() - 1;
      updateDeckPlayerInfo();
    });
    $("#btn-deck-player-plus").addEventListener("click", () => {
      $("#deck-player-count").value = getTimesupPlayerCount() + 1;
      updateDeckPlayerInfo();
    });
    $("#btn-deal-timesup").addEventListener("click", dealTimesup);
    $("#btn-confirm-hand").addEventListener("click", confirmTimesupHand);
    $("#btn-deck-play").addEventListener("click", startPreparedTimesup);
    $("#btn-deck-new").addEventListener("click", resetTimesupSetup);

    bindGestures($("#deck-stage"), () => currentGameId);
    bindGestures($("#wl-stage"), () => "wavelength");

    window.addEventListener("keydown", (e) => {
      if (!$("#card-viewer").hidden) {
        if (e.key === "Escape") closeCardViewer();
        return;
      }
      if (!$("#deck-sheet").hidden) {
        if (e.key === "Escape") closeDeckSheet();
        return;
      }
      if (!$("#score-sheet").hidden) {
        if (e.key === "Escape") closeScoreSheet();
        return;
      }
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
        if (e.key.toLowerCase() === "t") toggleTimer();
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
    scorePlayersByGame = loadScorePlayers(saved);
    if (saved && Array.isArray(saved.timesupSelected)) {
      const valid = new Set(rangeIds(GAMES.timesup.count));
      timesupSelected = saved.timesupSelected.filter((x) => valid.has(x));
    }
    if (saved && saved.timesupSetup && Array.isArray(saved.timesupSetup.hands)) {
      timesupSetup = saved.timesupSetup;
    }
    saveState();

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
