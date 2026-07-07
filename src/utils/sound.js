let audio = null;

export function initSound() {
  if (!audio) {
    audio = new Audio("/sounds/typing.mp3");
    audio.volume = 0.18;
  }
}

export function playTick() {
  if (!audio) return;

  audio.currentTime = 0;
  audio.play().catch(() => {});
}

export function stopSound() {
  if (!audio) return;

  audio.pause();
  audio.currentTime = 0;
}