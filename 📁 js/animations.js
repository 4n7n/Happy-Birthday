// animations.js - Sistema completo de animaciones dinámicas
class AnimationManager {
    constructor() {
        this.activeAnimations = new Set();
        this.confettiColors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f7b731', '#5f27cd', '#ff9ff3', '#54a0ff'];
        this.init();
    }
    
    init() {
        this.addAnimationStyles();
        console.log('🎨 Sistema de animaciones inicializado');
    }
    
    // Crear confetti con física mejorada
    createConfetti() {
        const confettiCount = 150;
        const burst = 3; // Ráfagas de confetti
        
        for (let b = 0; b < burst; b++) {
            setTimeout(() => {
                for (let i = 0; i < confettiCount / burst; i++) {
                    setTimeout(() => {
                        this.createConfettiPiece();
                    }, i * 30);
                }
            }, b * 200);
        }
    }
    
    createConfettiPiece() {
        const confetti = document.createElement('div');
        const color = this.confettiColors[Math.floor(Math.random() * this.confettiColors.length)];
        const size = Math.random() * 8 + 4;
        const startX = Math.random() * window.innerWidth;
        const rotation = Math.random() * 360;
        const duration = Math.random() * 2 + 2;
        
        confetti.className = 'confetti-piece';
        confetti.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            top: -20px;
            left: ${startX}px;
            z-index: 1000;
            pointer-events: none;
            transform: rotate(${rotation}deg);
            animation: confettiFall ${duration}s ease-out forwards;
        `;
        
        document.body.appendChild(confetti);
        this.activeAnimations.add(confetti);
        
        setTimeout(() => {
            confetti.remove();
            this.activeAnimations.delete(confetti);
        }, duration * 1000);
    }
    
    // Animaciones especiales para elementos
    triggerSpecialAnimations() {
        const cake = document.querySelector('.cake-animation');
        const title = document.querySelector('.main-title');
        const button = document.querySelector('.celebrate-button');
        
        if (cake) {
            cake.style.animation = 'none';
            setTimeout(() => {
                cake.style.animation = 'specialBounce 1s ease-in-out 3';
            }, 10);
        }
        
        if (title) {
            title.style.animation = 'rainbowText 3s ease-in-out infinite';
        }
        
        if (button) {
            button.style.animation = 'buttonCelebrate 2s ease-in-out 3';
        }
        
        // Crear ondas de expansión
        this.createRippleEffect();
    }
    
    // Crear efecto de ondas
    createRippleEffect() {
        const rippleCount = 5;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        for (let i = 0; i < rippleCount; i++) {
            setTimeout(() => {
                const ripple = document.createElement('div');
                ripple.className = 'ripple-effect';
                ripple.style.cssText = `
                    position: fixed;
                    width: 20px;
                    height: 20px;
                    border: 3px solid rgba(255, 107, 107, 0.6);
                    border-radius: 50%;
                    left: ${centerX - 10}px;
                    top: ${centerY - 10}px;
                    z-index: 999;
                    pointer-events: none;
                    animation: rippleExpand 2s ease-out forwards;
                `;
                
                document.body.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 2000);
            }, i * 300);
        }
    }
    
    // Crear explosión de corazones
    createHeartExplosion(centerX, centerY) {
        const heartCount = 20;
        const hearts = ['💕', '❤️', '💖', '💗', '💓', '💝'];
        
        for (let i = 0; i < heartCount; i++) {
            const heart = document.createElement('div');
            const heartType = hearts[Math.floor(Math.random() * hearts.length)];
            const angle = (i / heartCount) * Math.PI * 2;
            const distance = Math.random() * 200 + 50;
            const endX = centerX + Math.cos(angle) * distance;
            const endY = centerY + Math.sin(angle) * distance;
            
            heart.innerHTML = heartType;
            heart.style.cssText = `
                position: fixed;
                font-size: ${Math.random() * 20 + 15}px;
                left: ${centerX}px;
                top: ${centerY}px;
                z-index: 1000;
                pointer-events: none;
                animation: heartExplode 2s ease-out forwards;
                --end-x: ${endX}px;
                --end-y: ${endY}px;
            `;
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 2000);
        }
    }
    
    // Crear texto flotante
    createFloatingText(text, x, y) {
        const floatingText = document.createElement('div');
        floatingText.innerHTML = text;
        floatingText.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            font-size: 2rem;
            font-weight: bold;
            color: #ff6b6b;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            z-index: 1000;
            pointer-events: none;
            animation: textFloat 3s ease-out forwards;
        `;
        
        document.body.appendChild(floatingText);
        
        setTimeout(() => {
            floatingText.remove();
        }, 3000);
    }
    
