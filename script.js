const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const storageKeys = {
  liked: "spotifyClone.likedTracks",
  recent: "spotifyClone.recentTracks",
  theme: "spotifyClone.theme",
  profile: "spotifyClone.profile",
  custom: "spotifyClone.customPlaylists",
};

const tracks = [
  {
    id: "midnight-city",
    title: "Midnight City",
    artist: "Neon Skyline",
    album: "After Hours",
    cover: "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?auto=format&fit=crop&w=420&q=80",
    notes: [0, 3, 7, 10, 7, 3, 5, 8],
    lyrics: ["City lights are moving slowly", "Every window hums in green", "I keep driving through the static", "Chasing echoes in between"],
  },
  {
    id: "daily-mix-1",
    title: "Daily Mix 1",
    artist: "Codex Sessions",
    album: "Morning Blend",
    cover: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=420&q=80",
    notes: [0, 2, 4, 7, 9, 7, 4, 2],
    lyrics: ["Wake up with a little rhythm", "Coffee steam and open skies", "Every note is getting brighter", "Let the quiet morning rise"],
  },
  {
    id: "discover-weekly",
    title: "Discover Weekly",
    artist: "Codex Sessions",
    album: "New Paths",
    cover: "https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?auto=format&fit=crop&w=420&q=80",
    notes: [7, 5, 3, 0, 2, 3, 5, 10],
    lyrics: ["Found a sound behind the doorway", "Found a chorus down the street", "Every week a little secret", "Every turn a different beat"],
  },
  {
    id: "release-radar",
    title: "Release Radar",
    artist: "Codex Sessions",
    album: "Signal Bloom",
    cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=420&q=80",
    notes: [0, 5, 7, 12, 10, 7, 5, 3],
    lyrics: ["New waves rolling through the speaker", "Fresh sparks landing on the floor", "Turn it up and keep it moving", "There is always something more"],
  },
  {
    id: "pop-rising",
    title: "Pop Rising",
    artist: "Codex Sessions",
    album: "Bright Room",
    cover: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=420&q=80",
    notes: [4, 7, 9, 11, 12, 11, 9, 7],
    lyrics: ["Hands up where the lights can find us", "New hook running through the air", "Every voice becomes a skyline", "Every chorus takes us there"],
  },
  {
    id: "dance-party",
    title: "Dance Party",
    artist: "Codex Sessions",
    album: "Club Loop",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=420&q=80",
    notes: [0, 0, 7, 7, 10, 10, 7, 5],
    lyrics: ["Bassline knocking at the ceiling", "Footsteps flashing on the tile", "No one checks the clock at midnight", "Stay inside the groove awhile"],
  },
  {
    id: "todays-top-hits",
    title: "Today's Top Hits",
    artist: "Codex Sessions",
    album: "Streamline",
    cover: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=420&q=80",
    notes: [2, 4, 7, 9, 7, 4, 2, 0],
    lyrics: ["Everybody knows the feeling", "One song catches every room", "Press repeat and let it linger", "Let the afternoon go boom"],
  },
  {
    id: "rapcaviar",
    title: "RapCaviar",
    artist: "Codex Sessions",
    album: "Low End Theory",
    cover: "https://images.unsplash.com/photo-1499364615650-ec38552f4f34?auto=format&fit=crop&w=420&q=80",
    notes: [0, 3, 3, 5, 7, 10, 7, 5],
    lyrics: ["Sharp words cutting through the silence", "Kick drum heavy on the one", "Every bar is built for motion", "Every verse is just begun"],
  },
  {
    id: "viva-latino",
    title: "Viva Latino",
    artist: "Codex Sessions",
    album: "Solar Steps",
    cover: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=420&q=80",
    notes: [0, 4, 5, 7, 8, 7, 5, 4],
    lyrics: ["Warm air dancing on the corner", "Guitar sparks across the night", "Every rhythm turns to color", "Every color turns to light"],
  },
  {
    id: "acoustic-chill",
    title: "Acoustic Chill",
    artist: "Codex Sessions",
    album: "Quiet Strings",
    cover: "https://images.unsplash.com/photo-1482442120256-9c03866de390?auto=format&fit=crop&w=420&q=80",
    notes: [0, 2, 3, 7, 5, 3, 2, -2],
    lyrics: ["Soft rain tapping on the window", "One chair pulled beside the flame", "Slow chords settle on the table", "Everything can breathe again"],
  },
  {
    id: "on-repeat",
    title: "On Repeat",
    artist: "Codex Sessions",
    album: "Loop Memory",
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=420&q=80",
    notes: [7, 9, 12, 14, 12, 9, 7, 4],
    lyrics: ["Back again to the same chorus", "Back again to the same spark", "Some songs know the way around us", "Some songs glow inside the dark"],
  },
  {
    id: "fresh-finds",
    title: "Fresh Finds",
    artist: "Codex Sessions",
    album: "First Listen",
    cover: "https://images.unsplash.com/photo-1446057032654-9d8885db76c6?auto=format&fit=crop&w=420&q=80",
    notes: [0, 7, 5, 3, 5, 7, 10, 12],
    lyrics: ["New names written on the sidewalk", "New sounds waiting near the door", "First play turns into a favorite", "Then you need to hear one more"],
  },
];

