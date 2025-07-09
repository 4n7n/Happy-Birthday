// ===== MAIN.JS - DIRECTOR DE FUNCIONALIDADES =====
// Este archivo coordina y controla todos los módulos del proyecto
// Importa y organiza: animations.js, gallery.js, music.js, particles.js

// ===== CONFIGURACIÓN GLOBAL =====
const BirthdayApp = {
    // Estado global de la aplicación
    state: {
        isInitialized: false,
        celebrationActive: false,
        musicPlaying: false,
        currentTheme: 'default',
        pageLoaded: false
    },
    
    // Configuración general
    config: {
        celebrationDuration: 10000, // 10 segundos
        autoStartParticles: true,
        enableKeyboardControls: true,
        defaultAge: 43, // Cambiar por la edad real
        musicVolume: 0.7
    },
    
    // Referencias a elementos DOM principales
    elements: {
        celebrateBtn: null,
        musicBtn: null,
        ageCounter: null,
        heroContent: null,
        body: null
    },
    
    // Módulos especializados (se conectan con otros archivos JS)
    modules: {
        animations: null,    // Se conectará con animations.js
        gallery: null,       // Se conectará con gallery.js
        music: null,         // Se conectará con music.js
        particles: null      // Se conectará con particles.js
    }
};

// ===== INICIALIZACIÓN PRINCIPAL =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎂 Iniciando Director de Celebración de Cumpleaños...');
    
    // Inicializar la aplicación
    BirthdayApp.init();
});

// ===== FUNCIONES PRINCIPALES DEL DIRECTOR =====
BirthdayApp.init = function() {
    console.log('✨ Inicializando todos los sistemas...');
    
    try {
        // 1. Configurar referencias DOM
        this.setupDOMReferences();
        
        // 2. Inicializar módulos especializados
        this.initializeModules();
        
        // 3. Configurar eventos globales
        this.setupGlobalEventListeners();
        
        // 4. Configurar efectos iniciales
        this.setupInitialEffects();
        
        // 5. Configurar controles de teclado
        if (this.config.enableKeyboardControls) {
            this.setupKeyboardControls();
        }
        
        // 6. Marcar como inicializado
        this.state.isInitialized = true;
        this.state.pageLoaded = true;
        
        // 7. Activar estado de página cargada
        document.body.classList.add('page-loaded');
        
        console.log('🎉 ¡Director inicializado! Todo listo para celebrar.');
        
    } catch (error) {
        console.error('❌ Error inicializando la aplicación:', error);
    }
};

// ===== CONFIGURACIÓN DE REFERENCIAS DOM =====
BirthdayApp.setupDOMReferences = function() {
    this.elements.body = document.body;
    this.elements.celebrateBtn = document.getElementById('celebrate-btn');
    this.elements.musicBtn = document.getElementById('music-btn');
    this.elements.ageCounter = document.getElementById('age-counter');
    this.elements.heroContent = document.querySelector('.hero-content');
    
    // Verificar elementos críticos
    if (!this.elements.celebrateBtn) {
        console.warn('⚠️ Botón de celebrar no encontrado');
    }
};

// ===== INICIALIZACIÓN DE MÓDULOS =====
BirthdayApp.initializeModules = function() {
    console.log('🔧 Inicializando módulos especializados...');
    
    // Inicializar Partículas (particles.js)
    if (typeof initializeParticles === 'function') {
        this.modules.particles = initializeParticles();
        console.log('✅ Módulo de partículas inicializado');
    } else {
        console.log('📝 particles.js no encontrado - creando funciones básicas');
        this.createBasicParticlesFunctions();
    }
    
    // Inicializar Galería (gallery.js)
    if (typeof initializeGallery === 'function') {
        this.modules.gallery = initializeGallery();
        console.log('✅ Módulo de galería inicializado');
    } else {
        console.log('📝 gallery.js no encontrado - creando funciones básicas');
        this.createBasicGalleryFunctions();
    }
    
    // Inicializar Música (music.js)
    if (typeof initializeMusic === 'function') {
        this.modules.music = initializeMusic();
        console.log('✅ Módulo de música inicializado');
    } else {
        console.log('📝 music.js no encontrado - creando funciones básicas');
        this.createBasicMusicFunctions();
    }
    
    // Inicializar Animaciones (animations.js)
    if (typeof initializeAnimations === 'function') {
        this.modules.animations = initializeAnimations();
        console.log('✅ Módulo de animaciones inicializado');
    } else {
        console.log('📝 animations.js no encontrado - creando funciones básicas');
        this.createBasicAnimationsFunctions();
    }
};

