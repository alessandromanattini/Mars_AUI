// main.js
let mediaRecorder;
let audioChunks = [];
let audioBlob;
let audioUrl;
let audio;

const recordButton = document.getElementById('buttonRecord');
const stopButton = document.getElementById('buttonStop');
const playButton = document.getElementById('buttonPlay')

// Richiede l'accesso al microfono dell'utente e inizializza MediaRecorder
recordButton.addEventListener('click', async () => {
    try {
        // Richiede l'accesso al microfono
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);

        // Registra i dati audio
        mediaRecorder.start();
        recordButton.disabled = true;
        stopButton.disabled = false;
        playButton.disabled = true;

        audioChunks = [];

        // Aggiunge i dati audio all'array audioChunks
        mediaRecorder.addEventListener('dataavailable', event => {
            audioChunks.push(event.data);
        });

        // Ferma la registrazione dopo 5 secondi
        mediaRecorder.addEventListener('stop', () => {
            audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            audioUrl = URL.createObjectURL(audioBlob);
            audio = new Audio(audioUrl);
        });

    } catch (err) {
        console.error('Errore nell\'accesso al microfono:', err);
    }
});

// Interrompe la registrazione
stopButton.addEventListener('click', () => {
    mediaRecorder.stop();
    recordButton.disabled = false;
    stopButton.disabled = true;
    playButton.disabled = false;
});

// Riproduce l'audio registrato
playButton.addEventListener('click', () => {
    if (audio) {
        audio.play();
    }
});

