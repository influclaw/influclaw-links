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
    fastfriends: {
      id: "fastfriends",
      name: "Fast Friends",
      short: "Coincidid en la misma palabra antes de que suene el tiempo",
      icon: "assets/icon-fastfriends.png",
      className: "fastfriends",
      count: 360,
      path: "fastfriends",
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
        <li>🃏 Sacad <strong>40 o 20 cartas</strong> (elige arriba a la derecha) + 2 por jugador y repartidlas lo más equitativo posible.</li>
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
        <li>Pulsa el botón <strong>🔴 o 🔵</strong> de abajo para asignar la carta al equipo y sumarle el punto (↩ deshace si te equivocas).</li>
        <li>La fase termina cuando el mazo se vacía; se suman los aciertos de todos los jugadores del equipo.</li>
        <li>Gana el equipo con más puntos tras las 3 fases 👑. En caso de empate, se comparte la victoria.</li>
      </ul>
      <h4>En el móvil</h4>
      <ul>
        <li>🗂 <strong>Preparar mazo</strong>: reparte y elige las cartas con las que jugaréis (↻ refresca la mano, ← Volver cambia la elección) y pulsa <em>Jugar</em>.</li>
        <li>⏱ <strong>temporizador de 30 s</strong> para cada turno (pulsa para iniciar/reiniciar).</li>
        <li>← siguiente · → anterior · 🔀 barajar · ↩ deshacer.</li>
        <li>▦ botón de equipos: ver las cartas ganadas y devolverlas al mazo entre fases.</li>
      </ul>
    `,
    fastfriends: `
      <p class="meta">2+ jugadores · asociación de palabras · rondas rápidas</p>
      <p><strong>Fast Friends</strong> 💚 es un juego de sincronización mental: tú y la persona que está a tu izquierda intentáis decir <strong>la misma palabra al mismo tiempo</strong>.</p>

      <h4>🎯 Objetivo</h4>
      <p>Conseguir que las dos respuestas coincidan. No gana quien encuentra la palabra más original, sino quien consigue pensar como su pareja.</p>

      <h4>🧩 Preparación</h4>
      <ul>
        <li>Sentaros formando un círculo o una fila y elegid quién juega con la persona de su izquierda.</li>
        <li>Dejad el <strong>móvil en el centro</strong>, con la carta visible para la pareja. El texto está girado para poder leerlo desde el lado del móvil.</li>
        <li>Si usáis las reglas originales, dejad preparadas las <strong>fichas de vida</strong>. Esta versión móvil no las descuenta automáticamente: retirad una ficha a mano cuando corresponda.</li>
      </ul>

      <h4>⏱ Cómo se juega</h4>
      <ol>
        <li>La pareja activa pulsa el <strong>temporizador</strong> ⏱. La duración queda oculta y se elige al azar entre 25 y 120 segundos.</li>
        <li>Leed la pista de la carta. A la cuenta de <strong>tres</strong>, cada persona dice en voz alta una palabra asociada, <strong>sin copiar a la otra</strong>.</li>
        <li>Si decís la <strong>misma palabra</strong>, tocad la zona verde 🟢. La carta se supera y pasa el turno a la siguiente pareja.</li>
        <li>Si las palabras son distintas, tocad la zona roja 🔴: la carta cambia y pasa el turno (ajustable en ⚙).</li>
        <li>Seguid intentándolo hasta coincidir o hasta que suene la bomba.</li>
      </ol>

      <h4>💣 Si se acaba el tiempo</h4>
      <ul>
        <li>La bomba marca el final de la ronda. La pareja activa pierde <strong>una ficha de vida</strong> y deja paso a la siguiente pareja.</li>
        <li>El confeti es solo una señal visual del móvil; no cambia el resultado.</li>
      </ul>

      <h4>📱 Controles del móvil</h4>
      <ul>
        <li>⏱ <strong>Temporizador</strong>: inicia o detiene una ronda; la cuenta no se muestra.</li>
        <li>🟢 <strong>Verde abajo</strong>: hemos coincidido y pasamos de carta.</li>
        <li>🔴 <strong>Rojo arriba</strong>: no hemos coincidido; la carta cambia y pasa el turno (ajustable en ⚙).</li>
        <li>👤 <strong>Marcador</strong>: puntuación opcional de la casa; las fichas de vida se llevan aparte.</li>
        <li>⚙ <strong>Ajustes</strong>: cambiar de tarjeta al fallar y velocidad del temporizador (rápido, normal, lento o personalizado).</li>
        <li>🔀 <strong>Barajar</strong>: mezcla el mazo. No hay swipe para cambiar de carta.</li>
      </ul>

      <h4>🏁 Fin de la partida</h4>
      <p>Seguid rotando las parejas y retirando fichas cuando suene la bomba. Terminad cuando se acabe el mazo o cuando vuestra mesa decida que una pareja sin fichas queda eliminada.</p>
    `,
  };

  // ---------- state ----------
  let wavelengthCards = [];
  let currentGameId = null;
  let decks = {};
  let wlLang = "es";
  let wlShowPhoto = false;
  let scorePlayersByGame = { amigos: [], mente: [], wavelength: [], timesup: [], fastfriends: [] };
  let scoreGameId = null;
  let timerHandle = null;
  let timerLeft = 0;
  let timesupSelected = null;
  let timesupSetup = null;
  let timesupTeams = { red: [], blue: [] };
  let fastfriendsFrases = [];
  let fastfriendsLives = 3;
  let ffSettings = { failAdvances: true, speedMode: "normal", customMin: 25, customMax: 90 };
  let timesupDeckSize = 40;
  let timesupHistory = [];
  let cardRotation = { amigos: false, mente: false, timesup: false };

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
    fastfriends: $("#view-fastfriends"),
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
      cardRotation,
      fastfriendsLives,
      ffSettings,
      timesupTeams,
      timesupDeckSize,
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

  function timesupDeckIds() {
    const teamSet = new Set([...timesupTeams.red, ...timesupTeams.blue]);
    const removedSet = new Set(decks.timesup ? decks.timesup.removed : []);
    let ids =
      timesupSelected && timesupSelected.length
        ? timesupSelected.slice()
        : rangeIds(GAMES.timesup.count);
    return ids.filter((x) => !teamSet.has(x) && !removedSet.has(x));
  }

  function defaultDeck(gameId) {
    const g = GAMES[gameId];
    let ids = rangeIds(g.count);
    if (gameId === "timesup" && timesupSelected && timesupSelected.length) {
      ids = timesupSelected;
    }
    if (gameId === "timesup") {
      ids = timesupDeckIds();
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

        if (id === "timesup") {
          // Time's Up: the deck is exactly what was saved; team cards are outside
          const teamSet = new Set([...timesupTeams.red, ...timesupTeams.blue]);
          order = order.filter((x) => !teamSet.has(x));
        } else {
          // cards missing from both ? put back in order (migration / repair)
          const known = new Set([...order, ...removed]);
          for (const n of valid) {
            if (!known.has(n)) order.push(n);
          }
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
    else if (gameId === "fastfriends") renderFastFriends();
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
    $("#btn-deck-size").hidden = gameId !== "timesup";
    $("#btn-deck-size").textContent = String(timesupDeckSize);
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
    const total = timesupDeckSize + count * 2;
    $("#deck-player-count").value = String(count);
    $("#deck-pool-info").textContent = `Se repartirán ${total} cartas: ${timesupDeckSize} para el mazo y 2 por jugador para devolver.`;
  }

  function createTimesupSetup(playerCount) {
    const total = timesupDeckSize + playerCount * 2;
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
    $("#btn-confirm-hand").hidden = true;
    updateDeckPlayerInfo();
  }

  function dealTimesup() {
    const playerCount = getTimesupPlayerCount();
    timesupSetup = createTimesupSetup(playerCount);
    timesupSelected = null;
    timesupTeams = { red: [], blue: [] };
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
    $("#btn-confirm-hand").hidden = false;
    $("#btn-back-hand").hidden = timesupSetup.currentPlayer === 0;
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

  function backTimesupHand() {
    if (timesupSetup.currentPlayer === 0) return;
    timesupSetup.currentPlayer -= 1;
    saveState();
    renderDeckHand();
    toast("Volviendo al jugador " + (timesupSetup.currentPlayer + 1));
  }

  function refreshTimesupHand() {
    const handIndex = timesupSetup.currentPlayer;
    const hand = timesupSetup.hands[handIndex];
    const size = hand.cards.length;
    const used = new Set(timesupSetup.hands.flatMap((item) => item.cards));
    const remaining = rangeIds(GAMES.timesup.count).filter((x) => !used.has(x));
    if (remaining.length === 0) {
      toast("No quedan cartas nuevas");
      return;
    }
    const take = Math.min(size, remaining.length);
    hand.cards = shuffle(remaining).slice(0, take);
    hand.returnIds = [];
    saveState();
    renderDeckHand();
    toast(
      take < size
        ? "Mano nueva (solo quedaban " + take + " cartas)"
        : "Mano nueva"
    );
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
    const deckSize = timesupDeckIds().length;
    const teamN = timesupTeams.red.length + timesupTeams.blue.length;
    $("#deck-title").textContent = "Mazo listo";
    $("#deck-sub").textContent =
      teamN > 0
        ? deckSize + " cartas en el mazo y " + teamN + " asignadas a los equipos."
        : "Hab" + String.fromCharCode(233) + "is elegido " + deckSize + " cartas para jugar.";
    $("#deck-config").hidden = true;
    $("#deck-hand").hidden = true;
    $("#deck-complete").hidden = false;
    $("#btn-confirm-hand").hidden = true;
    $("#deck-final-count").textContent = deckSize + " cartas preparadas";
    $("#btn-deck-play").textContent = "Jugar con " + deckSize + " cartas";
  }

  function startPreparedTimesup() {
    if (!timesupSelected || !timesupSelected.length) return;
    decks.timesup = defaultDeck("timesup");
    saveState();
    closeDeckSheet();
    showView("play");
    renderPlay();
    toast("Mazo preparado con " + timesupDeckIds().length + " cartas");
  }

  function resetTimesupSetup() {
    timesupSetup = null;
    timesupSelected = null;
    saveState();
    renderDeckConfig();
  }

  // ---------- card rotation (amigos / mente / timesup) ----------
  function isCardViewerGame(gameId) {
    return gameId === "amigos" || gameId === "mente" || gameId === "timesup";
  }

  function applyCardRotation() {
    const img = $("#card-image");
    const face = $("#card-face");
    if (!img || !face) return;
    const rotated = isCardViewerGame(currentGameId) && !!cardRotation[currentGameId];
    if (!rotated) {
      face.style.width = "";
      face.style.height = "";
      img.style.width = "";
      img.style.height = "";
      img.style.transform = "";
      img.style.background = "";
      return;
    }
    face.style.width = "";
    face.style.height = "";
    const w = face.clientWidth || 1;
    const h = face.clientHeight || 1;
    img.style.width = "";
    img.style.height = "";
    img.style.transform = "rotate(90deg) scale(" + (h / w) + ")";
    img.style.transformOrigin = "center";
    img.style.background = "transparent";
  }

  function toggleCardRotation() {
    if (!isCardViewerGame(currentGameId)) return;
    cardRotation[currentGameId] = !cardRotation[currentGameId];
    saveState();
    applyCardRotation();
    toast(
      cardRotation[currentGameId]
        ? "Cartas giradas (todo el mazo)"
        : "Cartas en vertical"
    );
  }

  // ---------- end of deck (Time's Up) ----------
  const CONFETTI_COLORS = ["#ff4d6d", "#4d7cff", "#ffd166", "#2dd4bf", "#a78bfa", "#5eead4", "#ff8a5b"];

  function spawnConfetti() {
    const wrap = $("#confetti");
    if (!wrap || wrap.children.length > 0) return;
    for (let i = 0; i < 90; i++) {
      const piece = document.createElement("span");
      piece.className = "confetti-piece";
      piece.style.left = Math.random() * 100 + "%";
      piece.style.background = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
      piece.style.animationDelay = Math.random() * 2.5 + "s";
      piece.style.animationDuration = 2 + Math.random() * 2.5 + "s";
      piece.style.animationIterationCount = "1";
      piece.style.width = 6 + Math.random() * 6 + "px";
      piece.style.height = 8 + Math.random() * 8 + "px";
      wrap.appendChild(piece);
    }
    clearTimeout(spawnConfetti._t);
    spawnConfetti._t = setTimeout(() => {
      clearConfetti();
    }, 9500);
  }

  function clearConfetti() {
    clearTimeout(spawnConfetti._t);
    const wrap = $("#confetti");
    if (wrap) wrap.innerHTML = "";
  }

  // ---------- Time's Up teams ----------
  function assignCurrentToTeam(color) {
    if (currentGameId !== "timesup") return;
    const d = decks.timesup;
    if (!d.order.length) return;
    const id = d.order.splice(d.index, 1)[0];
    timesupTeams[color].push(id);
    timesupHistory.push({ color, id });
    if (d.index >= d.order.length) d.index = Math.max(0, d.order.length - 1);
    saveState();
    renderPlay();
    toast("Carta para el equipo " + (color === "red" ? "rojo" : "azul"));
  }

  function undoLastAssignment() {
    if (currentGameId !== "timesup") return;
    const last = timesupHistory.pop();
    if (!last) {
      toast("No hay nada que deshacer");
      return;
    }
    const team = timesupTeams[last.color];
    const idx = team.indexOf(last.id);
    if (idx >= 0) team.splice(idx, 1);
    const d = decks.timesup;
    if (d.order.length === 0) {
      d.order = [last.id];
      d.index = 0;
    } else {
      const insertAt = Math.min(d.index, d.order.length);
      d.order.splice(insertAt, 0, last.id);
      d.index = insertAt;
    }
    saveState();
    renderPlay();
    toast("Deshecho: la carta vuelve a mostrarse");
  }

  function openTeamsSheet() {
    if (currentGameId !== "timesup") return;
    renderTeamsSheet();
    $("#teams-sheet").hidden = false;
  }

  function closeTeamsSheet() {
    $("#teams-sheet").hidden = true;
  }

  function renderTeamsSheet() {
    $("#team-red-total").textContent = timesupTeams.red.length;
    $("#team-blue-total").textContent = timesupTeams.blue.length;
    renderTeamGrid("red");
    renderTeamGrid("blue");
    const btn = $("#btn-teams-restore");
    btn.disabled = timesupTeams.red.length === 0 && timesupTeams.blue.length === 0;
  }

  function renderTeamGrid(color) {
    const grid = $("#team-" + color + "-grid");
    grid.innerHTML = "";
    if (!timesupTeams[color].length) {
      const empty = document.createElement("p");
      empty.className = "removed-empty";
      empty.textContent = "Sin cartas";
      grid.appendChild(empty);
      return;
    }
    timesupTeams[color].forEach((id) => {
      const tile = document.createElement("button");
      tile.type = "button";
      tile.className = "removed-tile";
      tile.innerHTML = `
        <img src="${cardUrl("timesup", id)}" alt="Carta ${padId(id)}" loading="lazy" />
        <span class="tile-id">#${padId(id)}</span>
      `;
      tile.addEventListener("click", () => openTeamViewer(id));
      grid.appendChild(tile);
    });
  }

  function openTeamViewer(id) {
    $("#team-viewer-img").src = cardUrl("timesup", id);
    $("#team-viewer").hidden = false;
  }

  function closeTeamViewer() {
    $("#team-viewer").hidden = true;
  }

  function returnAllTeamCards() {
    const d = decks.timesup;
    const toRestore = [...timesupTeams.red, ...timesupTeams.blue];
    if (!toRestore.length) return;
    timesupTeams = { red: [], blue: [] };
    if (d.order.length === 0) {
      d.order = toRestore.slice();
      d.index = 0;
    } else {
      const insertAt = Math.min(d.index + 1, d.order.length);
      d.order.splice(insertAt, 0, ...toRestore);
    }
    saveState();
    renderTeamsSheet();
    renderPlay();
    toast(
      toRestore.length === 1
        ? "1 carta devuelta al mazo"
        : toRestore.length + " cartas devueltas al mazo"
    );
  }

  // ---------- fast friends ----------
  function renderPhraseHtml(texto) {
    const partes = String(texto || "").split("____");
    return partes.map((parte, i) => {
      let out = "<span class=\"ff-word\">" + parte + "</span>";
      if (i < partes.length - 1) out += '<span class="ff-blank" aria-hidden="true"></span>';
      return out;
    }).join("");
  }

  function renderFastFriends() {
    const d = decks.fastfriends;
    const totalLeft = d.order.length;
    $("#ff-counter").textContent =
      totalLeft === 0 ? "0 en mazo" : d.index + 1 + " / " + totalLeft;
    $("#btn-ff-score").hidden = false;
    const cardEl = $("#ff-card");
    const back = $("#ff-card-back");
    ffSliding = false;
    const empty = $("#ff-empty");
    if (!totalLeft) {
      $("#ff-left").textContent = "";
      empty.hidden = false;
      back.hidden = true;
      cardEl.style.transform = "translateY(0) scale(1)";
      cardEl.style.opacity = "1";
      cardEl.style.transition = "";
      return;
    }
    empty.hidden = true;
    const id = currentId("fastfriends");
    const frase = fastfriendsFrases[id - 1];
    const texto = frase ? frase.texto : "";
    $("#ff-left").innerHTML = renderPhraseHtml(texto);

    const nextId = d.order[(d.index + 1) % d.order.length];
    if (nextId != null) {
      const nextFrase = fastfriendsFrases[nextId - 1];
      $("#ff-left-back").innerHTML = renderPhraseHtml(
        nextFrase ? nextFrase.texto : ""
      );
      back.hidden = false;
    } else {
      back.hidden = true;
    }

    cardEl.style.transition = "transform 0.28s ease, opacity 0.28s ease";
    cardEl.style.transform = "translateY(8px) scale(0.98)";
    cardEl.style.opacity = "1";
    requestAnimationFrame(() => {
      cardEl.style.transform = "translateY(0) scale(1)";
      fitFastFriendsText();
      fitFastFriendsText($("#ff-card-back"), $("#ff-left-back"));
      requestAnimationFrame(() => {
        cardEl.style.transition = "";
        fitFastFriendsText();
        fitFastFriendsText($("#ff-card-back"), $("#ff-left-back"));
      });
    });
  }

  function fitFastFriendsText(
    cardEl = $("#ff-card"),
    phraseEl = $("#ff-left")
  ) {
    const card = cardEl;
    const phrase = phraseEl;
    if (!card || !phrase || !phrase.textContent.trim()) return;
    const pad = 36;
    const maxAlong = Math.max(40, card.clientHeight - pad * 2);
    const maxAcross = Math.max(40, card.clientWidth - pad * 2);
    phrase.style.fontSize = "12px";
    let lo = 12;
    let hi = 160;
    let best = 12;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      phrase.style.fontSize = mid + "px";
      const along = phrase.scrollWidth;
      const across = phrase.scrollHeight;
      if (along <= maxAlong && across <= maxAcross) {
        best = mid;
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }
    phrase.style.fontSize = best + "px";
  }
  let ffSliding = false;

  function playCorrectSound() {
    const ctx = getAudioCtx();
    if (!ctx) return;
    try {
      [0, 0.16].forEach((off, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = i === 0 ? 880 : 1318;
        gain.gain.setValueAtTime(0.12, ctx.currentTime + off);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + off + 0.22);
        osc.connect(gain).connect(ctx.destination);
        osc.start(ctx.currentTime + off);
        osc.stop(ctx.currentTime + off + 0.24);
      });
    } catch (_) {}
  }

  function playWrongSound() {
    const ctx = getAudioCtx();
    if (!ctx) return;
    try {
      [0, 0.2].forEach((off, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.value = i === 0 ? 220 : 150;
        gain.gain.setValueAtTime(0.1, ctx.currentTime + off);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + off + 0.26);
        osc.connect(gain).connect(ctx.destination);
        osc.start(ctx.currentTime + off);
        osc.stop(ctx.currentTime + off + 0.28);
      });
    } catch (_) {}
  }

  function ffVote(direction) {
    if (ffSliding) return;
    const d = decks.fastfriends;
    if (!d.order.length) return;
    const card = $("#ff-card");

    if (direction === "up") {
      playWrongSound();
      if (ffSettings.failAdvances) {
        ffSliding = true;
        card.style.transition = "transform 0.35s ease, opacity 0.35s ease";
        card.style.transform = "translateY(-120%)";
        card.style.opacity = "0";
        setTimeout(() => {
          goNext("fastfriends");
        }, 380);
      } else {
        card.classList.remove("ff-miss");
        void card.offsetWidth;
        card.classList.add("ff-miss");
        setTimeout(() => card.classList.remove("ff-miss"), 380);
        toast("No coincidís: probad otra vez");
      }
      return;
    }

    ffSliding = true;
    card.style.transition = "transform 0.35s ease, opacity 0.35s ease";
    playCorrectSound();
    card.style.transform = "translateY(120%)";
    card.style.opacity = "0";
    setTimeout(() => {
      goNext("fastfriends");
    }, 380);
  }

  function resetFastFriends() {
    decks.fastfriends = defaultDeck("fastfriends");
    saveState();
    renderFastFriends();
    toast("Mazo restaurado");
  }

  // ---------- scoreboard ----------
  function isScoreGame(gameId) {
    return (
      gameId === "amigos" ||
      gameId === "mente" ||
      gameId === "wavelength" ||
      gameId === "timesup" ||
      gameId === "fastfriends"
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
      fastfriends: sanitizePlayers(
        savedByGame && Array.isArray(savedByGame.fastfriends)
          ? savedByGame.fastfriends
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

  function openFfSettings() {
    const s = ffSettings;
    $("#ff-setting-fail").checked = s.failAdvances;
    document.querySelectorAll('input[name="ff-speed"]').forEach((r) => {
      r.checked = r.value === s.speedMode;
    });
    $("#ff-custom-min").value = s.customMin;
    $("#ff-custom-max").value = s.customMax;
    $("#ff-custom-speed").hidden = s.speedMode !== "custom";
    $("#ff-settings-sheet").hidden = false;
  }

  function closeFfSettings() {
    const s = ffSettings;
    s.failAdvances = $("#ff-setting-fail").checked;
    const checked = document.querySelector('input[name="ff-speed"]:checked');
    if (checked) s.speedMode = checked.value;
    const min = parseInt($("#ff-custom-min").value, 10);
    const max = parseInt($("#ff-custom-max").value, 10);
    if (Number.isFinite(min)) s.customMin = Math.max(1, Math.min(300, min));
    if (Number.isFinite(max)) s.customMax = Math.max(1, Math.min(300, max));
    if (s.customMax < s.customMin) s.customMax = s.customMin;
    $("#ff-settings-sheet").hidden = true;
    saveState();
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
  let audioCtx = null;

  function getAudioCtx() {
    if (!audioCtx) {
      try {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      } catch (_) {}
    }
    return audioCtx;
  }

  function playTick() {
    const ctx = getAudioCtx();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch (_) {}
  }

  function playSynthBomb() {
    const ctx = getAudioCtx();
    if (!ctx) return;
    try {
      const t0 = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(150, t0);
      osc.frequency.exponentialRampToValueAtTime(26, t0 + 0.8);
      gain.gain.setValueAtTime(0.85, t0);
      gain.gain.exponentialRampToValueAtTime(0.001, t0 + 1);
      osc.connect(gain).connect(ctx.destination);
      osc.start(t0);
      osc.stop(t0 + 1.05);

      const dur = 0.6;
      const buffer = ctx.createBuffer(
        1,
        Math.floor(ctx.sampleRate * dur),
        ctx.sampleRate
      );
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
      const src = ctx.createBufferSource();
      src.buffer = buffer;
      const nGain = ctx.createGain();
      nGain.gain.setValueAtTime(0.5, t0);
      nGain.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(2500, t0);
      filter.frequency.exponentialRampToValueAtTime(100, t0 + dur);
      src.connect(filter);
      filter.connect(nGain);
      nGain.connect(ctx.destination);
      src.start(t0);
      src.stop(t0 + dur);
    } catch (_) {}
  }

  let bombBuffer = null;

  function loadBombSound() {
    try {
      fetch("fastfriends/bomba_www.mp3")
        .then((res) => res.arrayBuffer())
        .then((buf) => {
          const ctx = getAudioCtx();
          if (!ctx) return;
          return ctx.decodeAudioData(buf);
        })
        .then((decoded) => {
          if (decoded) bombBuffer = decoded;
        })
        .catch(() => {});
    } catch (_) {}
  }

  function playBombSound() {
    const ctx = getAudioCtx();
    if (ctx && bombBuffer) {
      try {
        const src = ctx.createBufferSource();
        src.buffer = bombBuffer;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.9, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(
          0.001,
          ctx.currentTime + Math.max(0.05, bombBuffer.duration - 0.001)
        );
        src.connect(gain).connect(ctx.destination);
        src.start();
        return;
      } catch (_) {}
    }
    playSynthBomb();
  }

  function playBombConfetti() {
    const previous = $(".ff-confetti");
    if (previous) previous.remove();
    const host = document.createElement("div");
    host.className = "ff-confetti";
    host.setAttribute("aria-hidden", "true");
    document.body.appendChild(host);
    const vw = window.innerWidth;
    const duration = 2000;
    const colors = [
      "#ff4a5a",
      "#2fd572",
      "#ffd93d",
      "#ffffff",
      "#ff8a3d",
      "#4aa3ff",
      "#c86bff",
    ];
    for (let i = 0; i < 180; i++) {
      const piece = document.createElement("div");
      piece.className = "ff-confetti-piece";
      const size = 6 + Math.random() * 9;
      const startOffset = 20 + Math.random() * 80;
      piece.style.width = size + "px";
      piece.style.height = size + "px";
      piece.style.left = `calc(100% + ${startOffset}px)`;
      piece.style.top = Math.random() * 100 + "%";
      piece.style.background = colors[i % colors.length];
      piece.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
      host.appendChild(piece);
      const dist = vw + startOffset + size + 120;
      const rot = (Math.random() - 0.5) * 900;
      piece.animate(
        [
          { transform: "translate(0px, 0px) rotate(0deg)", opacity: 1 },
          {
            transform: `translateX(${-dist}px) rotate(${rot}deg)`,
            opacity: 0.12,
          },
        ],
        {
          duration,
          easing: "linear",
        }
      );
    }
    setTimeout(() => {
      host.remove();
    }, duration + 50);
  }

  function playEndBeep() {
    const ctx = getAudioCtx();
    if (!ctx) return;
    try {
      for (let i = 0; i < 5; i++) {
        const base = i * 0.22;
        [0, 0.11].forEach((offset, j) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.value = j === 0 ? 1046 : 784;
          gain.gain.setValueAtTime(0.12, ctx.currentTime + base + offset);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + base + offset + 0.07);
          osc.connect(gain).connect(ctx.destination);
          osc.start(ctx.currentTime + base + offset);
          osc.stop(ctx.currentTime + base + offset + 0.08);
        });
      }
    } catch (_) {}
  }


  const ROUND_SECONDS = 30;

  function ffRandomSeconds() {
    const s = ffSettings;
    let min;
    let max;
    if (s.speedMode === "rapido") {
      min = 10;
      max = 60;
    } else if (s.speedMode === "lento") {
      min = 45;
      max = 120;
    } else if (s.speedMode === "custom") {
      min = Math.max(1, Math.min(s.customMin || 10, 300));
      max = Math.max(min, Math.min(s.customMax || 60, 300));
    } else {
      min = 25;
      max = 90;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  }

  function timerEl() {
    return views.fastfriends.classList.contains("active")
      ? $("#btn-ff-timer")
      : $("#btn-timer");
  }

  function renderTimer() {
    const el = timerEl();
    if (views.fastfriends.classList.contains("active")) {
      el.textContent = "⏱";
    } else {
      el.textContent = `⏱ ${timerLeft}s`;
    }
    el.classList.toggle("running", timerHandle != null);
    el.classList.toggle("done", timerLeft === 0);
  }

  function clearTimer() {
    if (timerHandle != null) {
      clearInterval(timerHandle);
      timerHandle = null;
    }
    timerLeft = 0;
    const el = timerEl();
    if (el) {
      el.textContent = views.fastfriends.classList.contains("active")
        ? "⏱"
        : `⏱ ${ROUND_SECONDS}s`;
      el.classList.remove("running", "done");
    }
  }

  function toggleTimer() {
    if (timerHandle != null) {
      clearTimer();
      return;
    }
    const ctx = getAudioCtx();
    if (ctx && ctx.state === "suspended") {
      try { ctx.resume(); } catch (_) {}
    }
    if (views.fastfriends.classList.contains("active")) {
      loadBombSound();
    }
    timerLeft = views.fastfriends.classList.contains("active")
      ? ffRandomSeconds()
      : ROUND_SECONDS;
    timerHandle = setInterval(() => {
      timerLeft -= 1;
      if (timerLeft <= 0) {
        timerLeft = 0;
        clearTimer();
        if (views.fastfriends.classList.contains("active")) {
          playBombSound();
          playBombConfetti();
        } else {
          playEndBeep();
        }
        toast("¡Tiempo!");
        return;
      }
      playTick();
      renderTimer();
    }, 1000);
    renderTimer();
  }

  function startGame() {
    if (!currentGameId) return;
    if (currentGameId === "wavelength") {
      showView("wavelength");
      renderWavelength();
    } else if (currentGameId === "fastfriends") {
      showView("fastfriends");
      renderFastFriends();
    } else {
      showView("play");
      renderPlay();
    }
  }

  // ---------- play (amigos / mente) ----------
  function renderPlay() {
    const g = GAMES[currentGameId];
    const d = decks[currentGameId];
    $("#btn-score-toggle").hidden = !isScoreGame(currentGameId) || currentGameId === "timesup";
    $("#btn-teams").hidden = currentGameId !== "timesup";
    $("#btn-timer").hidden = currentGameId !== "timesup";
    $("#btn-rotate-face").hidden = !isCardViewerGame(currentGameId);
    if (currentGameId === "timesup") {
      $("#btn-prev").textContent = "←";
      $("#btn-next").textContent = "→";
      $("#btn-remove").hidden = true;
      $("#btn-team-red").hidden = false;
      $("#btn-team-blue").hidden = false;
      $("#btn-undo").hidden = false;
      $("#btn-removed").hidden = true;
      $("#hint-remove").hidden = true;
    } else {
      $("#btn-prev").textContent = "← Anterior";
      $("#btn-next").textContent = "Siguiente →";
      $("#btn-remove").hidden = false;
      $("#btn-team-red").hidden = true;
      $("#btn-team-blue").hidden = true;
      $("#btn-undo").hidden = true;
      $("#btn-removed").hidden = false;
      $("#hint-remove").hidden = false;
    }
    $("#play-footer").classList.toggle("timesup-footer", currentGameId === "timesup");
    $("#team-red-count").textContent = timesupTeams.red.length;
    $("#team-blue-count").textContent = timesupTeams.blue.length;
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
      if (currentGameId === "timesup") {
        $("#empty-title").textContent = "¡Fin de la fase!";
        $("#timesup-end").hidden = false;
        spawnConfetti();
      } else {
        $("#empty-title").textContent = "No quedan cartas";
        $("#timesup-end").hidden = true;
        clearConfetti();
      }
      return;
    }
    empty.hidden = true;
    img.hidden = false;
    clearConfetti();
    const id = currentId(currentGameId);
    img.src = cardUrl(currentGameId, id);
    img.alt = `Carta ${id}`;
    applyCardRotation();
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
    d.order = shuffle(d.order);
    d.index = 0;
    saveState();
    toast("Mazo barajado");
    refreshCurrentView(gameId);
  }

  function resetDeck(gameId = currentGameId) {
    if (gameId === "timesup" && decks.timesup && decks.timesup.order.length === 0) {
      // fin de fase: devolver las cartas de los equipos y limpiar el historial
      timesupTeams = { red: [], blue: [] };
      timesupHistory = [];
    }
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
        gameId === "wavelength"
          ? $("#wl-swipe-feedback")
          : gameId === "fastfriends"
            ? $("#ff-swipe-feedback")
            : $("#swipe-feedback");
      if (!fb) return;
      if (Math.abs(dy) > Math.abs(dx) && dy < -40 && gameId !== "timesup" && gameId !== "fastfriends") {
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
        gameId === "wavelength"
          ? $("#wl-swipe-feedback")
          : gameId === "fastfriends"
            ? $("#ff-swipe-feedback")
            : $("#swipe-feedback");
      if (fb) {
        fb.className = "swipe-feedback";
        fb.textContent = "";
      }

      const absX = Math.abs(dx);
      const absY = Math.abs(dy);
      const threshold = 70;

      if (absY > absX && dy < -threshold && gameId !== "timesup" && gameId !== "fastfriends") {
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
          gameIdGetter() === "wavelength"
            ? $("#wl-card")
            : gameIdGetter() === "fastfriends"
              ? $("#ff-card")
              : $("#card-face");
        onMove(t.clientX, t.clientY, target);
      },
      { passive: false }
    );
    el.addEventListener(
      "touchend",
      (e) => {
        const t = e.changedTouches[0];
        const target =
          gameIdGetter() === "wavelength"
            ? $("#wl-card")
            : gameIdGetter() === "fastfriends"
              ? $("#ff-card")
              : $("#card-face");
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
        gameIdGetter() === "wavelength"
            ? $("#wl-card")
            : gameIdGetter() === "fastfriends"
              ? $("#ff-card")
              : $("#card-face");
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
        gameIdGetter() === "wavelength"
            ? $("#wl-card")
            : gameIdGetter() === "fastfriends"
              ? $("#ff-card")
              : $("#card-face");
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

    // teams (Time's Up)
    $("#btn-undo").addEventListener("click", undoLastAssignment);
    $("#btn-team-red").addEventListener("click", () => assignCurrentToTeam("red"));
    $("#btn-team-blue").addEventListener("click", () => assignCurrentToTeam("blue"));
    $("#btn-teams").addEventListener("click", openTeamsSheet);
    $("#btn-teams-close").addEventListener("click", closeTeamsSheet);
    $("#btn-teams-close-2").addEventListener("click", closeTeamsSheet);
    $("#teams-backdrop").addEventListener("click", closeTeamsSheet);
    $("#btn-teams-restore").addEventListener("click", returnAllTeamCards);
    $("#team-viewer-close").addEventListener("click", closeTeamViewer);
    $("#team-viewer-backdrop").addEventListener("click", closeTeamViewer);

    // card rotation
    $("#btn-rotate-face").addEventListener("click", toggleCardRotation);
    $("#card-image").addEventListener("load", () => {
      if (isCardViewerGame(currentGameId) && cardRotation[currentGameId]) applyCardRotation();
    });
    window.addEventListener("resize", () => {
      if (isCardViewerGame(currentGameId) && cardRotation[currentGameId]) applyCardRotation();
    });

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
    $("#deck-backdrop").addEventListener("click", closeDeckSheet);
    $("#deck-player-count").addEventListener("input", updateDeckPlayerInfo);
    $("#btn-deck-size").addEventListener("click", () => {
      timesupDeckSize = timesupDeckSize === 40 ? 20 : 40;
      saveState();
      $("#btn-deck-size").textContent = String(timesupDeckSize);
      toast("Mazo de " + timesupDeckSize + " cartas");
    });
    $("#btn-deck-player-minus").addEventListener("click", () => {
      $("#deck-player-count").value = getTimesupPlayerCount() - 1;
      updateDeckPlayerInfo();
    });
    $("#btn-deck-player-plus").addEventListener("click", () => {
      $("#deck-player-count").value = getTimesupPlayerCount() + 1;
      updateDeckPlayerInfo();
    });
    $("#btn-deal-timesup").addEventListener("click", dealTimesup);
    $("#btn-back-hand").addEventListener("click", backTimesupHand);
    $("#btn-refresh-hand").addEventListener("click", refreshTimesupHand);
    $("#btn-confirm-hand").addEventListener("click", confirmTimesupHand);
    $("#btn-deck-play").addEventListener("click", startPreparedTimesup);
    $("#btn-deck-new").addEventListener("click", resetTimesupSetup);

    // fast friends
    $("#btn-ff-back").addEventListener("click", () => {
      clearTimer();
      currentGameId = null;
      showView("home");
    });
    window.addEventListener("resize", () => {
      if (views.fastfriends.classList.contains("active")) {
        fitFastFriendsText();
        fitFastFriendsText($("#ff-card-back"), $("#ff-left-back"));
      }
    });
    $("#btn-ff-shuffle").addEventListener("click", () => shuffleDeck("fastfriends"));
    $("#btn-ff-reset").addEventListener("click", resetFastFriends);
    $("#btn-ff-timer").addEventListener("click", toggleTimer);
    $("#btn-ff-score").addEventListener("click", () => openScoreSheet("fastfriends"));
    $("#btn-ff-settings").addEventListener("click", openFfSettings);
    $("#btn-ff-settings-close").addEventListener("click", closeFfSettings);
    $("#ff-settings-backdrop").addEventListener("click", closeFfSettings);
    document.querySelectorAll('input[name="ff-speed"]').forEach((r) => {
      r.addEventListener("change", () => {
        $("#ff-custom-speed").hidden = r.value !== "custom";
      });
    });
    $("#ff-red").addEventListener("click", () => ffVote("up"));
    $("#ff-green").addEventListener("click", () => ffVote("down"));

    bindGestures($("#deck-stage"), () => currentGameId);
    bindGestures($("#wl-stage"), () => "wavelength");

    window.addEventListener("keydown", (e) => {
      if (!$("#team-viewer").hidden) {
        if (e.key === "Escape") closeTeamViewer();
        return;
      }
      if (!$("#teams-sheet").hidden) {
        if (e.key === "Escape") closeTeamsSheet();
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
      if (!$("#ff-settings-sheet").hidden) {
        if (e.key === "Escape") closeFfSettings();
        return;
      }
      if (views.play.classList.contains("active")) {
        // inverted keyboard to match swipe feel: left = next
        if (e.key === "ArrowLeft") goNext(currentGameId);
        if (e.key === "ArrowRight") goPrev(currentGameId);
        if ((e.key === "ArrowUp" || e.key === "Delete" || e.key === "Backspace") && currentGameId !== "timesup") {
          e.preventDefault();
          removeCurrent(currentGameId);
        }
        if (e.key.toLowerCase() === "s") shuffleDeck(currentGameId);
        if (e.key.toLowerCase() === "r" && currentGameId !== "timesup") openRemovedSheet(currentGameId);
        if (e.key.toLowerCase() === "t") toggleTimer();
      }
      if (views.fastfriends.classList.contains("active")) {
        if (e.key.toLowerCase() === "t") toggleTimer();
        if (e.key.toLowerCase() === "s") shuffleDeck("fastfriends");
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
    if (saved && Number.isFinite(saved.fastfriendsLives)) {
      fastfriendsLives = saved.fastfriendsLives;
    }
    if (saved && saved.ffSettings && typeof saved.ffSettings === "object") {
      const s = saved.ffSettings;
      if (typeof s.failAdvances === "boolean") ffSettings.failAdvances = s.failAdvances;
      if (["rapido", "normal", "lento", "custom"].includes(s.speedMode)) {
        ffSettings.speedMode = s.speedMode;
      }
      if (Number.isFinite(s.customMin)) {
        ffSettings.customMin = Math.max(1, Math.min(300, s.customMin));
      }
      if (Number.isFinite(s.customMax)) {
        ffSettings.customMax = Math.max(1, Math.min(300, s.customMax));
      }
      if (ffSettings.customMax < ffSettings.customMin) {
        ffSettings.customMax = ffSettings.customMin;
      }
    }
    if (saved && (saved.timesupDeckSize === 40 || saved.timesupDeckSize === 20)) {
      timesupDeckSize = saved.timesupDeckSize;
    }
    if (saved && saved.timesupTeams && Array.isArray(saved.timesupTeams.red) && Array.isArray(saved.timesupTeams.blue)) {
      const valid = new Set(rangeIds(GAMES.timesup.count));
      timesupTeams = {
        red: saved.timesupTeams.red.filter((x) => valid.has(x)),
        blue: saved.timesupTeams.blue.filter((x) => valid.has(x)),
      };
    }
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
    if (saved && saved.cardRotation && typeof saved.cardRotation === "object") {
      for (const key of Object.keys(cardRotation)) {
        if (typeof saved.cardRotation[key] === "boolean") {
          cardRotation[key] = saved.cardRotation[key];
        }
      }
    }
    saveState();

    try {
      const res = await fetch("assets/fast-friends-frases.json");
      fastfriendsFrases = (await res.json()).frases || [];
    } catch (err) {
      console.error(err);
      fastfriendsFrases = [];
    }
    loadBombSound();

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
