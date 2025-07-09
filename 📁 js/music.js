// music.js - Sistema completo de música y audio para celebración
class MusicManager {
    constructor() {
        this.audioContext = null;
        this.isPlaying = false;
        this.currentMelody = null;
        this.volume = 0.3;
        this.previousVolume = 0.3;
        this.backgroundMusic = null;
        this.soundEffects = {};
        this.init();
    }
    
    init() {
        this.initializeAudioContext();
        this.setupSoundEffects();
        this.createMusicControls();
        console.log('🎵 Sistema de música inicializado');
    }
    
    // Inicializar contexto de audio
    initializeAudioContext() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Desbloquear audio en iOS/Safari
            if (this.audioContext.state === 'suspended') {
                const unlockAudio = () => {
                    this.audioContext.resume().then(() => {
                        console.log('🎵 Audio desbloqueado');
                    });
                    document.removeEventListener('touchstart', unlockAudio);
                    document.removeEventListener('click', unlockAudio);
                };
                
                document.addEventListener('touchstart', unlockAudio, { once: true });
                document.addEventListener('click', unlockAudio, { once: true });
            }
        } catch (error) {
            console.warn('⚠️ Audio no soportado en este navegador:', error);
            this.audioContext = null;
        }
    }
    
    // Configurar efectos de sonido
    setupSoundEffects() {
        this.soundEffects = {
            click: { frequency: 800, duration: 100, type: 'sine' },
            success: { frequency: 1200, duration: 200, type: 'sine' },
            celebration: { frequency: 600, duration: 300, type: 'triangle' },
            heart: { frequency: 1000, duration: 150, type: 'sine' },
            magic: { frequency: 1500, duration: 100, type: 'sawtooth' },
            bell: { frequency: 1047, duration: 500, type: 'sine' },
            chime: { frequency: 1319, duration: 300, type: 'sine' },
            sparkle: { frequency: 2000, duration: 80, type: 'sine' }
        };
    }
    
    // Crear controles de música
    createMusicControls() {
        const controls = document.createElement('div');
        controls.id = 'music-controls';
        controls.innerHTML = `
            <div class="music-panel">
                <button id="play-pause-btn" class="control-btn" title="Reproducir/Pausar">🎵</button>
                <button id="volume-btn" class="control-btn" title="Silenciar/Activar">🔊</button>
                <input type="range" id="volume-slider" min="0" max="1" step="0.1" value="0.3" title="Volumen">
                <button id="melody-btn" class="control-btn" title="Melodía aleatoria">🎶</button>
            </div>
        `;
        
        controls.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
            background: rgba(255, 255, 255, 0.95);
            padding: 15px 20px;
            border-radius: 50px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            gap: 12px;
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(controls);
        this.setupControlEvents();
        this.addControlStyles();
    }
    
    // Agregar estilos para controles
    addControlStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .music-panel {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            
            .control-btn {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 8px;
                border-radius: 50%;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .control-btn:hover {
                background: rgba(255, 107, 107, 0.1);
                transform: scale(1.1);
            }
            
            .control-btn:active {
                transform: scale(0.95);
            }
            
            #volume-slider {
                width: 80px;
                height: 4px;
                background: #ddd;
                border-radius: 2px;
                outline: none;
                cursor: pointer;
            }
            
            #volume-slider::-webkit-slider-thumb {
                appearance: none;
                width: 16px;
                height: 16px;
                background: #ff6b6b;
                border-radius: 50%;
                cursor: pointer;
            }
            
            #volume-slider::-moz-range-thumb {
                width: 16px;
                height: 16px;
                background: #ff6b6b;
                border-radius: 50%;
                cursor: pointer;
                border: none;
            }
            
            @media (max-width: 768px) {
                #music-controls {
                    bottom: 10px;
                    right: 10px;
                    padding: 10px 15px;
                }
                
                .control-btn {
                    font-size: 1.2rem;
                    padding: 6px;
                }
                
                #volume-slider {
                    width: 60px;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Configurar eventos de controles
    setupControlEvents() {
        const playPauseBtn = document.getElementById('play-pause-btn');
        const volumeBtn = document.getElementById('volume-btn');
        const volumeSlider = document.getElementById('volume-slider');
        const melodyBtn = document.getElementById('melody-btn');
        
        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', () => {
                this.toggleBackgroundMusic();
            });
        }
        
        if (volumeBtn) {
            volumeBtn.addEventListener('click', () => {
                this.toggleMute();
            });
        }
        
        if (volumeSlider) {
            volumeSlider.addEventListener('input', (e) => {
                this.setVolume(parseFloat(e.target.value));
            });
        }
        
        if (melodyBtn) {
            melodyBtn.addEventListener('click', () => {
                this.playRandomMelody();
            });
        }
    }
    
    // Reproducir música de cumpleaños
    playBirthdayMusic() {
        if (!this.audioContext) {
            console.warn('⚠️ Audio no disponible');
            return;
        }
        
        try {
            this.playHappyBirthdayTune();
            setTimeout(() => {
                this.startBackgroundMusic();
            }, 500);
        } catch (error) {
            console.error('Error reproduciendo música:', error);
        }
    }
    
    // Reproducir "Las Mañanitas" / "Happy Birthday"
    playHappyBirthdayTune() {
        // Melodía de "Happy Birthday"
        const melody = [
            { note: 'C4', duration: 0.5 },
            { note: 'C4', duration: 0.5 },
            { note: 'D4', duration: 0.5 },
            { note: 'C4', duration: 0.5 },
            { note: 'F4', duration: 0.5 },
            { note: 'E4', duration: 1.0 },
            { note: 'C4', duration: 0.5 },
            { note: 'C4', duration: 0.5 },
            { note: 'D4', duration: 0.5 },
            { note: 'C4', duration: 0.5 },
            { note: 'G4', duration: 0.5 },
            { note: 'F4', duration: 1.0 },
            { note: 'C4', duration: 0.5 },
            { note: 'C4', duration: 0.5 },
            { note: 'C5', duration: 0.5 },
            { note: 'A4', duration: 0.5 },
            { note: 'F4', duration: 0.5 },
            { note: 'E4', duration: 0.5 },
            { note: 'D4', duration: 1.0 },
            { note: 'Bb4', duration: 0.5 },
            { note: 'Bb4', duration: 0.5 },
            { note: 'A4', duration: 0.5 },
            { note: 'F4', duration: 0.5 },
            { note: 'G4', duration: 0.5 },
            { note: 'F4', duration: 1.5 }
        ];
        
        this.playMelody(melody);
    }
    
    // Reproducir una melodía
    playMelody(melody) {
        if (!this.audioContext) return;
        
        try {
            let currentTime = this.audioContext.currentTime;
            
            melody.forEach((note) => {
                const frequency = this.noteToFrequency(note.note);
                this.playNote(frequency, note.duration, currentTime);
                currentTime += note.duration;
            });
        } catch (error) {
            console.error('Error reproduciendo melodía:', error);
        }
    }
    
    // Convertir nota a frecuencia
    noteToFrequency(note) {
        const noteMap = {
            'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'D#4': 311.13,
            'E4': 329.63, 'F4': 349.23, 'F#4': 369.99, 'G4': 392.00,
            'G#4': 415.30, 'A4': 440.00, 'A#4': 466.16, 'B4': 493.88,
            'C5': 523.25, 'C#5': 554.37, 'D5': 587.33, 'D#5': 622.25,
            'E5': 659.25, 'F5': 698.46, 'F#5': 739.99, 'G5': 783.99,
            'G#5': 830.61, 'A5': 880.00, 'A#5': 932.33, 'B5': 987.77,
            'Bb4': 466.16, 'Bb5': 932.33
        };
        
        return noteMap[note] || 440;
    }
    
    // Reproducir una nota individual
    playNote(frequency, duration, startTime = null) {
        if (!this.audioContext) return;
        
        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.value = frequency;
            oscillator.type = 'sine';
            
            const start = startTime || this.audioContext.currentTime;
            const end = start + duration;
            
            // Envelope para suavizar el sonido
            gainNode.gain.setValueAtTime(0, start);
            gainNode.gain.linearRampToValueAtTime(this.volume * 0.3, start + 0.1);
            gainNode.gain.exponentialRampToValueAtTime(0.01, end - 0.1);
            
            oscillator.start(start);
            oscillator.stop(end);
            
            // Limpiar referencias
            oscillator.onended = () => {
                try {
                    oscillator.disconnect();
                    gainNode.disconnect();
                } catch (e) {
                    // Ignorar errores de desconexión
                }
            };
        } catch (error) {
            console.error('Error reproduciendo nota:', error);
        }
    }
    
    // Reproducir efecto de sonido
    playSound(effectName) {
        if (!this.audioContext || !this.soundEffects[effectName]) return;
        
        try {
            const effect = this.soundEffects[effectName];
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.value = effect.frequency;
            oscillator.type = effect.type;
            
            const now = this.audioContext.currentTime;
            const duration = effect.duration / 1000;
            
            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(this.volume * 0.5, now + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration);
            
            oscillator.start(now);
            oscillator.stop(now + duration);
            
            // Limpiar referencias
            oscillator.onended = () => {
                try {
                    oscillator.disconnect();
                    gainNode.disconnect();
                } catch (e) {
                    // Ignorar errores de desconexión
                }
            };
        } catch (error) {
            console.error('Error reproduciendo efecto:', error);
        }
    }
    
    // Iniciar música de fondo
    startBackgroundMusic() {
        if (this.backgroundMusic || !this.audioContext) return;
        
        this.backgroundMusic = setInterval(() => {
            if (this.isPlaying) {
                this.playAmbientChord();
            }
        }, 4000);
        
        this.isPlaying = true;
        this.updatePlayButton();
    }
    
    // Reproducir acorde ambiental
    playAmbientChord() {
        if (!this.audioContext) return;
        
        try {
            const chords = [
                [261.63, 329.63, 392.00], // C Major
                [293.66, 369.99, 440.00], // D Minor  
                [329.63, 415.30, 493.88], // E Minor
                [349.23, 440.00, 523.25], // F Major
                [392.00, 493.88, 587.33], // G Major
                [440.00, 523.25, 659.25]  // A Minor
            ];
            
            const randomChord = chords[Math.floor(Math.random() * chords.length)];
            
            randomChord.forEach(frequency => {
                this.playAmbientNote(frequency, 3.0);
            });
        } catch (error) {
            console.error('Error reproduciendo acorde:', error);
        }
    }
    
    // Reproducir nota ambiental
    playAmbientNote(frequency, duration) {
        if (!this.audioContext) return;
        
        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.value = frequency;
            oscillator.type = 'sine';
            
            const now = this.audioContext.currentTime;
            
            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(this.volume * 0.1, now + 0.5);
            gainNode.gain.linearRampToValueAtTime(this.volume * 0.05, now + duration - 0.5);
            gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);
            
            oscillator.start(now);
            oscillator.stop(now + duration);
            
            // Limpiar referencias
            oscillator.onended = () => {
                try {
                    oscillator.disconnect();
                    gainNode.disconnect();
                } catch (e) {
                    // Ignorar errores de desconexión
                }
            };
        } catch (error) {
            console.error('Error reproduciendo nota ambiental:', error);
        }
    }
    
    // Reproducir melodía aleatoria
    playRandomMelody() {
        const melodies = [
            // Melodía festiva 1
            [
                { note: 'C5', duration: 0.3 },
                { note: 'D5', duration: 0.3 },
                { note: 'E5', duration: 0.3 },
                { note: 'F5', duration: 0.3 },
                { note: 'G5', duration: 0.6 },
                { note: 'F5', duration: 0.3 },
                { note: 'E5', duration: 0.3 },
                { note: 'D5', duration: 0.3 },
                { note: 'C5', duration: 0.6 }
            ],
            // Melodía festiva 2
            [
                { note: 'G4', duration: 0.4 },
                { note: 'A4', duration: 0.4 },
                { note: 'B4', duration: 0.4 },
                { note: 'C5', duration: 0.4 },
                { note: 'D5', duration: 0.8 },
                { note: 'C5', duration: 0.4 },
                { note: 'B4', duration: 0.4 },
                { note: 'A4', duration: 0.4 },
                { note: 'G4', duration: 0.8 }
            ],
            // Melodía festiva 3
            [
                { note: 'F4', duration: 0.5 },
                { note: 'G4', duration: 0.5 },
                { note: 'A4', duration: 0.5 },
                { note: 'Bb4', duration: 0.5 },
                { note: 'C5', duration: 1.0 },
                { note: 'Bb4', duration: 0.5 },
                { note: 'A4', duration: 0.5 },
                { note: 'G4', duration: 0.5 },
                { note: 'F4', duration: 1.0 }
            ]
        ];
        
        const randomMelody = melodies[Math.floor(Math.random() * melodies.length)];
        this.playMelody(randomMelody);
    }
    
    // Alternar música de fondo
    toggleBackgroundMusic() {
        if (this.isPlaying) {
            this.stopBackgroundMusic();
        } else {
            this.startBackgroundMusic();
        }
    }
    
    // Detener música de fondo
    stopBackgroundMusic() {
        if (this.backgroundMusic) {
            clearInterval(this.backgroundMusic);
            this.backgroundMusic = null;
        }
        this.isPlaying = false;
        this.updatePlayButton();
    }
    
    // Actualizar botón de reproducción
    updatePlayButton() {
        const playBtn = document.getElementById('play-pause-btn');
        if (playBtn) {
            playBtn.textContent = this.isPlaying ? '⏸️' : '🎵';
            playBtn.title = this.isPlaying ? 'Pausar música' : 'Reproducir música';
        }
    }
    
    // Establecer volumen
    setVolume(newVolume) {
        this.volume = Math.max(0, Math.min(1, newVolume));
        this.updateVolumeButton();
    }
    
    // Alternar silencio
    toggleMute() {
        if (this.volume > 0) {
            this.previousVolume = this.volume;
            this.volume = 0;
        } else {
            this.volume = this.previousVolume || 0.3;
        }
        
        const slider = document.getElementById('volume-slider');
        if (slider) {
            slider.value = this.volume;
        }
        
        this.updateVolumeButton();
    }
    
    // Actualizar botón de volumen
    updateVolumeButton() {
        const volumeBtn = document.getElementById('volume-btn');
        if (volumeBtn) {
            if (this.volume === 0) {
                volumeBtn.textContent = '🔇';
                volumeBtn.title = 'Activar sonido';
            } else if (this.volume < 0.5) {
                volumeBtn.textContent = '🔉';
                volumeBtn.title = 'Volumen bajo';
            } else {
                volumeBtn.textContent = '🔊';
                volumeBtn.title = 'Volumen alto';
            }
        }
    }
    
    // Reproducir secuencia de celebración
    playCelebrationSequence() {
        const sequence = [
            { sound: 'celebration', delay: 0 },
            { sound: 'magic', delay: 200 },
            { sound: 'heart', delay: 400 },
            { sound: 'success', delay: 600 },
            { sound: 'celebration', delay: 800 }
        ];
        
        sequence.forEach(item => {
            setTimeout(() => {
                this.playSound(item.sound);
            }, item.delay);
        });
    }
    
    // Reproducir sonido de corazón
    playHeartSound() {
        const frequencies = [800, 1000, 1200];
        frequencies.forEach((freq, index) => {
            setTimeout(() => {
                this.playNote(freq, 0.1);
            }, index * 50);
        });
    }
    
    // Reproducir sonido de confetti
    playConfettiSound() {
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const frequency = 1000 + Math.random() * 500;
                this.playNote(frequency, 0.05);
            }, i * 30);
        }
    }
    
    // Reproducir campanitas
    playBellSound() {
        const bellFrequencies = [1047, 1319, 1568, 1760];
        bellFrequencies.forEach((freq, index) => {
            setTimeout(() => {
                this.playNote(freq, 1.0);
            }, index * 100);
        });
    }
    
    // Crear visualizador de audio
    createAudioVisualizer() {
        const canvas = document.createElement('canvas');
        canvas.id = 'audio-visualizer';
        canvas.width = 200;
        canvas.height = 100;
        canvas.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 20px;
            z-index: 999;
            background: rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            backdrop-filter: blur(5px);
            border: 2px solid rgba(255, 255, 255, 0.3);
        `;
        
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        this.animateVisualizer(ctx, canvas);
    }
    
    // Animar visualizador
    animateVisualizer(ctx, canvas) {
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            if (this.isPlaying) {
                // Simular barras de espectro
                const barCount = 20;
                const barWidth = canvas.width / barCount;
                
                for (let i = 0; i < barCount; i++) {
                    const barHeight = Math.random() * canvas.height * 0.8;
                    const hue = (i * 18) % 360;
                    
                    ctx.fillStyle = `hsl(${hue}, 70%, 60%)`;
                    ctx.fillRect(i * barWidth, canvas.height - barHeight, barWidth - 2, barHeight);
                }
            }
            
            requestAnimationFrame(draw);
        };
        
        draw();
    }
    
    // Limpiar recursos
    cleanup() {
        this.stopBackgroundMusic();
        
        if (this.audioContext) {
            this.audioContext.close().catch(e => {
                console.warn('Error cerrando contexto de audio:', e);
            });
        }
        
        const controls = document.getElementById('music-controls');
        if (controls) {
            controls.remove();
        }
        
        const visualizer = document.getElementById('audio-visualizer');
        if (visualizer) {
            visualizer.remove();
        }
    }
}

// Instancia global del manager de música
const musicManager = new MusicManager();

// Funciones globales para compatibilidad
function initializeMusic() {
    console.log('🎵 Música lista para usar');
}

function playBirthdayMusic() {
    musicManager.playBirthdayMusic();
}

function playSound(soundName) {
    musicManager.playSound(soundName);
}

function playCelebrationSequence() {
    musicManager.playCelebrationSequence();
}

function playHeartSound() {
    musicManager.playHeartSound();
}

function playConfettiSound() {
    musicManager.playConfettiSound();
}

function playBellSound() {
    musicManager.playBellSound();
}

// Eventos automáticos
document.addEventListener('click', () => {
    if (musicManager.audioContext && musicManager.volume > 0) {
        musicManager.playSound('click');
    }
});

// Crear visualizador al cargar
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        musicManager.createAudioVisualizer();
    }, 2000);
});

// Exportar para uso global
window.MusicManager = MusicManager;
window.musicManager = musicManager;