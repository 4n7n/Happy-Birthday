// main.js - Script principal para la celebración de cumpleaños
document.addEventListener('DOMContentLoaded', function() {
    const celebrateBtn = document.getElementById('celebrate-btn');
    const body = document.body;
    let celebrationActive = false;
    
    // Inicializar todos los componentes
    initializeApp();
    
    // Función principal de inicialización
    function initializeApp() {
        console.log('🎂 Iniciando aplicación de cumpleaños...');
        
        // Inicializar componentes
        initializeGallery();
        initializeParticles();
        initializeMusic();
        
        // Configurar eventos
        setupEventListeners();
        
        // Efectos iniciales
        createInitialEffects();
        
        console.log('✨ Aplicación lista para celebrar!');
    }
    
    // Configurar todos los event listeners
    function setupEventListeners() {
        // Evento del botón celebrar
        celebrateBtn.addEventListener('click', function() {
            if (!celebrationActive) {
                startCelebration();
            } else {
                resetCelebration();
            }
        });
        
        // Evento de redimensionamiento
        window.addEventListener('resize', function() {
            adjustLayoutForResize();
        });
        
        // Evento de scroll para efectos parallax
        window.addEventListener('scroll', function() {
            handleScrollEffects();
        });
        
        // Eventos de teclado para interactividad
        document.addEventListener('keydown', function(e) {
            handleKeyboardEvents(e);
        });
    }
    
    // Función principal de celebración
    function startCelebration() {
        console.log('🎉 ¡Iniciando celebración!');
        celebrationActive = true;
        
        // Cambiar texto del botón
        celebrateBtn.textContent = '🎊 ¡Celebrando! 🎊';
        celebrateBtn.style.background = 'linear-gradient(45deg, #4ecdc4, #45b7d1)';
        
        // Secuencia de celebración
        executeSequentialCelebration();
    }
    
    // Ejecutar celebración en secuencia
    function executeSequentialCelebration() {
        // Fase 1: Efectos inmediatos (0ms)
        setTimeout(() => {
            createConfetti();
            triggerSpecialAnimations();
        }, 0);
        
        // Fase 2: Música y partículas (500ms)
        setTimeout(() => {
            playBirthdayMusic();
            createFloatingHearts();
        }, 500);
        
        // Fase 3: Cambio de fondo (1000ms)
        setTimeout(() => {
            changeBackgroundTheme();
        }, 1000);
        
        // Fase 4: Mensaje especial (1500ms)
        setTimeout(() => {
            showSpecialMessage();
        }, 1500);
        
        // Fase 5: Efectos adicionales (2000ms)
        setTimeout(() => {
            createStarShower();
            pulsateElements();
        }, 2000);
    }
    
    // Función para mostrar mensaje especial
    function showSpecialMessage() {
        const message = document.createElement('div');
        message.className = 'special-message';
        message.innerHTML = `
            <div class="message-content">
                <h2>¡Te amo mucho mamá!</h2>
                <p>💕 Eres la mejor madre del mundo 💕</p>
                <div class="heart-animation">❤️</div>
            </div>
        `;
        
        // Estilos del mensaje
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,182,193,0.9));
            padding: 40px;
            border-radius: 20px;
            text-align: center;
            z-index: 10000;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            backdrop-filter: blur(10px);
            animation: messageAppear 0.8s ease-out;
        `;
        
        body.appendChild(message);
        
        // Remover mensaje después de 4 segundos
        setTimeout(() => {
            message.style.animation = 'messageDisappear 0.8s ease-in forwards';
            setTimeout(() => {
                message.remove();
            }, 800);
        }, 4000);
    }
    
    // Cambiar tema de fondo
    function changeBackgroundTheme() {
        const themes = [
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
        ];
        
        const randomTheme = themes[Math.floor(Math.random() * themes.length)];
        body.style.background = randomTheme;
        body.style.transition = 'background 2s ease';
    }
    
    // Crear efectos iniciales
    function createInitialEffects() {
        // Efecto de entrada para el título
        const title = document.querySelector('.main-title');
        if (title) {
            title.style.opacity = '0';
            title.style.transform = 'translateY(-50px)';
            title.style.transition = 'all 1s ease';
            
            setTimeout(() => {
                title.style.opacity = '1';
                title.style.transform = 'translateY(0)';
            }, 500);
        }
        
        // Efecto de entrada para la torta
        const cake = document.querySelector('.cake-animation');
        if (cake) {
            cake.style.opacity = '0';
            cake.style.transform = 'scale(0)';
            cake.style.transition = 'all 1s ease';
            
            setTimeout(() => {
                cake.style.opacity = '1';
                cake.style.transform = 'scale(1)';
            }, 1000);
        }
    }
    
    // Manejar efectos de scroll
    function handleScrollEffects() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax-element');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
    
    // Manejar eventos de teclado
    function handleKeyboardEvents(e) {
        switch(e.key) {
            case ' ': // Espacio
                e.preventDefault();
                if (!celebrationActive) {
                    startCelebration();
                }
                break;
            case 'r': // R para reset
                resetCelebration();
                break;
            case 'h': // H para corazones
                createFloatingHearts();
                break;
            case 'c': // C para confetti
                createConfetti();
                break;
        }
    }
    
    // Ajustar layout para redimensionamiento
    function adjustLayoutForResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        // Ajustar tamaño del título basado en el ancho
        const title = document.querySelector('.main-title');
        if (title) {
            if (width < 480) {
                title.style.fontSize = '2rem';
            } else if (width < 768) {
                title.style.fontSize = '2.5rem';
            } else {
                title.style.fontSize = '4rem';
            }
        }
        
        // Ajustar partículas
        const particles = document.querySelectorAll('.particle');
        particles.forEach(particle => {
            particle.style.left = Math.random() * width + 'px';
        });
    }
    
    // Crear lluvia de estrellas
    function createStarShower() {
        const starCount = 30;
        const stars = ['⭐', '✨', '🌟', '💫'];
        
        for (let i = 0; i < starCount; i++) {
            setTimeout(() => {
                const star = document.createElement('div');
                star.innerHTML = stars[Math.floor(Math.random() * stars.length)];
                star.style.cssText = `
                    position: fixed;
                    font-size: ${Math.random() * 20 + 15}px;
                    left: ${Math.random() * 100}%;
                    top: -50px;
                    z-index: 1000;
                    animation: starFall ${3 + Math.random() * 2}s ease-in forwards;
                    pointer-events: none;
                `;
                
                document.body.appendChild(star);
                
                setTimeout(() => {
                    star.remove();
                }, 5000);
            }, i * 100);
        }
    }
    
    // Hacer pulsar elementos
    function pulsateElements() {
        const elements = document.querySelectorAll('.hero-content, .memories-section h2');
        elements.forEach(element => {
            element.style.animation = 'pulse 1s ease-in-out 3';
        });
    }
    
    // Resetear celebración
    function resetCelebration() {
        celebrationActive = false;
        celebrateBtn.textContent = '¡Celebrar! 🎉';
        celebrateBtn.style.background = 'linear-gradient(45deg, #ff6b6b, #ee5a52)';
        
        // Restaurar fondo original
        body.style.background = 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)';
        
        // Limpiar efectos
        const effects = document.querySelectorAll('.confetti-piece, .floating-heart, .special-message');
        effects.forEach(effect => effect.remove());
        
        console.log('🔄 Celebración reiniciada');
    }
    
    // Agregar estilos CSS dinámicos
    function addDynamicStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes messageAppear {
                0% {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.5);
                }
                100% {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }
            }
            
            @keyframes messageDisappear {
                0% {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.5);
                }
            }
            
            @keyframes starFall {
                0% {
                    transform: translateY(-50px) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(100vh) rotate(360deg);
                    opacity: 0;
                }
            }
            
            .special-message .message-content {
                animation: pulse 2s ease-in-out infinite;
            }
            
            .special-message .heart-animation {
                font-size: 3rem;
                animation: bounce 1s ease-in-out infinite;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Ejecutar estilos dinámicos
    addDynamicStyles();
    
    // Mensaje de bienvenida en consola
    console.log('%c🎂 ¡Feliz Cumpleaños Mamá! 🎂', 'color: #ff6b6b; font-size: 20px; font-weight: bold;');
    console.log('%c✨ Presiona ESPACIO para celebrar ✨', 'color: #4ecdc4; font-size: 14px;');
});