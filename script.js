const navItems = document.querySelectorAll(".nav-item");
const playButtons = document.querySelectorAll(".play-fab");
const progressSlider = document.querySelector("#progress-slider");
const volumeSlider = document.querySelector("#volume-slider");
const elapsedTime = document.querySelector("#elapsed-time");
const durationTime = document.querySelector("#duration-time");
const playToggle = document.querySelector(".play-toggle");
const previousTrack = document.querySelector(".previous-track");
const nextTrack = document.querySelector(".next-track");
const heartButton = document.querySelector(".heart-button");
const audioPlayer = document.querySelector("#audio-player");
const nowPlayingImage = document.querySelector(".now-playing img");
const nowPlayingTitle = document.querySelector(".track-meta strong");
const nowPlayingArtist = document.querySelector(".track-meta span");

const demoTracks = [
  {
    title: "Midnight City",
    artist: "Neon Skyline",
    cover: "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?auto=format&fit=crop&w=120&q=80",
    notes: [0, 3, 7, 10, 7, 3, 5, 8],
  },
  {
    title: "Daily Mix 1",
    artist: "Codex Sessions",
    cover: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=240&q=80",
    notes: [0, 2, 4, 7, 9, 7, 4, 2],
  },
  {
    title: "Discover Weekly",
    artist: "Codex Sessions",
    cover: "https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?auto=format&fit=crop&w=240&q=80",
    notes: [7, 5, 3, 0, 2, 3, 5, 10],
  },
  {
    title: "Release Radar",
    artist: "Codex Sessions",
    cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=240&q=80",
    notes: [0, 5, 7, 12, 10, 7, 5, 3],
  },
  {
    title: "Pop Rising",
    artist: "Codex Sessions",
    cover: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=240&q=80",
    notes: [4, 7, 9, 11, 12, 11, 9, 7],
  },
  {
    title: "Dance Party",
    artist: "Codex Sessions",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=240&q=80",
    notes: [0, 0, 7, 7, 10, 10, 7, 5],
  },
  {
    title: "Today's Top Hits",
    artist: "Codex Sessions",
    cover: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=420&q=80",
    notes: [2, 4, 7, 9, 7, 4, 2, 0],
  },
  {
    title: "RapCaviar",
    artist: "Codex Sessions",
    cover: "https://images.unsplash.com/photo-1499364615650-ec38552f4f34?auto=format&fit=crop&w=420&q=80",
    notes: [0, 3, 3, 5, 7, 10, 7, 5],
  },
  {
    title: "Viva Latino",
    artist: "Codex Sessions",
    cover: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=420&q=80",
    notes: [0, 4, 5, 7, 8, 7, 5, 4],
  },
  {
    title: "Acoustic Chill",
    artist: "Codex Sessions",
    cover: "https://images.unsplash.com/photo-1482442120256-9c03866de390?auto=format&fit=crop&w=420&q=80",
    notes: [0, 2, 3, 7, 5, 3, 2, -2],
  },
  {
    title: "On Repeat",
    artist: "Codex Sessions",
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=420&q=80",
    notes: [7, 9, 12, 14, 12, 9, 7, 4],
  },
  {
    title: "Fresh Finds",
    artist: "Codex Sessions",
    cover: "https://images.unsplash.com/photo-1446057032654-9d8885db76c6?auto=format&fit=crop&w=420&q=80",
    notes: [0, 7, 5, 3, 5, 7, 10, 12],
  },
];

let currentTrackIndex = 0;
const generatedTrackUrls = new Map();

function setRangeFill(slider) {
  const min = Number(slider.min);
  const max = Number(slider.max);
  const value = Number(slider.value);
  const percent = ((value - min) / (max - min)) * 100;
  slider.style.setProperty("--fill", `${percent}%`);
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainder = String(Math.floor(seconds % 60)).padStart(2, "0");
  return `${minutes}:${remainder}`;
}

function setPlayIcon(isPlaying) {
  playToggle.setAttribute("aria-label", isPlaying ? "Pause" : "Play");
  playToggle.innerHTML = isPlaying
    ? '<i class="fa-solid fa-pause"></i>'
    : '<i class="fa-solid fa-play"></i>';
}

