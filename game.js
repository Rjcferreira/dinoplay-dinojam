(() => {
  "use strict";
  const $ = (id) => document.getElementById(id),
    palette = [
      { id: "red", hex: "#ef5350" },
      { id: "yellow", hex: "#f4c430" },
      { id: "green", hex: "#55b94e" },
      { id: "blue", hex: "#3f8ce3" },
      { id: "cyan", hex: "#35c5d4" },
      { id: "purple", hex: "#9b62d7" },
      { id: "pink", hex: "#ef72b3" },
    ],
    dirs = ["U", "R", "D", "L"],
    arrows = { U: "↑", R: "→", D: "↓", L: "←" },
    themes = [
      { id: "city", icon: "🏙️", name: "Cidade Dino" },
      { id: "park", icon: "🌳", name: "Parque Jurássico" },
      { id: "fair", icon: "🎡", name: "Feira Dino" },
      { id: "zoo", icon: "🦒", name: "Zoo Aventura" },
      { id: "ocean", icon: "🐚", name: "Mundo Submarino" },
      { id: "desert", icon: "🏜️", name: "Vale Fóssil" },
      { id: "snow", icon: "❄️", name: "Montanha Gelada" },
    ];
  const base = {
      tagline: "Liberta os carros e transporta os dinos!",
      play: "JOGAR",
      levels: "ESCOLHER NÍVEL",
      choose: "Escolhe um nível",
      level: "NÍVEL",
      queue: "FILA",
      complete: "NÍVEL CONCLUÍDO",
      win: "Parque resolvido!",
      score: "Pontuação",
      next: "PRÓXIMO NÍVEL",
      retry: "JOGAR NOVAMENTE",
      blocked: "Esse carro está bloqueado!",
      full: "Os lugares de espera estão cheios",
      hint: "Procura um carro livre da cor do primeiro passageiro",
      locked: "Completa o nível anterior",
    },
    translations = {
      "pt-PT": base,
      "pt-BR": {
        ...base,
        tagline: "Liberte os carros e transporte os dinos!",
        levels: "ESCOLHER FASE",
        choose: "Escolha uma fase",
        level: "FASE",
        complete: "FASE CONCLUÍDA",
        next: "PRÓXIMA FASE",
      },
      en: {
        tagline: "Free the cars and carry the dinos!",
        play: "PLAY",
        levels: "CHOOSE LEVEL",
        choose: "Choose a level",
        level: "LEVEL",
        queue: "QUEUE",
        complete: "LEVEL COMPLETE",
        win: "Parking solved!",
        score: "Score",
        next: "NEXT LEVEL",
        retry: "PLAY AGAIN",
        blocked: "That car is blocked!",
        full: "The waiting spaces are full",
        hint: "Find a free car matching the first passenger",
        locked: "Complete the previous level",
      },
      fr: {
        ...base,
        tagline: "Libère les voitures et transporte les dinos !",
        play: "JOUER",
        levels: "CHOISIR UN NIVEAU",
        choose: "Choisis un niveau",
        level: "NIVEAU",
        queue: "FILE",
        complete: "NIVEAU TERMINÉ",
        win: "Parking résolu !",
        score: "Score",
        next: "NIVEAU SUIVANT",
        retry: "REJOUER",
        blocked: "Cette voiture est bloquée !",
        full: "Les places d’attente sont pleines",
        hint: "Trouve une voiture libre de la couleur du premier passager",
        locked: "Termine le niveau précédent",
      },
      de: {
        ...base,
        tagline: "Befreie die Autos und fahre die Dinos!",
        play: "SPIELEN",
        levels: "LEVEL WÄHLEN",
        choose: "Wähle ein Level",
        level: "LEVEL",
        queue: "SCHLANGE",
        complete: "LEVEL GESCHAFFT",
        win: "Parkplatz gelöst!",
        score: "Punktzahl",
        next: "NÄCHSTES LEVEL",
        retry: "NOCH EINMAL",
        blocked: "Dieses Auto ist blockiert!",
        full: "Die Warteplätze sind voll",
        hint: "Finde ein freies Auto in der Farbe des ersten Fahrgasts",
        locked: "Schließe das vorige Level ab",
      },
      es: {
        ...base,
        tagline: "¡Libera los coches y transporta a los dinos!",
        play: "JUGAR",
        levels: "ELEGIR NIVEL",
        choose: "Elige un nivel",
        level: "NIVEL",
        queue: "FILA",
        complete: "NIVEL COMPLETADO",
        win: "¡Aparcamiento resuelto!",
        score: "Puntuación",
        next: "SIGUIENTE NIVEL",
        retry: "JUGAR DE NUEVO",
        blocked: "¡Ese coche está bloqueado!",
        full: "Los espacios de espera están llenos",
        hint: "Busca un coche libre del color del primer pasajero",
        locked: "Completa el nivel anterior",
      },
      pl: {
        ...base,
        tagline: "Uwolnij auta i przewieź dinozaury!",
        play: "GRAJ",
        levels: "WYBIERZ POZIOM",
        choose: "Wybierz poziom",
        level: "POZIOM",
        queue: "KOLEJKA",
        complete: "POZIOM UKOŃCZONY",
        win: "Parking rozwiązany!",
        score: "Wynik",
        next: "NASTĘPNY POZIOM",
        retry: "ZAGRAJ PONOWNIE",
        blocked: "Ten samochód jest zablokowany!",
        full: "Miejsca oczekiwania są pełne",
        hint: "Znajdź wolny samochód w kolorze pierwszego pasażera",
        locked: "Ukończ poprzedni poziom",
      },
    };
  let text = translations.en,
    levelIndex = 0,
    unlocked = 1,
    best = {},
    cars = [],
    passengers = [],
    waiting = [],
    animating = false,
    score = 0,
    mistakes = 0,
    running = false,
    soundOn = true,
    audio = null,
    boardSize = 6,
    levelData = null;
  function rng(seed) {
    let v = seed >>> 0;
    return () => (v = (v * 1664525 + 1013904223) >>> 0) / 4294967296;
  }
  function pathClear(car, list) {
    const step = { U: [0, -1], R: [1, 0], D: [0, 1], L: [-1, 0] }[car.dir];
    let x = car.x + step[0],
      y = car.y + step[1];
    while (x >= 0 && x < boardSize && y >= 0 && y < boardSize) {
      if (list.some((o) => o.id !== car.id && o.x === x && o.y === y))
        return false;
      x += step[0];
      y += step[1];
    }
    return true;
  }
  function generateLevel(index) {
    const random = rng(9021 + index * 811),
      size = Math.min(10, 5 + Math.floor(index / 5)),
      target = Math.min(size * size - 4, 12 + index * 2),
      colorCount = Math.min(7, 3 + Math.floor(index / 6)),
      list = [];
    boardSize = size;
    const cells = [];
    for (let y = 0; y < size; y++)
      for (let x = 0; x < size; x++) cells.push({ x, y });
    cells.sort(() => random() - 0.5);
    for (const cell of cells) {
      if (list.length >= target) break;
      const distances = [cell.y, size - 1 - cell.x, size - 1 - cell.y, cell.x],
        min = Math.min(...distances),
        choices = dirs.filter((_, i) => distances[i] === min),
        dir = choices[Math.floor(random() * choices.length)],
        color = palette[Math.floor(random() * colorCount)];
      list.push({
        id: `${index}-${list.length}`,
        x: cell.x,
        y: cell.y,
        dir,
        color,
        mystery: index > 20 && random() < 0.14,
      });
    }
    const work = list.map((c) => ({ ...c })),
      order = [];
    while (work.length) {
      let free = work.filter((car) => pathClear(car, work));
      if (!free.length) {
        const car = work[0],
          dist = [car.y, size - 1 - car.x, size - 1 - car.y, car.x],
          i = dist.indexOf(Math.min(...dist));
        car.dir = dirs[i];
        free = [car];
      }
      const car = free[Math.floor(random() * free.length)];
      order.push(car);
      work.splice(
        work.findIndex((c) => c.id === car.id),
        1,
      );
    }
    return {
      size,
      cars: list,
      order,
      bays: index < 8 ? 4 : index < 20 ? 5 : 6,
      theme: themes[Math.floor(index / 5) % themes.length],
    };
  }
  const levels = Array.from({ length: 30 }, (_, i) => generateLevel(i));
  function tone(f, d = 0.08) {
    if (!soundOn) return;
    try {
      audio ||= new AudioContext();
      const o = audio.createOscillator(),
        g = audio.createGain();
      o.frequency.value = f;
      g.gain.setValueAtTime(0.05, audio.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + d);
      o.connect(g).connect(audio.destination);
      o.start();
      o.stop(audio.currentTime + d);
    } catch {}
  }
  function show(id) {
    document
      .querySelectorAll(".screen")
      .forEach((s) => s.classList.remove("open"));
    if (id) $(id).classList.add("open");
  }
  function toast(m) {
    $("toast").textContent = m;
    $("toast").classList.add("show");
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => $("toast").classList.remove("show"), 1400);
  }
  function translate() {
    for (const [id, key] of [
      ["tagline", "tagline"],
      ["play", "play"],
      ["levelsButton", "levels"],
      ["levelsTitle", "choose"],
      ["levelWord", "level"],
      ["queueWord", "queue"],
      ["resultEyebrow", "complete"],
      ["resultTitle", "win"],
      ["finalScoreLabel", "score"],
      ["next", "next"],
      ["retry", "retry"],
      ["resultLevels", "levels"],
    ])
      $(id).textContent = text[key];
  }
  function buildGrid() {
    const grid = $("levelGrid");
    grid.innerHTML = "";
    levels.forEach((_, i) => {
      const b = document.createElement("button"),
        stars = best[i]?.stars || 0;
      b.className = `level-tile ${i < unlocked ? "done" : "locked"}`;
      b.innerHTML = `${i + 1}<small>${"★".repeat(stars)}${"☆".repeat(3 - stars)}</small>`;
      b.onclick = () => {
        if (i >= unlocked) return toast(text.locked);
        levelIndex = i;
        loadLevel();
      };
      grid.appendChild(b);
    });
  }
  function loadLevel() {
    levelData = levels[levelIndex];
    boardSize = levelData.size;
    cars = levelData.cars.map((c) => ({ ...c }));
    passengers = levelData.order.flatMap((car) => [
      car.color,
      car.color,
      car.color,
    ]);
    waiting = [];
    score = 1000 + levelIndex * 120;
    mistakes = 0;
    running = true;
    document.body.classList.add("playing");
    $("levelNumber").textContent = levelIndex + 1;
    $("world").className = `world theme-${levelData.theme.id}`;
    $("sceneIcon").textContent = levelData.theme.icon;
    $("sceneName").textContent = levelData.theme.name;
    show(null);
    render();
    tone(440);
  }
  function render() {
    renderPassengers();
    renderSlots();
    renderCars();
    $("remaining").textContent = passengers.length;
  }
  function renderPassengers() {
    const line = $("passengerLine");
    line.innerHTML = "";
    passengers.slice(0, 28).forEach((color, i) => {
      const p = document.createElement("span");
      p.className = `passenger ${i === 0 ? "next" : ""}`;
      p.style.setProperty("--person", color.hex);
      p.innerHTML = '<i class="dino-eye"></i><i class="dino-snout"></i><i class="dino-tail"></i>';
      line.appendChild(p);
    });
    if (passengers.length > 28) {
      const p = document.createElement("span");
      p.className = "passenger more";
      p.textContent = `+${passengers.length - 28}`;
      line.appendChild(p);
    }
  }
  function renderSlots() {
    const box = $("boardingSlots");
    box.innerHTML = "";
    for (let i = 0; i < levelData.bays; i++) {
      const slot = document.createElement("div");
      slot.className = "slot";
      if (waiting[i]) {
        const mini = document.createElement("span");
        mini.className = "mini-car";
        mini.dataset.parkedId = waiting[i].id;
        mini.style.setProperty("--car", waiting[i].color.hex);
        mini.innerHTML = '<i class="mini-window"></i><i class="wheel wheel-fl"></i><i class="wheel wheel-fr"></i><i class="wheel wheel-rl"></i><i class="wheel wheel-rr"></i>';
        slot.appendChild(mini);
      }
      box.appendChild(slot);
    }
  }
  function renderCars() {
    const board = $("parkingBoard");
    board.innerHTML = "";
    cars.forEach((car) => {
      const b = document.createElement("button"),
        horizontal = car.dir === "L" || car.dir === "R",
        w = 100 / boardSize;
      b.className = `car ${horizontal ? "horizontal" : ""} ${car.mystery ? "mystery" : ""}`;
      b.dataset.id = car.id;
      b.style.cssText += `--car:${car.color.hex};--x:${car.x * w + w * 0.21}%;--y:${car.y * w + w * 0.03}%;--cw:${w * 0.58}%;--ch:${w * 0.94}%;`;
      if (horizontal) b.style.rotate = "90deg";
      b.innerHTML = `<i class="car-window front"></i><i class="car-window rear"></i><i class="wheel wheel-fl"></i><i class="wheel wheel-fr"></i><i class="wheel wheel-rl"></i><i class="wheel wheel-rr"></i><i class="car-lights"></i><span class="car-arrow">${arrows[car.dir]}</span>`;
      b.onclick = () => selectCar(car.id);
      board.appendChild(b);
    });
  }
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  function flyElement(source, target, className) {
    if (!source || !target) return Promise.resolve();
    const a = source.getBoundingClientRect(), b = target.getBoundingClientRect();
    const clone = source.cloneNode(true);
    clone.classList.add(className);
    clone.style.cssText += `;position:fixed;z-index:50;left:${a.left}px;top:${a.top}px;width:${a.width}px;height:${a.height}px;margin:0;rotate:0deg;transition:none;`;
    document.body.appendChild(clone);
    source.style.opacity = "0";
    requestAnimationFrame(() => requestAnimationFrame(() => {
      clone.style.transition = "left .48s cubic-bezier(.2,.75,.25,1),top .48s cubic-bezier(.2,.75,.25,1),width .48s,height .48s,transform .48s";
      clone.style.left = `${b.left + b.width / 2 - a.width * .32}px`;
      clone.style.top = `${b.top + b.height / 2 - a.height * .32}px`;
      clone.style.width = `${a.width * .64}px`;
      clone.style.height = `${a.height * .64}px`;
      clone.style.transform = "rotate(360deg)";
    }));
    return sleep(510).then(() => clone.remove());
  }
  async function selectCar(id) {
    if (!running || animating) return;
    const car = cars.find((c) => c.id === id),
      el = document.querySelector(`[data-id="${id}"]`);
    if (!car) return;
    if (!pathClear(car, cars)) {
      mistakes++;
      score = Math.max(0, score - 20);
      el?.classList.add("blocked-hit");
      setTimeout(() => el?.classList.remove("blocked-hit"), 750);
      toast(text.blocked);
      tone(140, 0.12);
      return;
    }
    if (waiting.length >= levelData.bays) {
      mistakes++;
      score = Math.max(0, score - 40);
      toast(text.full);
      tone(120, 0.15);
      return;
    }
    animating = true;
    cars.splice(cars.indexOf(car), 1);
    waiting.push(car);
    const slotIndex = waiting.length - 1;
    const targetSlot = $("boardingSlots").children[slotIndex];
    await flyElement(el, targetSlot, "parking-flight");
    render();
    if (passengers[0]?.id !== car.color.id) score = Math.max(0, score - 10);
    await processWaiting();
    animating = false;
    if (!passengers.length) finish();
    tone(640);
  }
  async function boardCar(car) {
    let count = 0;
    while (
      passengers.length &&
      passengers[0].id === car.color.id &&
      count < 3
    ) {
      const passenger = document.querySelector(".passenger.next");
      const parked = document.querySelector(`[data-parked-id="${car.id}"]`);
      if (passenger && parked) {
        await flyElement(passenger, parked, "passenger-flight");
      }
      passengers.shift();
      count++;
      renderPassengers();
      $("remaining").textContent = passengers.length;
    }
    score += count * 100;
    const parked = document.querySelector(`[data-parked-id="${car.id}"]`);
    if (parked) {
      parked.classList.add("driving-out");
      await sleep(620);
    }
  }
  async function processWaiting() {
    let moved = true;
    while (moved && passengers.length) {
      moved = false;
      const i = waiting.findIndex((c) => c.color.id === passengers[0].id);
      if (i >= 0) {
        const car = waiting[i];
        await boardCar(car);
        waiting.splice(i, 1);
        renderSlots();
        moved = true;
      }
    }
  }
  async function finish() {
    running = false;
    const stars = mistakes === 0 ? 3 : mistakes < 4 ? 2 : 1;
    score += stars * 500;
    const old = best[levelIndex];
    if (!old || score > old.score)
      best[levelIndex] = { score, stars: Math.max(stars, old?.stars || 0) };
    unlocked = Math.max(unlocked, Math.min(levels.length, levelIndex + 2));
    await save();
    $("stars").textContent = "★".repeat(stars) + "☆".repeat(3 - stars);
    $("finalScore").textContent = score;
    $("next").style.display = levelIndex < 29 ? "block" : "none";
    setTimeout(() => show("result"), 450);
    tone(784, 0.2);
  }
  async function save() {
    const value = { unlocked, best };
    try {
      await DinoPlay.storage.set("dinojam-progress-v2", value);
    } catch {
      localStorage.setItem("dinojam-progress-v2", JSON.stringify(value));
    }
  }
  function openLevels() {
    buildGrid();
    show("levels");
  }
  function hint() {
    const wanted = passengers[0]?.id,
      car = cars.find((c) => c.color.id === wanted && pathClear(c, cars));
    if (car) {
      const el = document.querySelector(`[data-id="${car.id}"]`);
      el?.classList.add("hint-car");
      setTimeout(() => el?.classList.remove("hint-car"), 3000);
    }
    toast(text.hint);
  }
  $("play").onclick = () => {
    levelIndex = Math.min(unlocked - 1, 29);
    loadLevel();
  };
  $("levelsButton").onclick = openLevels;
  $("closeLevels").onclick = () => show("home");
  $("back").onclick = () => {
    running = false;
    document.body.classList.remove("playing");
    show("home");
  };
  $("restart").onclick = loadLevel;
  $("hint").onclick = hint;
  $("settings").onclick = hint;
  $("sound").onclick = () => {
    soundOn = !soundOn;
    $("sound").textContent = soundOn ? "🔊" : "🔇";
    tone(440);
  };
  $("next").onclick = () => {
    levelIndex = Math.min(29, levelIndex + 1);
    loadLevel();
  };
  $("retry").onclick = loadLevel;
  $("resultLevels").onclick = openLevels;
  async function start() {
    let language = "en";
    try {
      const ctx = await DinoPlay.ready();
      language = ctx.language || "en";
      const saved = await DinoPlay.storage.get("dinojam-progress-v2");
      if (saved) {
        unlocked = Math.max(1, Number(saved.unlocked) || 1);
        best = saved.best || {};
      }
    } catch {
      try {
        const saved = JSON.parse(localStorage.getItem("dinojam-progress-v2"));
        if (saved) {
          unlocked = Math.max(1, Number(saved.unlocked) || 1);
          best = saved.best || {};
        }
      } catch {}
    }
    text = translations[language] || translations.en;
    translate();
    buildGrid();
  }
  start();
})();