// ===== EVENTOS GLOBALES =====
BirthdayApp.setupGlobalEventListeners = function() {
    console.log('🎯 Configurando eventos globales...');
    
    // Evento principal de celebración
    if (this.elements.celebrateBtn) {
        this.elements.celebrateBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleCelebrationToggle();
        });
    }
    
    // Evento de música
    if (this.elements.musicBtn) {
        this.elements.musicBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleMusicToggle();
        });
    }
    
    // Eventos de redimensionamiento
    window.addEventListener('resize', this.debounce(() => {
        this.handleWindowResize();
    }, 250));
    
    // Eventos de scroll
    window.addEventListener('scroll', this.throttle(() => {
        this.handleScroll();
    }, 16)); // 60fps
    
    // Evento de visibilidad de página
    document.addEventListener('visibilitychange', () => {
        this.handleVisibilityChange();
    });
};

// ===== FUNCIÓN PRINCIPAL DE CELEBRACIÓN =====
BirthdayApp.handleCelebrationToggle = function() {
    if (!this.state.celebrationActive) {
        this.startCelebration();
    } else {
        this.stopCelebration();
    }
};

BirthdayApp.startCelebration = function() {
    console.log('🎉 ¡INICIANDO CELEBRACIÓN PRINCIPAL!');
    
    this.state.celebrationActive = true;
    
    // Actualizar botón
    if (this.elements.celebrateBtn) {
        this.elements.celebrateBtn.innerHTML = '🎊 ¡Celebrando! 🎊';
        this.elements.celebrateBtn.style.background = 'linear-gradient(45deg, #4ecdc4, #45b7d1)';
    }
    
    // Ejecutar secuencia de celebración coordinada
    this.executeCelebrationSequence();
    
    // Auto-stop después de duración configurada
    setTimeout(() => {
        if (this.state.celebrationActive) {
            this.stopCelebration();
        }
    }, this.config.celebrationDuration);
};

BirthdayApp.executeCelebrationSequence = function() {
    console.log('🎭 Ejecutando secuencia de celebración...');
    
    // Fase 1: Efectos inmediatos (0ms)
    setTimeout(() => {
        this.triggerConfetti();
        this.triggerSpecialAnimations();
        this.changeBackgroundTheme();
    }, 0);
    
    // Fase 2: Música y partículas (500ms)
    setTimeout(() => {
        this.startBirthdayMusic();
        this.createFloatingHearts();
    }, 500);
    
    // Fase 3: Mensaje especial (1000ms)
    setTimeout(() => {
        this.showSpecialMessage();
    }, 1000);
    
    // Fase 4: Efectos adicionales (1500ms)
    setTimeout(() => {
        this.createStarShower();
        this.animateCounterDisplay();
    }, 1500);
    
    // Fase 5: Galería especial (2000ms)
    setTimeout(() => {
        this.activateGalleryMode();
    }, 2000);
};

BirthdayApp.stopCelebration = function() {
    console.log('🔄 Deteniendo celebración...');
    
    this.state.celebrationActive = false;
    
    // Restaurar botón
    if (this.elements.celebrateBtn) {
        this.elements.celebrateBtn.innerHTML = '<span class="btn-text">¡Celebrar!</span><span class="btn-icon">🎉</span>';
        this.elements.celebrateBtn.style.background = '';
    }
    
    // Limpiar efectos
    this.cleanupEffects();
    
    // Restaurar tema
    this.restoreDefaultTheme();
};

// ===== COORDINACIÓN CON MÓDULOS ESPECIALIZADOS =====
BirthdayApp.triggerConfetti = function() {
    if (this.modules.particles && typeof this.modules.particles.createConfetti === 'function') {
        this.modules.particles.createConfetti();
    } else if (typeof createConfetti === 'function') {
        createConfetti();
    } else {
        this.fallbackConfetti();
    }
};

BirthdayApp.triggerSpecialAnimations = function() {
    if (this.modules.animations && typeof this.modules.animations.triggerCelebration === 'function') {
        this.modules.animations.triggerCelebration();
    } else if (typeof triggerCelebrationAnimations === 'function') {
        triggerCelebrationAnimations();
    } else {
        this.fallbackAnimations();
    }
};

BirthdayApp.startBirthdayMusic = function() {
    if (this.modules.music && typeof this.modules.music.playBirthdayMusic === 'function') {
        this.modules.music.playBirthdayMusic();
        this.state.musicPlaying = true;
    } else if (typeof playBirthdayMusic === 'function') {
        playBirthdayMusic();
        this.state.musicPlaying = true;
    } else {
        this.fallbackMusic();
    }
};