    // Crear efectos de partículas mágicas
    createMagicParticles() {
        const particleCount = 100;
        const shapes = ['✨', '⭐', '🌟', '💫', '🔸', '🔹'];
        
        for (let i = 0; i < particleCount; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                const shape = shapes[Math.floor(Math.random() * shapes.length)];
                
                particle.innerHTML = shape;
                particle.style.cssText = `
                    position: fixed;
                    font-size: ${Math.random() * 15 + 10}px;
                    left: ${Math.random() * window.innerWidth}px;
                    top: ${Math.random() * window.innerHeight}px;
                    z-index: 998;
                    pointer-events: none;
                    animation: magicFloat ${3 + Math.random() * 2}s ease-in-out infinite;
                `;
                
                document.body.appendChild(particle);
                
                setTimeout(() => {
                    particle.remove();
                }, 8000);
            }, i * 50);
        }
    }
    
    // Crear efecto de lluvia de pétalos
    createPetalRain() {
        const petalCount = 50;
        const petals = ['🌸', '🌺', '🌹', '🌷', '🌻', '🌼'];
        
        for (let i = 0; i < petalCount; i++) {
            setTimeout(() => {
                const petal = document.createElement('div');
                const petalType = petals[Math.floor(Math.random() * petals.length)];
                
                petal.innerHTML = petalType;
                petal.style.cssText = `
                    position: fixed;
                    font-size: ${Math.random() * 25 + 20}px;
                    left: ${Math.random() * window.innerWidth}px;
                    top: -50px;
                    z-index: 997;
                    pointer-events: none;
                    animation: petalFall ${4 + Math.random() * 3}s ease-in-out forwards;
                `;
                
                document.body.appendChild(petal);
                
                setTimeout(() => {
                    petal.remove();
                }, 7000);
            }, i * 150);
        }
    }
    
    // Crear efecto de fuegos artificiales
    createFireworks() {
        const fireworkCount = 8;
        
        for (let i = 0; i < fireworkCount; i++) {
            setTimeout(() => {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight * 0.6;
                this.createSingleFirework(x, y);
            }, i * 800);
        }
    }
    
    createSingleFirework(x, y) {
        const sparkCount = 25;
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f7b731', '#5f27cd'];
        
        for (let i = 0; i < sparkCount; i++) {
            const spark = document.createElement('div');
            const color = colors[Math.floor(Math.random() * colors.length)];
            const angle = (i / sparkCount) * Math.PI * 2;
            const distance = Math.random() * 100 + 50;
            
            spark.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: ${color};
                border-radius: 50%;
                left: ${x}px;
                top: ${y}px;
                z-index: 1000;
                pointer-events: none;
                animation: sparkFly 1.5s ease-out forwards;
                --angle: ${angle}rad;
                --distance: ${distance}px;
            `;
            
            document.body.appendChild(spark);
            
            setTimeout(() => {
                spark.remove();
            }, 1500);
        }
    }
    
    // Limpiar todas las animaciones
    clearAllAnimations() {
        this.activeAnimations.forEach(animation => {
            animation.remove();
        });
        this.activeAnimations.clear();
        
        // Limpiar elementos de animación
        const animationElements = document.querySelectorAll(
            '.confetti-piece, .floating-heart, .ripple-effect, .magic-particle'
        );
        animationElements.forEach(element => element.remove());
    }
    
    // Agregar estilos CSS dinámicos
    addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes confettiFall {
                0% {
                    transform: translateY(-20px) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(100vh) rotate(720deg);
                    opacity: 0;
                }
            }
            
            @keyframes specialBounce {
                0%, 100% { transform: translateY(0) scale(1); }
                25% { transform: translateY(-30px) scale(1.1); }
                50% { transform: translateY(0) scale(1.05); }
                75% { transform: translateY(-15px) scale(1.08); }
            }
            
            @keyframes rainbowText {
                0% { color: #ff6b6b; text-shadow: 3px 3px 0px #fff; }
                20% { color: #4ecdc4; text-shadow: 3px 3px 0px #fff; }
                40% { color: #45b7d1; text-shadow: 3px 3px 0px #fff; }
                60% { color: #f7b731; text-shadow: 3px 3px 0px #fff; }
                80% { color: #5f27cd; text-shadow: 3px 3px 0px #fff; }
                100% { color: #ff6b6b; text-shadow: 3px 3px 0px #fff; }
            }
            
            @keyframes buttonCelebrate {
                0%, 100% { transform: scale(1) rotate(0deg); }
                25% { transform: scale(1.1) rotate(-5deg); }
                50% { transform: scale(1.2) rotate(5deg); }
                75% { transform: scale(1.1) rotate(-5deg); }
            }
            
            @keyframes rippleExpand {
                0% {
                    width: 20px;
                    height: 20px;
                    opacity: 0.8;
                }
                100% {
                    width: 300px;
                    height: 300px;
                    opacity: 0;
                    transform: translate(-140px, -140px);
                }
            }
            
            @keyframes heartExplode {
                0% {
                    transform: translate(0, 0) scale(1);
                    opacity: 1;
                }
                100% {
                    transform: translate(calc(var(--end-x) - 50%), calc(var(--end-y) - 50%)) scale(0.5);
                    opacity: 0;
                }
            }
            
            @keyframes textFloat {
                0% {
                    transform: translateY(0);
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100px);
                    opacity: 0;
                }
            }
            
            @keyframes magicFloat {
                0%, 100% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 0.8;
                }
                50% {
                    transform: translateY(-20px) rotate(180deg);
                    opacity: 1;
                }
            }
            
            @keyframes petalFall {
                0% {
                    transform: translateY(-50px) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(100vh) rotate(360deg);
                    opacity: 0;
                }
            }
            
            @keyframes sparkFly {
                0% {
                    transform: translate(0, 0);
                    opacity: 1;
                }
                100% {
                    transform: translate(
                        calc(cos(var(--angle)) * var(--distance)),
                        calc(sin(var(--angle)) * var(--distance))
                    );
                    opacity: 0;
                }
            }
            
            @keyframes float {
                0%, 100% {
                    transform: translateY(0);
                }
                50% {
                    transform: translateY(-20px);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Instancia global del manager de animaciones
const animationManager = new AnimationManager();

// Funciones globales para compatibilidad
function createConfetti() {
    animationManager.createConfetti();
}

function triggerSpecialAnimations() {
    animationManager.triggerSpecialAnimations();
}

function createFloatingHearts() {
    animationManager.createHeartExplosion(
        window.innerWidth / 2,
        window.innerHeight / 2
    );
}

function createStarShower() {
    animationManager.createMagicParticles();
}

// Eventos especiales de animación
document.addEventListener('click', function(e) {
    // Crear efecto de click
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        border: 2px solid rgba(255, 107, 107, 0.8);
        border-radius: 50%;
        left: ${e.clientX - 5}px;
        top: ${e.clientY - 5}px;
        z-index: 999;
        pointer-events: none;
        animation: rippleExpand 1s ease-out forwards;
    `;
    
    document.body.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 1000);
});

// Exportar para uso en otros módulos
window.AnimationManager = AnimationManager;
window.animationManager = animationManager;