const playlists = [
  { id: "popular", name: "Popular playlists", description: "The songs you cannot miss right now.", cover: tracks[6].cover, trackIds: ["todays-top-hits", "rapcaviar", "viva-latino", "acoustic-chill"] },
  { id: "made", name: "Made For You", description: "Personal mixes for your mood.", cover: tracks[1].cover, trackIds: ["daily-mix-1", "discover-weekly", "on-repeat", "midnight-city"] },
  { id: "charts", name: "Charts", description: "Top streams and rising tracks.", cover: tracks[11].cover, trackIds: ["fresh-finds", "pop-rising", "dance-party", "release-radar"] },
  { id: "night-drive", name: "Night Drive", description: "Dark roads and glowing windows.", cover: tracks[0].cover, trackIds: ["midnight-city", "dance-party", "on-repeat", "fresh-finds"] },
  { id: "acoustic-covers", name: "Acoustic Covers", description: "Soft guitars and easy focus.", cover: tracks[9].cover, trackIds: ["acoustic-chill", "daily-mix-1", "discover-weekly", "release-radar"] },
];

let customPlaylists = readJson(storageKeys.custom, []);
let likedTrackIds = readJson(storageKeys.liked, []);
let recentTrackIds = readJson(storageKeys.recent, ["midnight-city", "daily-mix-1", "discover-weekly", "release-radar", "pop-rising", "dance-party"]);
let queueIds = [...playlists[1].trackIds, ...playlists[2].trackIds];
let activeQueueIds = [...queueIds];
let currentTrackIndex = 0;
let shuffleOn = false;
let repeatMode = "off";
let activePlaylistId = "made";
let generatedTrackUrls = new Map();

const audioPlayer = $("#audio-player");
const nowPlayingImage = $(".now-playing img");
const nowPlayingTitle = $(".track-meta strong");
const nowPlayingArtist = $(".track-meta span");
const progressSlider = $("#progress-slider");
const volumeSlider = $("#volume-slider");
const elapsedTime = $("#elapsed-time");
const durationTime = $("#duration-time");
const fullProgress = $("#full-progress");

function readJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function trackById(id) {
  return tracks.find((track) => track.id === id) || tracks[0];
}

function playlistById(id) {
  return [...playlists, ...customPlaylists].find((playlist) => playlist.id === id) || playlists[0];
}

function setRangeFill(slider) {
  const min = Number(slider.min);
  const max = Number(slider.max);
  const value = Number(slider.value);
  const percent = ((value - min) / (max - min)) * 100;
  slider.style.setProperty("--fill", `${percent}%`);
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainder = String(Math.floor(seconds % 60)).padStart(2, "0");
  return `${minutes}:${remainder}`;
}

function writeString(view, offset, value) {
  for (let index = 0; index < value.length; index += 1) {
    view.setUint8(offset + index, value.charCodeAt(index));
  }
}