BirthdayApp.activateGalleryMode = function() {
    if (this.modules.gallery && typeof this.modules.gallery.startSlideshow === 'function') {
        this.modules.gallery.startSlideshow();
    } else if (typeof startGallerySlideshow === 'function') {
        startGallerySlideshow();
    } else {
        this.fallbackGallery();
    }
};

// ===== FUNCIONES DE EFECTOS ESPECIALES =====
BirthdayApp.showSpecialMessage = function() {
    const messages = [
        '¡Te amo mucho mamá! 💕',
        '¡Eres la mejor madre del mundo! 🌟',
        '¡Feliz cumpleaños hermosa! 🎂',
        '¡Gracias por todo tu amor! ❤️'
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    const messageEl = document.createElement('div');
    messageEl.className = 'special-birthday-message';
    messageEl.innerHTML = `
        <div class="message-content">
            <h2>${randomMessage}</h2>
            <div class="heart-animation">💖</div>
        </div>
    `;
    
    // Estilos del mensaje
    Object.assign(messageEl.style, {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,182,193,0.9))',
        padding: '40px',
        borderRadius: '20px',
        textAlign: 'center',
        zIndex: '10000',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        backdropFilter: 'blur(10px)',
        animation: 'specialMessageAppear 0.8s ease-out'
    });
    
    document.body.appendChild(messageEl);
    
    // Remover después de 4 segundos
    setTimeout(() => {
        messageEl.style.animation = 'specialMessageDisappear 0.8s ease-in forwards';
        setTimeout(() => messageEl.remove(), 800);
    }, 4000);
};

BirthdayApp.changeBackgroundTheme = function() {
    const themes = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    ];
    
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    this.state.currentTheme = randomTheme;
    
    if (this.elements.body) {
        this.elements.body.style.background = randomTheme;
        this.elements.body.style.transition = 'background 2s ease';
    }
};

BirthdayApp.createFloatingHearts = function() {
    const heartCount = 15;
    const hearts = ['💕', '💖', '💝', '❤️', '💗'];
    
    for (let i = 0; i < heartCount; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
            heart.className = 'floating-heart';
            
            Object.assign(heart.style, {
                position: 'fixed',
                fontSize: `${Math.random() * 20 + 20}px`,
                left: `${Math.random() * 100}%`,
                top: '100vh',
                zIndex: '1000',
                animation: `floatUp ${3 + Math.random() * 2}s ease-out forwards`,
                pointerEvents: 'none'
            });
            
            document.body.appendChild(heart);
            
            setTimeout(() => heart.remove(), 5000);
        }, i * 200);
    }
};

BirthdayApp.createStarShower = function() {
    const starCount = 25;
    const stars = ['⭐', '✨', '🌟', '💫', '🌠'];
    
    for (let i = 0; i < starCount; i++) {
        setTimeout(() => {
            const star = document.createElement('div');
            star.innerHTML = stars[Math.floor(Math.random() * stars.length)];
            star.className = 'falling-star';
            
            Object.assign(star.style, {
                position: 'fixed',
                fontSize: `${Math.random() * 15 + 15}px`,
                left: `${Math.random() * 100}%`,
                top: '-50px',
                zIndex: '1000',
                animation: `starFall ${3 + Math.random() * 2}s ease-in forwards`,
                pointerEvents: 'none'
            });
            
            document.body.appendChild(star);
            
            setTimeout(() => star.remove(), 5000);
        }, i * 100);
    }
};

BirthdayApp.animateCounterDisplay = function() {
    if (!this.elements.ageCounter) return;
    
    let count = 0;
    const targetAge = this.config.defaultAge;
    const increment = targetAge / 30; // 30 pasos
    
    const counterInterval = setInterval(() => {
        count += increment;
        if (count >= targetAge) {
            count = targetAge;
            clearInterval(counterInterval);
            this.elements.ageCounter.style.color = '#ff6b6b';
            this.elements.ageCounter.style.transform = 'scale(1.2)';
        }
        this.elements.ageCounter.textContent = Math.floor(count);
    }, 50);
};

// ===== CONTROLES DE TECLADO =====
BirthdayApp.setupKeyboardControls = function() {
    document.addEventListener('keydown', (e) => {
        // Evitar interferir con inputs
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        
        switch(e.key.toLowerCase()) {
            case ' ':
            case 'enter':
                e.preventDefault();
                this.handleCelebrationToggle();
                break;
            case 'm':
                e.preventDefault();
                this.handleMusicToggle();
                break;
            case 'r':
                e.preventDefault();
                this.resetEverything();
                break;
            case 'h':
                e.preventDefault();
                this.createFloatingHearts();
                break;
            case 'c':
                e.preventDefault();
                this.triggerConfetti();
                break;
            case 's':
                e.preventDefault();
                this.createStarShower();
                break;
        }
    });
    
    console.log('⌨️ Controles de teclado activados:');
    console.log('  ESPACIO/ENTER: Celebrar');
    console.log('  M: Música');
    console.log('  R: Reset');
    console.log('  H: Corazones');
    console.log('  C: Confeti');
    console.log('  S: Estrellas');
};

