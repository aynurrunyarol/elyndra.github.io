
const audio = document.getElementById("bg-music");

const player = document.getElementById("music-player");
const playPauseBtn = document.getElementById("play-pause");
const volumeControl = document.getElementById("volume-control");

const minimizeBtn = document.getElementById("minimize-player");
const expandBtn = document.getElementById("expand-player");


// =================================
// CONFIGURACIÓN INICIAL
// =================================

audio.loop = true;

// Recuperar volumen guardado

const savedVolume = localStorage.getItem("audio-volume");

audio.volume = savedVolume !== null
    ? parseFloat(savedVolume)
    : 0.2;

volumeControl.value = audio.volume;


// Recuperar posición de la canción

const savedTime = localStorage.getItem("audio-time");

if (savedTime) {
    audio.addEventListener("loadedmetadata", () => {
        if (Number.isFinite(audio.duration)) {
            audio.currentTime = Math.min(
                parseFloat(savedTime),
                audio.duration
            );
        }
    }, { once: true });
}


// Recuperar estado del reproductor

const savedMinimized = localStorage.getItem("player-minimized");

if (savedMinimized === "true") {
    player.classList.add("hidden");
    expandBtn.classList.add("visible");
}


// =================================
// REPRODUCIR / PAUSAR
// =================================

playPauseBtn.addEventListener("click", () => {

    if (audio.paused) {
        audio.play().catch(err => {
            console.log("No se pudo reproducir el audio:", err);
        });
    } else {
        audio.pause();
    }

});


// Actualizar icono según el estado del audio

audio.addEventListener("play", () => {

    playPauseBtn.textContent = "❚❚";
    playPauseBtn.setAttribute("aria-label", "Pausar música");

});

audio.addEventListener("pause", () => {

    playPauseBtn.textContent = "▶";
    playPauseBtn.setAttribute("aria-label", "Reproducir música");

});


// =================================
// CONTROL DE VOLUMEN
// =================================

volumeControl.addEventListener("input", () => {

    audio.volume = volumeControl.value;

    localStorage.setItem("audio-volume", audio.volume);

});


// =================================
// MINIMIZAR REPRODUCTOR
// =================================

minimizeBtn.addEventListener("click", () => {

    player.classList.add("hidden");
    expandBtn.classList.add("visible");

    localStorage.setItem("player-minimized", "true");

});


// =================================
// EXPANDIR REPRODUCTOR
// =================================

expandBtn.addEventListener("click", () => {

    player.classList.remove("hidden");
    expandBtn.classList.remove("visible");

    localStorage.setItem("player-minimized", "false");

});


// =================================
// GUARDAR POSICIÓN DE LA CANCIÓN
// =================================

setInterval(() => {

    if (!audio.paused) {
        localStorage.setItem("audio-time", audio.currentTime);
    }

}, 1000);


// Guardar al salir de la página

window.addEventListener("beforeunload", () => {

    localStorage.setItem("audio-time", audio.currentTime);
    localStorage.setItem("audio-volume", audio.volume);

});


// =================================
// REPRODUCCIÓN AUTOMÁTICA
// =================================

function startMusic() {
    if (audio.paused) {
        audio.play().catch(() => {
            console.log("Esperando interacción del usuario para reproducir música.");
        });
    }

    // Eliminar los eventos una vez iniciada la reproducción
    if (!audio.paused) {
        document.removeEventListener("click", startMusic);
        document.removeEventListener("keydown", startMusic);
        document.removeEventListener("touchstart", startMusic);
    }
}


// Intentar reproducir al cargar la página
startMusic();


// Si el navegador bloquea la reproducción,
// iniciarla con la primera interacción del usuario
document.addEventListener("click", startMusic);
document.addEventListener("keydown", startMusic);
document.addEventListener("touchstart", startMusic);