function noteToFrequency(rootFrequency, semitones) {
  return rootFrequency * 2 ** (semitones / 12);
}

function arrayBufferToDataUrl(buffer) {
  const bytes = new Uint8Array(buffer);
  const chunkSize = 8192;
  let binary = "";
  for (let index = 0; index < bytes.length; index += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
  }
  return `data:audio/wav;base64,${btoa(binary)}`;
}

function getTrackUrl(track, index) {
  if (generatedTrackUrls.has(track.id)) return generatedTrackUrls.get(track.id);

  const sampleRate = 22050;
  const duration = 24;
  const samples = sampleRate * duration;
  const bytesPerSample = 2;
  const buffer = new ArrayBuffer(44 + samples * bytesPerSample);
  const view = new DataView(buffer);
  const root = 196 + index * 8;
  const noteLength = 0.48;

  writeString(view, 0, "RIFF");
  view.setUint32(4, 36 + samples * bytesPerSample, true);
  writeString(view, 8, "WAVE");
  writeString(view, 12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * bytesPerSample, true);
  view.setUint16(32, bytesPerSample, true);
  view.setUint16(34, 16, true);
  writeString(view, 36, "data");
  view.setUint32(40, samples * bytesPerSample, true);

  for (let sample = 0; sample < samples; sample += 1) {
    const time = sample / sampleRate;
    const beat = Math.floor(time / noteLength);
    const note = track.notes[beat % track.notes.length];
    const bassNote = track.notes[Math.floor(beat / 2) % track.notes.length] - 12;
    const frequency = noteToFrequency(root, note);
    const bassFrequency = noteToFrequency(root, bassNote);
    const envelope = Math.max(0, 1 - (time % noteLength) / noteLength);
    const lead = Math.sin(2 * Math.PI * frequency * time) * 0.45;
    const harmony = Math.sin(2 * Math.PI * frequency * 1.5 * time) * 0.16;
    const bass = Math.sin(2 * Math.PI * bassFrequency * time) * 0.28;
    const kick = beat % 2 === 0 && time % noteLength < 0.09 ? Math.sin(2 * Math.PI * 64 * time) * 0.7 : 0;
    const value = (lead + harmony + bass + kick) * (0.35 + envelope * 0.65);
    view.setInt16(44 + sample * bytesPerSample, Math.max(-1, Math.min(1, value)) * 32767, true);
  }

  const url = arrayBufferToDataUrl(buffer);
  generatedTrackUrls.set(track.id, url);
  return url;
}

function iconButton(icon, label, className = "icon-button") {
  return `<button class="${className}" type="button" aria-label="${label}"><i class="${icon}"></i></button>`;
}

function renderRecentCards() {
  const ids = recentTrackIds.length ? recentTrackIds : tracks.slice(0, 6).map((track) => track.id);
  $("#recent-grid").innerHTML = ids.slice(0, 6).map((id) => {
    const track = trackById(id);
    return `
      <article class="recent-card" data-track-id="${track.id}">
        <img src="${track.cover}" alt="${track.title} cover" />
        <h2>${track.title}</h2>
        <button class="play-fab" type="button" aria-label="Play ${track.title}" data-play-track="${track.id}"><i class="fa-solid fa-play"></i></button>
      </article>
    `;
  }).join("");
}

function renderPlaylistCard(playlist) {
  return `
    <article class="playlist-card" data-open-playlist="${playlist.id}">
      <div class="cover-wrap">
        <img src="${playlist.cover}" alt="${playlist.name} cover" />
        <button class="play-fab" type="button" aria-label="Play ${playlist.name}" data-play-playlist="${playlist.id}"><i class="fa-solid fa-play"></i></button>
      </div>
      <h3>${playlist.name}</h3>
      <p>${playlist.description}</p>
    </article>
  `;
}