// ===== MANEJO DE MÚSICA =====
BirthdayApp.handleMusicToggle = function() {
    if (!this.state.musicPlaying) {
        this.startBirthdayMusic();
        if (this.elements.musicBtn) {
            this.elements.musicBtn.innerHTML = '🔇 Pausar';
        }
    } else {
        this.stopMusic();
        if (this.elements.musicBtn) {
            this.elements.musicBtn.innerHTML = '🎵 Música';
        }
    }
};

BirthdayApp.stopMusic = function() {
    if (this.modules.music && typeof this.modules.music.stopMusic === 'function') {
        this.modules.music.stopMusic();
    } else if (typeof stopBirthdayMusic === 'function') {
        stopBirthdayMusic();
    }
    this.state.musicPlaying = false;
};

// ===== EVENTOS DE VENTANA =====
BirthdayApp.handleWindowResize = function() {
    // Ajustar título responsive
    if (this.elements.heroContent) {
        const width = window.innerWidth;
        const title = this.elements.heroContent.querySelector('.main-title');
        if (title) {
            if (width < 480) {
                title.style.fontSize = '2rem';
            } else if (width < 768) {
                title.style.fontSize = '2.5rem';
            } else {
                title.style.fontSize = 'clamp(2.5rem, 8vw, 5rem)';
            }
        }
    }
    
    // Notificar a módulos del resize
    if (this.modules.particles && typeof this.modules.particles.handleResize === 'function') {
        this.modules.particles.handleResize();
    }
    if (this.modules.gallery && typeof this.modules.gallery.handleResize === 'function') {
        this.modules.gallery.handleResize();
    }
};

BirthdayApp.handleScroll = function() {
    const scrolled = window.pageYOffset;
    
    // Efecto parallax básico
    const parallaxElements = document.querySelectorAll('.parallax-element');
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
    
    // Notificar scroll a módulos
    if (this.modules.animations && typeof this.modules.animations.handleScroll === 'function') {
        this.modules.animations.handleScroll(scrolled);
    }
};

BirthdayApp.handleVisibilityChange = function() {
    if (document.hidden) {
        // Página no visible - pausar efectos pesados
        if (this.state.musicPlaying) {
            this.stopMusic();
        }
    } else {
        // Página visible - reanudar si es necesario
        console.log('👁️ Página visible nuevamente');
    }
};

// ===== EFECTOS INICIALES =====
BirthdayApp.setupInitialEffects = function() {
    // Efecto de entrada para el hero
    setTimeout(() => {
        if (this.elements.heroContent) {
            this.elements.heroContent.style.opacity = '1';
            this.elements.heroContent.style.transform = 'translateY(0)';
        }
    }, 500);
    
    // Efecto de entrada para elementos decorativos
    setTimeout(() => {
        const cake = document.querySelector('.cake-animation');
        if (cake) {
            cake.style.animation = 'bounce 2s ease-in-out infinite';
        }
    }, 1000);
    
    // Partículas de fondo si están disponibles
    if (this.config.autoStartParticles) {
        setTimeout(() => {
            if (this.modules.particles && typeof this.modules.particles.startBackground === 'function') {
                this.modules.particles.startBackground();
            }
        }, 1500);
    }
};

// ===== FUNCIONES DE LIMPIEZA =====
BirthdayApp.cleanupEffects = function() {
    // Remover efectos temporales
    const effects = document.querySelectorAll('.floating-heart, .falling-star, .confetti-piece, .special-birthday-message');
    effects.forEach(effect => effect.remove());
    
    // Detener música si está sonando
    if (this.state.musicPlaying) {
        this.stopMusic();
    }
    
    // Notificar a módulos para limpieza
    Object.values(this.modules).forEach(module => {
        if (module && typeof module.cleanup === 'function') {
            module.cleanup();
        }
    });
};

BirthdayApp.restoreDefaultTheme = function() {
    if (this.elements.body) {
        this.elements.body.style.background = 'linear-gradient(135deg, var(--color-primary-purple) 0%, var(--color-secondary-purple) 100%)';
        this.state.currentTheme = 'default';
    }
};

