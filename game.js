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
      { id: "orange", hex: "#f28a2e" },
      { id: "lime", hex: "#9ccc3c" },
    ],
    vehicleTypes = [
      { id: "moto", capacity: 1, unlock: 0, weight: 18 },
      { id: "car", capacity: 2, unlock: 0, weight: 46 },
      { id: "van", capacity: 4, unlock: 4, weight: 25 },
      { id: "bus", capacity: 6, unlock: 9, weight: 11 },
    ],
    dinoSpecies = ["rex", "tri", "stego", "brachio", "raptor", "ankylo"],
    dirs = ["U", "R", "D", "L"],
    arrows = { U: "↑", R: "→", D: "↓", L: "←" },
    themes = [
      { id: "city", icon: "🏙️" },
      { id: "park", icon: "🌳" },
      { id: "fair", icon: "🎡" },
      { id: "zoo", icon: "🦒" },
      { id: "ocean", icon: "🐚" },
      { id: "desert", icon: "🏜️" },
      { id: "snow", icon: "❄️" },
      { id: "jungle", icon: "🌋" },
      { id: "space", icon: "🪐" },
      { id: "candy", icon: "🍭" },
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
      gameType: "DINOJAM",
      back: "Voltar",
      settings: "Ajuda",
      hintButton: "Mostrar uma dica",
      restart: "Reiniciar nível",
      soundOn: "Desligar som",
      soundOff: "Ligar som",
      scene_city: "Cidade Dino",
      scene_park: "Parque Jurássico",
      scene_fair: "Feira Dino",
      scene_zoo: "Zoo Aventura",
      scene_ocean: "Mundo Submarino",
      scene_desert: "Vale Fóssil",
      scene_snow: "Montanha Gelada",
      scene_jungle: "Selva Vulcânica",
      scene_space: "Estação Espacial",
      scene_candy: "Vila dos Doces",
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
        blocked: "Esse carro está bloqueado!",
        full: "As vagas de espera estão cheias",
        hint: "Procure um carro livre da cor do primeiro passageiro",
        locked: "Complete a fase anterior",
        gameType: "DINOJAM",
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
        gameType: "DINOJAM",
        back: "Back",
        settings: "Help",
        hintButton: "Show a hint",
        restart: "Restart level",
        soundOn: "Turn sound off",
        soundOff: "Turn sound on",
        scene_city: "Dino City",
        scene_park: "Jurassic Park",
        scene_fair: "Dino Fair",
        scene_zoo: "Adventure Zoo",
        scene_ocean: "Underwater World",
        scene_desert: "Fossil Valley",
        scene_snow: "Frozen Mountain",
        scene_jungle: "Volcanic Jungle",
        scene_space: "Space Station",
        scene_candy: "Candy Village",
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
        gameType: "DINOJAM",
        back: "Retour",
        settings: "Aide",
        hintButton: "Afficher un indice",
        restart: "Recommencer le niveau",
        soundOn: "Couper le son",
        soundOff: "Activer le son",
        scene_city: "Dino Ville",
        scene_park: "Parc Jurassique",
        scene_fair: "Fête des Dinos",
        scene_zoo: "Zoo Aventure",
        scene_ocean: "Monde Sous-marin",
        scene_desert: "Vallée des Fossiles",
        scene_snow: "Montagne Gelée",
        scene_jungle: "Jungle Volcanique",
        scene_space: "Station Spatiale",
        scene_candy: "Village des Bonbons",
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
        gameType: "DINOJAM",
        back: "Zurück",
        settings: "Hilfe",
        hintButton: "Hinweis anzeigen",
        restart: "Level neu starten",
        soundOn: "Ton ausschalten",
        soundOff: "Ton einschalten",
        scene_city: "Dino-Stadt",
        scene_park: "Jurassic-Park",
        scene_fair: "Dino-Jahrmarkt",
        scene_zoo: "Abenteuer-Zoo",
        scene_ocean: "Unterwasserwelt",
        scene_desert: "Fossiliental",
        scene_snow: "Eisberg",
        scene_jungle: "Vulkan-Dschungel",
        scene_space: "Raumstation",
        scene_candy: "Süßigkeitendorf",
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
        gameType: "DINOJAM",
        back: "Volver",
        settings: "Ayuda",
        hintButton: "Mostrar una pista",
        restart: "Reiniciar nivel",
        soundOn: "Desactivar sonido",
        soundOff: "Activar sonido",
        scene_city: "Ciudad Dino",
        scene_park: "Parque Jurásico",
        scene_fair: "Feria Dino",
        scene_zoo: "Zoo Aventura",
        scene_ocean: "Mundo Submarino",
        scene_desert: "Valle Fósil",
        scene_snow: "Montaña Helada",
        scene_jungle: "Selva Volcánica",
        scene_space: "Estación Espacial",
        scene_candy: "Villa de los Dulces",
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
        gameType: "DINOJAM",
        back: "Wstecz",
        settings: "Pomoc",
        hintButton: "Pokaż podpowiedź",
        restart: "Uruchom poziom ponownie",
        soundOn: "Wyłącz dźwięk",
        soundOff: "Włącz dźwięk",
        scene_city: "Dino Miasto",
        scene_park: "Park Jurajski",
        scene_fair: "Dino Wesołe Miasteczko",
        scene_zoo: "Zoo Przygód",
        scene_ocean: "Podwodny Świat",
        scene_desert: "Dolina Skamieniałości",
        scene_snow: "Lodowa Góra",
        scene_jungle: "Wulkaniczna Dżungla",
        scene_space: "Stacja Kosmiczna",
        scene_candy: "Wioska Słodyczy",
      },
    };
  let text = translations.en,
    TOTAL_LEVELS = 200,
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
      chapter = Math.floor(index / 20),
      size = Math.min(10, 5 + Math.floor(index / 20)),
      target = Math.min(size * size - 4, 12 + Math.floor(index / 5) + (index % 4)),
      colorCount = Math.min(palette.length, 3 + Math.floor(index / 18)),
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
      const availableTypes = vehicleTypes.filter((type) => index >= type.unlock);
      let pick = random() * availableTypes.reduce((sum, type) => sum + type.weight, 0);
      const type = list.length < availableTypes.length
        ? availableTypes[list.length]
        : availableTypes.find((candidate) => (pick -= candidate.weight) <= 0) || availableTypes[0];
      list.push({
        id: `${index}-${list.length}`,
        x: cell.x,
        y: cell.y,
        dir,
        color,
        type: type.id,
        capacity: type.capacity,
        loaded: 0,
        mystery: index > 20 && random() < Math.min(0.24, 0.08 + chapter * 0.015),
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
        const original = list.find((item) => item.id === car.id);
        if (original) original.dir = car.dir;
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
      bays: Math.min(6, 4 + Math.floor(index / 40)),
      theme: themes[index % themes.length],
    };
  }
  const levels = Array.from({ length: TOTAL_LEVELS }, (_, i) => generateLevel(i));
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
    $("homeLevelLabel").textContent = text.level;
    $("homeKicker").innerHTML = `<span>🦖</span> ${text.gameType}`;
    $("play").innerHTML = `<span>▶</span> ${text.play}`;
    $("levelsButton").innerHTML = `<span>▦</span> ${text.levels}`;
    $("resultLevelLabel").textContent = text.level;
    $("next").innerHTML = `<span>▶</span> ${text.next}`;
    $("retry").innerHTML = `<span>↻</span> ${text.retry}`;
    $("resultLevels").innerHTML = `<span>▦</span> ${text.levels}`;
    for (const [id, key] of [
      ["back", "back"],
      ["settings", "settings"],
      ["hint", "hintButton"],
      ["restart", "restart"],
    ]) {
      $(id).title = text[key];
      $(id).setAttribute("aria-label", text[key]);
    }
    updateSoundLabel();
  }
  function updateSoundLabel() {
    const label = soundOn ? text.soundOn : text.soundOff;
    $("sound").title = label;
    $("sound").setAttribute("aria-label", label);
  }
  function updateHomeProgress() {
    const completed = Object.keys(best).filter((key) => best[key]?.stars).length,
      stars = Object.values(best).reduce((sum, item) => sum + (Number(item?.stars) || 0), 0),
      nextLevel = Math.min(Math.max(1, unlocked), levels.length);
    $("homeProgressText").textContent = `${nextLevel} / ${levels.length}`;
    $("homeProgressBar").style.width = `${Math.max(3, (completed / levels.length) * 100)}%`;
    $("homeStars").textContent = stars;
    $("homeMaxStars").textContent = levels.length * 3;
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
    let passengerNumber = 0;
    passengers = levelData.order.flatMap((car) =>
      Array.from({ length: car.capacity }, () => ({
        ...car.color,
        species: dinoSpecies[(levelIndex + passengerNumber++) % dinoSpecies.length],
      })),
    );
    waiting = [];
    score = 1000 + levelIndex * 120;
    mistakes = 0;
    running = true;
    document.body.classList.add("playing");
    $("levelNumber").textContent = levelIndex + 1;
    $("world").className = `world theme-${levelData.theme.id}`;
    $("sceneIcon").textContent = levelData.theme.icon;
    $("sceneName").textContent = text[`scene_${levelData.theme.id}`] || translations.en[`scene_${levelData.theme.id}`];
    $("result").className = `screen theme-${levelData.theme.id}`;
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
      p.className = `passenger dino-${color.species} ${i === 0 ? "next" : ""}`;
      p.style.setProperty("--person", color.hex);
      p.innerHTML = `
        <i class="dino-tail"></i><i class="dino-neck"></i><i class="dino-head"></i>
        <i class="dino-eye eye-a"></i><i class="dino-eye eye-b"></i>
        <i class="dino-snout"></i><i class="dino-mouth"></i><i class="dino-belly"></i>
        <i class="dino-arm arm-a"></i><i class="dino-arm arm-b"></i>
        <i class="dino-mark mark-a"></i><i class="dino-mark mark-b"></i><i class="dino-mark mark-c"></i>
      `;
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
        slot.classList.add("occupied");
        slot.style.setProperty("--slot-color", waiting[i].color.hex);
        const mini = document.createElement("span");
        mini.className = `mini-car vehicle-${waiting[i].type}`;
        mini.dataset.parkedId = waiting[i].id;
        mini.style.setProperty("--car", waiting[i].color.hex);
        mini.innerHTML = `<i class="vehicle-roof"></i><i class="vehicle-glass glass-front"></i><i class="vehicle-glass glass-rear"></i><i class="wheel wheel-fl"></i><i class="wheel wheel-fr"></i><i class="wheel wheel-rl"></i><i class="wheel wheel-rr"></i><i class="vehicle-light light-l"></i><i class="vehicle-light light-r"></i><b class="capacity">${waiting[i].loaded}/${waiting[i].capacity}</b>`;
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
      b.className = `car vehicle-${car.type} ${horizontal ? "horizontal" : ""} ${car.mystery ? "mystery" : ""}`;
      b.dataset.id = car.id;
      b.style.cssText += `--car:${car.color.hex};--x:${car.x * w + w * 0.21}%;--y:${car.y * w + w * 0.03}%;--cw:${w * 0.58}%;--ch:${w * 0.94}%;`;
      if (horizontal) b.style.rotate = "90deg";
      b.innerHTML = `
        <i class="vehicle-bumper bumper-front"></i><i class="vehicle-bumper bumper-rear"></i>
        <i class="vehicle-roof"></i><i class="vehicle-glass glass-front"></i><i class="vehicle-glass glass-rear"></i>
        <i class="vehicle-glass glass-side side-a"></i><i class="vehicle-glass glass-side side-b"></i>
        <i class="vehicle-door door-a"></i><i class="vehicle-door door-b"></i>
        <i class="wheel wheel-fl"></i><i class="wheel wheel-fr"></i><i class="wheel wheel-rl"></i><i class="wheel wheel-rr"></i>
        <i class="vehicle-light light-l"></i><i class="vehicle-light light-r"></i><i class="vehicle-grille"></i>
        <span class="vehicle-mark">${car.type === "van" ? "VAN" : car.type === "bus" ? "DINO BUS" : ""}</span>
        <b class="seat-count">${car.capacity}</b><span class="car-arrow">${arrows[car.dir]}</span>
      `;
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
      animating = true;
      await processWaiting();
      animating = false;
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
      car.loaded < car.capacity
    ) {
      const passenger = document.querySelector(".passenger.next");
      const parked = document.querySelector(`[data-parked-id="${car.id}"]`);
      if (passenger && parked) {
        await flyElement(passenger, parked, "passenger-flight");
      }
      passengers.shift();
      count++;
      car.loaded++;
      renderPassengers();
      renderSlots();
      $("remaining").textContent = passengers.length;
    }
    score += count * 100;
    if (car.loaded >= car.capacity) {
      const parked = document.querySelector(`[data-parked-id="${car.id}"]`);
      if (parked) {
        parked.classList.add("driving-out");
        await sleep(720);
      }
    }
    return { full: car.loaded >= car.capacity, boarded: count };
  }
  async function processWaiting() {
    let moved = true;
    while (moved && passengers.length) {
      moved = false;
      const i = waiting.findIndex((c) => c.color.id === passengers[0].id);
      if (i >= 0) {
        const car = waiting[i];
        const result = await boardCar(car);
        if (result.full) waiting.splice(i, 1);
        renderSlots();
        moved = result.boarded > 0;
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
    updateHomeProgress();
    $("stars").textContent = "★".repeat(stars) + "☆".repeat(3 - stars);
    $("finalScore").textContent = score;
    $("resultLevelNumber").textContent = levelIndex + 1;
    $("resultSceneIcon").textContent = levelData.theme.icon;
    $("resultSceneName").textContent = text[`scene_${levelData.theme.id}`] || translations.en[`scene_${levelData.theme.id}`];
    $("next").style.display = levelIndex < levels.length - 1 ? "block" : "none";
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
    levelIndex = Math.min(unlocked - 1, levels.length - 1);
    loadLevel();
  };
  $("levelsButton").onclick = openLevels;
  $("closeLevels").onclick = () => show("home");
  $("back").onclick = () => {
    running = false;
    document.querySelectorAll(".parking-flight,.passenger-flight").forEach((item) => item.remove());
    document.body.classList.remove("playing");
    show("home");
  };
  $("restart").onclick = loadLevel;
  $("hint").onclick = hint;
  $("settings").onclick = hint;
  $("sound").onclick = () => {
    soundOn = !soundOn;
    $("sound").textContent = soundOn ? "🔊" : "🔇";
    updateSoundLabel();
    tone(440);
  };
  $("next").onclick = () => {
    levelIndex = Math.min(levels.length - 1, levelIndex + 1);
    loadLevel();
  };
  $("retry").onclick = loadLevel;
  $("resultLevels").onclick = openLevels;
  async function start() {
    let language = new URLSearchParams(location.search).get("lang") || "en";
    try {
      const ctx = await DinoPlay.ready();
      language = ctx.language || "en";
      const saved = await DinoPlay.storage.get("dinojam-progress-v2");
      if (saved) {
        unlocked = Math.min(levels.length, Math.max(1, Number(saved.unlocked) || 1));
        best = saved.best || {};
      }
    } catch {
      try {
        const saved = JSON.parse(localStorage.getItem("dinojam-progress-v2"));
        if (saved) {
          unlocked = Math.min(levels.length, Math.max(1, Number(saved.unlocked) || 1));
          best = saved.best || {};
        }
      } catch {}
    }
    const normalized = String(language || "en").replace("_", "-").toLowerCase();
    const languageKey = normalized.startsWith("pt-br")
      ? "pt-BR"
      : normalized.startsWith("pt")
        ? "pt-PT"
        : ["en", "fr", "de", "es", "pl"].find((code) => normalized.startsWith(code)) || "en";
    text = translations[languageKey] || translations.en;
    document.documentElement.lang = languageKey;
    translate();
    updateHomeProgress();
    buildGrid();
    if ((location.hostname === "localhost" || location.hostname === "127.0.0.1") && new URLSearchParams(location.search).get("screen") === "result") {
      levelIndex = Math.min(10, levels.length - 1);
      levelData = levels[levelIndex];
      $("result").className = `screen theme-${levelData.theme.id}`;
      $("resultLevelNumber").textContent = levelIndex + 1;
      $("resultSceneIcon").textContent = levelData.theme.icon;
      $("resultSceneName").textContent = text[`scene_${levelData.theme.id}`] || translations.en[`scene_${levelData.theme.id}`];
      $("stars").textContent = "★★★";
      $("finalScore").textContent = "8040";
      $("next").style.display = "flex";
      show("result");
    }
  }
  start();
})();