function renderHome() {
  renderRecentCards();
  const groups = [
    { title: "Popular playlists", items: playlists.slice(0, 3) },
    { title: "Made For You", items: [playlists[1], playlists[3], playlists[4], playlists[0]] },
    { title: "Charts", items: [playlists[2], playlists[0], playlists[1], playlists[3]] },
  ];
  $("#home-sections").innerHTML = groups.map((group) => `
    <section class="content-section">
      <div class="section-heading">
        <h2>${group.title}</h2>
        <button class="section-link" type="button" data-view="library">Show all</button>
      </div>
      <div class="card-row">${group.items.map(renderPlaylistCard).join("")}</div>
    </section>
  `).join("");
}

function renderTrackRow(track, index, options = {}) {
  const liked = likedTrackIds.includes(track.id);
  return `
    <div class="track-row ${track.id === currentTrack().id ? "playing" : ""}" data-track-id="${track.id}">
      <button class="row-index" type="button" data-play-track="${track.id}" aria-label="Play ${track.title}">
        <span>${index + 1}</span>
        <i class="fa-solid fa-play"></i>
      </button>
      <img src="${track.cover}" alt="${track.title} cover" />
      <div>
        <strong>${track.title}</strong>
        <span>${track.artist}</span>
      </div>
      <span class="album-name">${track.album}</span>
      <button class="row-heart ${liked ? "active" : ""}" type="button" data-like-track="${track.id}" aria-label="Like ${track.title}">
        <i class="${liked ? "fa-solid" : "fa-regular"} fa-heart"></i>
      </button>
      <span>${options.duration || "0:24"}</span>
    </div>
  `;
}

function renderTrackList(container, ids) {
  container.innerHTML = ids.length
    ? ids.map((id, index) => renderTrackRow(trackById(id), index)).join("")
    : `<p class="empty-state">Nothing here yet.</p>`;
}

function renderLibrary() {
  renderTrackList($("#library-recent"), recentTrackIds);
  renderTrackList($("#library-liked"), likedTrackIds);
}

function renderLiked() {
  $("#liked-count").textContent = `${likedTrackIds.length} song${likedTrackIds.length === 1 ? "" : "s"}`;
  renderTrackList($("#liked-list"), likedTrackIds);
}

function renderPlaylistLinks() {
  $("#playlist-links").innerHTML = [...playlists, ...customPlaylists].map((playlist) => `
    <li><button type="button" data-open-playlist="${playlist.id}">${playlist.name}</button></li>
  `).join("");
}

function renderPlaylistDetail(id) {
  activePlaylistId = id;
  const playlist = playlistById(id);
  $("#playlist-cover").src = playlist.cover;
  $("#playlist-cover").alt = `${playlist.name} cover`;
  $("#playlist-title").textContent = playlist.name;
  $("#playlist-description").textContent = `${playlist.description} • ${playlist.trackIds.length} songs`;
  renderTrackList($("#playlist-tracks"), playlist.trackIds);
  showView("playlist", false);
}

function renderQueue() {
  renderTrackList($("#queue-list"), activeQueueIds);
}

function renderLyrics() {
  const track = currentTrack();
  $("#lyrics-track-name").textContent = `${track.title} - ${track.artist}`;
  $("#lyrics-panel").innerHTML = track.lyrics.map((line, index) => `
    <p class="${audioPlayer.currentTime / 6 >= index ? "active" : ""}">${line}</p>
  `).join("");
}

function renderSearch() {
  const query = $("#search-input").value.trim().toLowerCase();
  const trackResults = tracks.filter((track) => [track.title, track.artist, track.album].some((value) => value.toLowerCase().includes(query)));
  const playlistResults = [...playlists, ...customPlaylists].filter((playlist) => [playlist.name, playlist.description].some((value) => value.toLowerCase().includes(query)));
  const hasQuery = query.length > 0;
  const tracksToRender = hasQuery ? trackResults : tracks.slice(0, 6);
  const playlistsToRender = hasQuery ? playlistResults : playlists.slice(0, 3);
  const count = tracksToRender.length + playlistsToRender.length;

  $("#search-count").textContent = `${count} result${count === 1 ? "" : "s"}`;
  $("#search-results").innerHTML = `
    <div class="result-group">
      <h2>Songs</h2>
      <div class="track-list">${tracksToRender.map((track, index) => renderTrackRow(track, index)).join("") || `<p class="empty-state">No songs found.</p>`}</div>
    </div>
    <div class="result-group">
      <h2>Playlists</h2>
      <div class="card-row">${playlistsToRender.map(renderPlaylistCard).join("") || `<p class="empty-state">No playlists found.</p>`}</div>
    </div>
  `;
}