BirthdayApp.resetEverything = function() {
    console.log('🔄 Reiniciando toda la aplicación...');
    
    this.stopCelebration();
    this.cleanupEffects();
    this.restoreDefaultTheme();
    
    // Reinicializar módulos si es necesario
    if (this.state.isInitialized) {
        this.initializeModules();
    }
    
    console.log('✅ Aplicación reiniciada');
};

// ===== FUNCIONES FALLBACK =====
BirthdayApp.createBasicParticlesFunctions = function() {
    window.createConfetti = this.fallbackConfetti.bind(this);
    console.log('📦 Funciones básicas de partículas creadas');
};

BirthdayApp.createBasicGalleryFunctions = function() {
    window.startGallerySlideshow = this.fallbackGallery.bind(this);
    console.log('📦 Funciones básicas de galería creadas');
};

BirthdayApp.createBasicMusicFunctions = function() {
    window.playBirthdayMusic = this.fallbackMusic.bind(this);
    window.stopBirthdayMusic = () => { this.state.musicPlaying = false; };
    console.log('📦 Funciones básicas de música creadas');
};

BirthdayApp.createBasicAnimationsFunctions = function() {
    window.triggerCelebrationAnimations = this.fallbackAnimations.bind(this);
    console.log('📦 Funciones básicas de animaciones creadas');
};

BirthdayApp.fallbackConfetti = function() {
    console.log('🎊 Ejecutando confeti básico');
    const colors = ['#ff6b6b', '#4ecdc4', '#ffd93d', '#c2185b'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.style.cssText = `
                position: fixed;
                width: 8px;
                height: 8px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}%;
                top: -10px;
                z-index: 1000;
                animation: confettiFall ${2 + Math.random() * 3}s ease-in forwards;
                pointer-events: none;
            `;
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 5000);
        }, i * 50);
    }
};

BirthdayApp.fallbackMusic = function() {
    console.log('🎵 Intentando reproducir música básica');
    const audio = document.getElementById('celebration-audio');
    if (audio) {
        audio.volume = this.config.musicVolume;
        audio.play().catch(() => {
            console.log('🔇 No se pudo reproducir audio automáticamente');
        });
        this.state.musicPlaying = true;
    }
};

BirthdayApp.fallbackGallery = function() {
    console.log('🖼️ Activando galería básica');
    const galleryItems = document.querySelectorAll('.photo-item');
    galleryItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.transform = 'scale(1.05)';
            item.style.transition = 'transform 0.5s ease';
            setTimeout(() => {
                item.style.transform = 'scale(1)';
            }, 1000);
        }, index * 300);
    });
};

BirthdayApp.fallbackAnimations = function() {
    console.log('✨ Ejecutando animaciones básicas');
    const elementsToAnimate = document.querySelectorAll('.hero-content, .cake-animation, .main-title');
    elementsToAnimate.forEach(el => {
        el.style.animation = 'pulse 1s ease-in-out 3';
    });
};

// ===== UTILIDADES =====
BirthdayApp.debounce = function(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

BirthdayApp.throttle = function(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// ===== ESTILOS DINÁMICOS =====
BirthdayApp.addDynamicStyles = function() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes specialMessageAppear {
            0% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.5) rotate(-10deg);
            }
            100% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1) rotate(0deg);
            }
        }
        
        @keyframes specialMessageDisappear {
            0% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1) rotate(0deg);
            }
            100% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.5) rotate(10deg);
            }
        }
        
        @keyframes floatUp {
            0% {
                opacity: 1;
                transform: translateY(0) rotate(0deg);
            }
            100% {
                opacity: 0;
                transform: translateY(-100vh) rotate(360deg);
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
        
        @keyframes confettiFall {
            0% {
                transform: translateY(-10px) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
};

// ===== INICIALIZACIÓN DE ESTILOS =====
BirthdayApp.addDynamicStyles();

// ===== EXPOSICIÓN GLOBAL PARA DEBUGGING =====
window.BirthdayApp = BirthdayApp;

// ===== MENSAJES DE CONSOLA =====
console.log('%c🎂 ¡FELIZ CUMPLEAÑOS MAMÁ! 🎂', 'color: #ff6b6b; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
console.log('%c✨ Sistema de celebración cargado ✨', 'color: #4ecdc4; font-size: 16px; font-weight: bold;');
console.log('%c🎹 Controles disponibles:', 'color: #ffd93d; font-size: 14px; font-weight: bold;');
console.log('  🎉 ESPACIO: Celebrar');
console.log('  🎵 M: Música');
console.log('  🔄 R: Reset');
console.log('  💕 H: Corazones');
console.log('  🎊 C: Confeti');
console.log('  ⭐ S: Estrellas');