function updateNowPlaying(track) {
  nowPlayingImage.src = track.cover;
  nowPlayingImage.alt = `Album cover for ${track.title}`;
  nowPlayingTitle.textContent = track.title;
  nowPlayingArtist.textContent = track.artist;
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
    const chunk = bytes.subarray(index, index + chunkSize);
    binary += String.fromCharCode(...chunk);
  }

  return `data:audio/wav;base64,${btoa(binary)}`;
}

function getTrackUrl(track, index) {
  if (generatedTrackUrls.has(track.title)) {
    return generatedTrackUrls.get(track.title);
  }

  const sampleRate = 22050;
  const duration = 24;
  const samples = sampleRate * duration;
  const bytesPerSample = 2;
  const buffer = new ArrayBuffer(44 + samples * bytesPerSample);
  const view = new DataView(buffer);
  const root = 196 + index * 9;
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
  generatedTrackUrls.set(track.title, url);
  return url;
}

function updateProgressUI() {
  const duration = audioPlayer.duration || 0;
  const currentTime = audioPlayer.currentTime || 0;
  const percent = duration ? (currentTime / duration) * 100 : 0;

  progressSlider.value = String(percent);
  elapsedTime.textContent = formatTime(currentTime);
  durationTime.textContent = formatTime(duration);
  setRangeFill(progressSlider);
}

function loadTrack(index, shouldPlay = false) {
  currentTrackIndex = (index + demoTracks.length) % demoTracks.length;
  const track = demoTracks[currentTrackIndex];

  audioPlayer.src = getTrackUrl(track, currentTrackIndex);
  audioPlayer.load();
  updateNowPlaying(track);
  updateProgressUI();

  if (shouldPlay) {
    audioPlayer.play().then(() => setPlayIcon(true)).catch(() => setPlayIcon(false));
  } else {
    setPlayIcon(false);
  }
}

function playTrackByTitle(title) {
  const normalizedTitle = title.replace(/^Play\s+/i, "").trim();
  const trackIndex = demoTracks.findIndex((track) => track.title === normalizedTitle);
  loadTrack(trackIndex === -1 ? 0 : trackIndex, true);
}

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navItems.forEach((navItem) => navItem.classList.remove("active"));
    item.classList.add("active");
  });
});

playButtons.forEach((button) => {
  button.addEventListener("click", () => {
    playTrackByTitle(button.getAttribute("aria-label") || "");
  });
});

progressSlider.addEventListener("input", (event) => {
  const duration = audioPlayer.duration || 0;
  const percent = Number(event.target.value);

  if (duration) {
    audioPlayer.currentTime = (percent / 100) * duration;
  }

  setRangeFill(progressSlider);
});

volumeSlider.addEventListener("input", () => {
  audioPlayer.volume = Number(volumeSlider.value) / 100;
  setRangeFill(volumeSlider);
});

playToggle.addEventListener("click", () => {
  if (audioPlayer.paused) {
    audioPlayer.play().then(() => setPlayIcon(true)).catch(() => setPlayIcon(false));
    return;
  }

  audioPlayer.pause();
});

previousTrack.addEventListener("click", () => {
  loadTrack(currentTrackIndex - 1, true);
});

nextTrack.addEventListener("click", () => {
  loadTrack(currentTrackIndex + 1, true);
});

heartButton.addEventListener("click", () => {
  heartButton.classList.toggle("active");
  heartButton.innerHTML = heartButton.classList.contains("active")
    ? '<i class="fa-solid fa-heart"></i>'
    : '<i class="fa-regular fa-heart"></i>';
});

audioPlayer.addEventListener("play", () => setPlayIcon(true));
audioPlayer.addEventListener("pause", () => setPlayIcon(false));
audioPlayer.addEventListener("timeupdate", updateProgressUI);
audioPlayer.addEventListener("loadedmetadata", updateProgressUI);
audioPlayer.addEventListener("ended", () => loadTrack(currentTrackIndex + 1, true));

audioPlayer.volume = Number(volumeSlider.value) / 100;
// Pre-generate the compact demo sources so user clicks can start playback immediately.
demoTracks.forEach((track, index) => getTrackUrl(track, index));
loadTrack(0);
[progressSlider, volumeSlider].forEach(setRangeFill);