function renderAll() {
  renderHome();
  renderPlaylistLinks();
  renderLibrary();
  renderLiked();
  renderQueue();
  renderLyrics();
  renderSearch();
  updateLikedButtons();
}

function showView(view, updateNav = true) {
  $$(".view").forEach((section) => section.classList.toggle("active-view", section.id === `${view}-view`));
  if (updateNav) {
    $$(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.view === view));
  }
  if (view === "search") $("#search-input").focus();
  if (view === "library") renderLibrary();
  if (view === "liked") renderLiked();
  if (view === "lyrics") renderLyrics();
}

function currentTrack() {
  return trackById(activeQueueIds[currentTrackIndex] || tracks[0].id);
}

function currentTrackGlobalIndex() {
  return tracks.findIndex((track) => track.id === currentTrack().id);
}

function addToRecent(trackId) {
  recentTrackIds = [trackId, ...recentTrackIds.filter((id) => id !== trackId)].slice(0, 12);
  writeJson(storageKeys.recent, recentTrackIds);
  renderRecentCards();
  renderLibrary();
}

function updateNowPlaying(track) {
  nowPlayingImage.src = track.cover;
  nowPlayingImage.alt = `Album cover for ${track.title}`;
  nowPlayingTitle.textContent = track.title;
  nowPlayingArtist.textContent = track.artist;
  $("#full-cover").src = track.cover;
  $("#full-cover").alt = `Album cover for ${track.title}`;
  $("#full-title").textContent = track.title;
  $("#full-artist").textContent = track.artist;
  document.body.classList.toggle("is-playing", !audioPlayer.paused);
  updateLikedButtons();
  renderLyrics();
}

function updateProgressUI() {
  const duration = audioPlayer.duration || 0;
  const currentTime = audioPlayer.currentTime || 0;
  const percent = duration ? (currentTime / duration) * 100 : 0;
  [progressSlider, fullProgress].forEach((slider) => {
    slider.value = String(percent);
    setRangeFill(slider);
  });
  elapsedTime.textContent = formatTime(currentTime);
  durationTime.textContent = formatTime(duration);
  $("#full-elapsed").textContent = formatTime(currentTime);
  $("#full-duration").textContent = formatTime(duration);
  renderLyrics();
}

function setPlayIcons(isPlaying) {
  $$(".play-toggle").forEach((button) => {
    button.setAttribute("aria-label", isPlaying ? "Pause" : "Play");
    button.innerHTML = isPlaying ? '<i class="fa-solid fa-pause"></i>' : '<i class="fa-solid fa-play"></i>';
  });
  document.body.classList.toggle("is-playing", isPlaying);
}

function loadTrackByIndex(index, shouldPlay = false) {
  currentTrackIndex = (index + activeQueueIds.length) % activeQueueIds.length;
  const track = currentTrack();
  audioPlayer.src = getTrackUrl(track, currentTrackGlobalIndex());
  audioPlayer.load();
  updateNowPlaying(track);
  addToRecent(track.id);
  renderQueue();
  renderSearch();
  renderLibrary();
  renderLiked();
  updateProgressUI();
  if (shouldPlay) audioPlayer.play().then(() => setPlayIcons(true)).catch(() => setPlayIcons(false));
}

function playTrack(trackId, shouldPlay = true) {
  if (!activeQueueIds.includes(trackId)) activeQueueIds = [trackId, ...tracks.map((track) => track.id).filter((id) => id !== trackId)];
  loadTrackByIndex(activeQueueIds.indexOf(trackId), shouldPlay);
}

function playPlaylist(playlistId) {
  const playlist = playlistById(playlistId);
  activeQueueIds = playlist.trackIds.length ? [...playlist.trackIds] : tracks.map((track) => track.id);
  loadTrackByIndex(0, true);
}

