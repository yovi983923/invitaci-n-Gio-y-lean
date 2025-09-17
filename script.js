// script.js (actualizado)
 // Carga la API del reproductor de YouTube
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;
let isPlaying = false;
const videoId = 'c34S6eJ5pLw'; // YouTube Video ID for "So Close" - Enchanted

// Esta función se llama automáticamente cuando la API está lista
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0',
        width: '0',
        videoId: videoId,
        playerVars: { 'controls': 0, 'loop': 1, 'playlist': videoId },
        events: { 'onReady': onPlayerReady }
    });
}

function onPlayerReady(event) {
    // El reproductor está listo
}

document.addEventListener('DOMContentLoaded', () => {

    //=========== CONTROL DE MÚSICA ===========
    const musicToggleButton = document.getElementById('music-toggle');
    const musicIcon = document.getElementById('music-icon');
    const audio = document.getElementById('bg-music');

    // Aseguramos icono inicial (play)
    if (musicIcon) {
        musicIcon.innerHTML = `<path d="M8 5v14l11-7z"/>`;
    }

    // Función para alternar reproducción
    function toggleMusic() {
        if (!audio) return;
        if (isPlaying) {
            audio.pause();
            if (musicIcon) musicIcon.innerHTML = `<path d="M8 5v14l11-7z"/>`; // play
            musicToggleButton.setAttribute('aria-pressed', 'false');
        } else {
            // Intentamos reproducir (puede ser bloqueado por el navegador hasta que el usuario interactúe)
            audio.play().catch(err => {
                // Si el navegador bloquea autoplay, solo mostramos advertencia en consola
                console.warn('Reproducción impedida por el navegador:', err);
            });
            if (musicIcon) musicIcon.innerHTML = `<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>`; // pause
            musicToggleButton.setAttribute('aria-pressed', 'true');
        }
        isPlaying = !isPlaying;
    }

    // Click y teclado (Enter / Space)
    if (musicToggleButton) {
        musicToggleButton.addEventListener('click', toggleMusic);
        musicToggleButton.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMusic();
            }
        });
    }

    //=========== CUENTA REGRESIVA ===========
    const targetDate = new Date('2025-11-07T00:00:00').getTime();
    const countdownFunction = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(countdownFunction);
            document.getElementById('timer').innerHTML = "<p class='date'>¡Llegó el gran día!</p>";
            return;
        }

        const format = (num) => String(num).padStart(2, '0');
        document.getElementById('days').innerText = format(Math.floor(distance / (1000 * 60 * 60 * 24)));
        document.getElementById('hours').innerText = format(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        document.getElementById('minutes').innerText = format(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
        document.getElementById('seconds').innerText = format(Math.floor((distance % (1000 * 60)) / 1000));
    }, 1000);

    //=========== ANIMACIÓN DE SCROLL ===========
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Para que la animación ocurra solo una vez
            }
        });
    }, { threshold: 0.1 }); // Se activa cuando el 10% del elemento es visible

    document.querySelectorAll('.hidden').forEach(el => observer.observe(el));
});

document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('toggle-bank-info');
    const bankInfo = document.getElementById('bank-info');

    toggleBtn.addEventListener('click', () => {
        bankInfo.classList.toggle('show');
        // Cambia el texto del botón según el estado
        toggleBtn.textContent = bankInfo.classList.contains('show') ? 'Ocultar datos bancarios' : 'Ver datos bancarios';
    });
});
