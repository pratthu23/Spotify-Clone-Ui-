const navItems = document.querySelectorAll(".nav-item");
const progressSlider = document.querySelector("#progress-slider");
const volumeSlider = document.querySelector("#volume-slider");
const elapsedTime = document.querySelector("#elapsed-time");
const playToggle = document.querySelector(".play-toggle");
const heartButton = document.querySelector(".heart-button");

let progressValue = Number(progressSlider.value);
let isPlaying = true;

function setRangeFill(slider) {
  const min = Number(slider.min);
  const max = Number(slider.max);
  const value = Number(slider.value);
  const percent = ((value - min) / (max - min)) * 100;
  slider.style.setProperty("--fill", `${percent}%`);
}

function formatTimeFromPercent(percent) {
  const duration = 222;
  const seconds = Math.round((percent / 100) * duration);
  const minutes = Math.floor(seconds / 60);
  const remainder = String(seconds % 60).padStart(2, "0");
  return `${minutes}:${remainder}`;
}

function updateProgress(value) {
  progressValue = Math.max(0, Math.min(100, value));
  progressSlider.value = progressValue;
  elapsedTime.textContent = formatTimeFromPercent(progressValue);
  setRangeFill(progressSlider);
}

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navItems.forEach((navItem) => navItem.classList.remove("active"));
    item.classList.add("active");
  });
});

progressSlider.addEventListener("input", (event) => {
  updateProgress(Number(event.target.value));
});

volumeSlider.addEventListener("input", () => {
  setRangeFill(volumeSlider);
});

playToggle.addEventListener("click", () => {
  isPlaying = !isPlaying;
  playToggle.setAttribute("aria-label", isPlaying ? "Pause" : "Play");
  playToggle.innerHTML = isPlaying
    ? '<i class="fa-solid fa-pause"></i>'
    : '<i class="fa-solid fa-play"></i>';
});

heartButton.addEventListener("click", () => {
  heartButton.classList.toggle("active");
  heartButton.innerHTML = heartButton.classList.contains("active")
    ? '<i class="fa-solid fa-heart"></i>'
    : '<i class="fa-regular fa-heart"></i>';
});

// UI-only playback loop that keeps the progress bar moving while "playing".
setInterval(() => {
  if (!isPlaying) {
    return;
  }

  updateProgress(progressValue >= 100 ? 0 : progressValue + 0.45);
}, 1000);

[progressSlider, volumeSlider].forEach(setRangeFill);