function playLiked() {
  activeQueueIds = likedTrackIds.length ? [...likedTrackIds] : tracks.map((track) => track.id);
  loadTrackByIndex(0, true);
}

function playNext() {
  if (repeatMode === "one") {
    audioPlayer.currentTime = 0;
    audioPlayer.play();
    return;
  }
  const nextIndex = shuffleOn ? Math.floor(Math.random() * activeQueueIds.length) : currentTrackIndex + 1;
  if (nextIndex >= activeQueueIds.length && repeatMode === "off") {
    audioPlayer.pause();
    setPlayIcons(false);
    return;
  }
  loadTrackByIndex(nextIndex, true);
}

function toggleLike(trackId) {
  likedTrackIds = likedTrackIds.includes(trackId)
    ? likedTrackIds.filter((id) => id !== trackId)
    : [trackId, ...likedTrackIds];
  writeJson(storageKeys.liked, likedTrackIds);
  updateLikedButtons();
  renderLiked();
  renderLibrary();
  renderSearch();
}

function updateLikedButtons() {
  const currentLiked = likedTrackIds.includes(currentTrack().id);
  $(".heart-button").classList.toggle("active", currentLiked);
  $(".heart-button").innerHTML = `<i class="${currentLiked ? "fa-solid" : "fa-regular"} fa-heart"></i>`;
  $$("[data-like-track]").forEach((button) => {
    const liked = likedTrackIds.includes(button.dataset.likeTrack);
    button.classList.toggle("active", liked);
    button.innerHTML = `<i class="${liked ? "fa-solid" : "fa-regular"} fa-heart"></i>`;
  });
}

function setTheme(theme) {
  document.body.classList.toggle("light-theme", theme === "light");
  $("#theme-toggle").innerHTML = theme === "light" ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
  writeJson(storageKeys.theme, theme);
}

function loadProfile() {
  const profile = readJson(storageKeys.profile, { name: "Premium" });
  $("#profile-name").textContent = profile.name;
  $("#login-name").value = profile.name;
}

function createPlaylist() {
  const name = prompt("Playlist name");
  if (!name) return;
  const id = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || `playlist-${Date.now()}`;
  const playlist = {
    id: `custom-${id}-${Date.now()}`,
    name,
    description: "Your custom playlist",
    cover: tracks[Math.floor(Math.random() * tracks.length)].cover,
    trackIds: recentTrackIds.slice(0, 4),
  };
  customPlaylists = [playlist, ...customPlaylists];
  writeJson(storageKeys.custom, customPlaylists);
  renderAll();
  renderPlaylistDetail(playlist.id);
}

function wireEvents() {
  document.addEventListener("click", (event) => {
    const viewButton = event.target.closest("[data-view]");
    const playTrackButton = event.target.closest("[data-play-track]");
    const playPlaylistButton = event.target.closest("[data-play-playlist]");
    const openPlaylistButton = event.target.closest("[data-open-playlist]");
    const likeButton = event.target.closest("[data-like-track]");

    if (viewButton) showView(viewButton.dataset.view);
    if (playTrackButton) {
      event.stopPropagation();
      playTrack(playTrackButton.dataset.playTrack);
    }
    if (playPlaylistButton) {
      event.stopPropagation();
      playPlaylist(playPlaylistButton.dataset.playPlaylist);
    }
    if (openPlaylistButton) renderPlaylistDetail(openPlaylistButton.dataset.openPlaylist);
    if (likeButton) {
      event.stopPropagation();
      toggleLike(likeButton.dataset.likeTrack);
    }
  });

  $("#search-input").addEventListener("input", () => {
    showView("search");
    renderSearch();
  });

  $$(".play-toggle").forEach((button) => button.addEventListener("click", () => {
    if (audioPlayer.paused) audioPlayer.play().then(() => setPlayIcons(true)).catch(() => setPlayIcons(false));
    else audioPlayer.pause();
  }));

  $$(".previous-track").forEach((button) => button.addEventListener("click", () => loadTrackByIndex(currentTrackIndex - 1, true)));
  $$(".next-track").forEach((button) => button.addEventListener("click", playNext));
  $$(".shuffle-toggle").forEach((button) => button.addEventListener("click", () => {
    shuffleOn = !shuffleOn;
    $$(".shuffle-toggle").forEach((item) => item.classList.toggle("active", shuffleOn));
  }));
  $$(".repeat-toggle").forEach((button) => button.addEventListener("click", () => {
    repeatMode = repeatMode === "off" ? "all" : repeatMode === "all" ? "one" : "off";
    $$(".repeat-toggle").forEach((item) => {
      item.classList.toggle("active", repeatMode !== "off");
      item.setAttribute("aria-label", repeatMode === "one" ? "Repeat one" : repeatMode === "all" ? "Repeat all" : "Repeat off");
      item.innerHTML = repeatMode === "one" ? '<i class="fa-solid fa-repeat"></i><span>1</span>' : '<i class="fa-solid fa-repeat"></i>';
    });
  }));

  [progressSlider, fullProgress].forEach((slider) => slider.addEventListener("input", (event) => {
    const duration = audioPlayer.duration || 0;
    const percent = Number(event.target.value);
    if (duration) audioPlayer.currentTime = (percent / 100) * duration;
    setRangeFill(slider);
  }));

  volumeSlider.addEventListener("input", () => {
    audioPlayer.volume = Number(volumeSlider.value) / 100;
    setRangeFill(volumeSlider);
  });

  $(".heart-button").addEventListener("click", () => toggleLike(currentTrack().id));
  $("#playlist-play").addEventListener("click", () => playPlaylist(activePlaylistId));
  $("#play-liked").addEventListener("click", playLiked);
  $("#playlist-like").addEventListener("click", () => {
    likedTrackIds = [...new Set([...playlistById(activePlaylistId).trackIds, ...likedTrackIds])];
    writeJson(storageKeys.liked, likedTrackIds);
    updateLikedButtons();
    renderLiked();
    renderLibrary();
    renderSearch();
  });
  $("#queue-open").addEventListener("click", () => $("#queue-panel").classList.add("open"));
  $("#queue-close").addEventListener("click", () => $("#queue-panel").classList.remove("open"));
  $("#expand-player").addEventListener("click", () => $("#full-player").hidden = false);
  $("#full-close").addEventListener("click", () => $("#full-player").hidden = true);
  $("#theme-toggle").addEventListener("click", () => setTheme(document.body.classList.contains("light-theme") ? "dark" : "light"));
  $("#profile-button").addEventListener("click", () => {
    const menu = $("#profile-menu");
    menu.hidden = !menu.hidden;
    $("#profile-button").setAttribute("aria-expanded", String(!menu.hidden));
  });
  $("#login-open").addEventListener("click", () => $("#login-modal").showModal());
  $("#login-save").addEventListener("click", () => {
    writeJson(storageKeys.profile, { name: $("#login-name").value || "Premium" });
    loadProfile();
  });
  $("#clear-storage").addEventListener("click", () => {
    Object.values(storageKeys).forEach((key) => localStorage.removeItem(key));
    location.reload();
  });
  $("#create-playlist-button").addEventListener("click", createPlaylist);
  $("#mock-api-search").addEventListener("click", () => {
    $("#mock-api-results").innerHTML = `
      <div class="track-list">${tracks.slice(0, 5).map((track, index) => renderTrackRow(track, index)).join("")}</div>
    `;
  });
}

audioPlayer.addEventListener("play", () => setPlayIcons(true));
audioPlayer.addEventListener("pause", () => setPlayIcons(false));
audioPlayer.addEventListener("timeupdate", updateProgressUI);
audioPlayer.addEventListener("loadedmetadata", updateProgressUI);
audioPlayer.addEventListener("ended", playNext);

setTheme(readJson(storageKeys.theme, "dark"));
loadProfile();
audioPlayer.volume = Number(volumeSlider.value) / 100;
tracks.forEach((track, index) => getTrackUrl(track, index));
activeQueueIds = [...playlistById("made").trackIds];
wireEvents();
renderAll();
loadTrackByIndex(0, false);
[progressSlider, fullProgress, volumeSlider].forEach(setRangeFill);
