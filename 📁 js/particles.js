// particles.js - Sistema avanzado de partículas y efectos visuales
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.hearts = [];
        this.confetti = [];
        this.magic = [];
        this.container = null;
        this.canvas = null;
        this.ctx = null;
        this.animationId = null;
        this.isRunning = false;
        this.config = {
            maxParticles: 100,
            heartCount: 50,
            confettiCount: 200,
            magicCount: 75
        };
        this.init();
    }
    
    init() {
        this.createContainer();
        this.createCanvas();
        this.setupEventListeners();
        this.startAnimation();
        console.log('✨ Sistema de partículas inicializado');
    }
    
    // Crear contenedor de partículas
    createContainer() {
        this.container = document.getElementById('particles-container');
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.id = 'particles-container';
            this.container.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 1;
                overflow: hidden;
            `;
            document.body.appendChild(this.container);
        }
    }
    
    // Crear canvas para efectos complejos
    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'particles-canvas';
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 2;
        `;
        
        this.updateCanvasSize();
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);
    }
    
    // Actualizar tamaño del canvas
    updateCanvasSize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    // Configurar event listeners
    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.updateCanvasSize();
        });
        
        // Crear partículas en click
        document.addEventListener('click', (e) => {
            this.createClickEffect(e.clientX, e.clientY);
        });
    }
    
    // Crear sistema de partículas básico
    createParticleSystem() {
        for (let i = 0; i < this.config.maxParticles; i++) {
            setTimeout(() => {
                this.createParticle();
            }, i * 100);
        }
    }
    
    // Crear partícula individual
    createParticle() {
        const particle = {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            size: Math.random() * 6 + 2,
            color: this.getRandomColor(),
            life: 1.0,
            decay: Math.random() * 0.02 + 0.01,
            shape: Math.random() > 0.5 ? 'circle' : 'square'
        };
        
        this.particles.push(particle);
        this.createParticleElement(particle);
    }
    
    // Crear elemento DOM para partícula
    createParticleElement(particle) {
        const element = document.createElement('div');
        element.className = 'particle';
        element.style.cssText = `
            position: absolute;
            width: ${particle.size}px;
            height: ${particle.size}px;
            background: ${particle.color};
            border-radius: ${particle.shape === 'circle' ? '50%' : '0'};
            left: ${particle.x}px;
            top: ${particle.y}px;
            pointer-events: none;
            animation: particleFloat ${3 + Math.random() * 2}s ease-in-out infinite alternate;
        `;
        
        this.container.appendChild(element);
        particle.element = element;
        
        // Remover después de tiempo de vida
        setTimeout(() => {
            this.removeParticle(particle);
        }, 8000);
    }
    
    // Remover partícula
    removeParticle(particle) {
        if (particle.element) {
            particle.element.remove();
        }
        const index = this.particles.indexOf(particle);
        if (index > -1) {
            this.particles.splice(index, 1);
        }
    }
    
    // Crear corazones flotantes
    createFloatingHearts() {
        for (let i = 0; i < this.config.heartCount; i++) {
            setTimeout(() => {
                this.createHeart();
            }, i * 150);
        }
    }
    
    // Crear corazón individual
    createHeart() {
        const hearts = ['💕', '❤️', '💖', '💗', '💓', '💝', '💘', '💞'];
        const heart = document.createElement('div');
        heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
        heart.className = 'floating-heart';
        
        const startX = Math.random() * window.innerWidth;
        const endX = startX + (Math.random() - 0.5) * 200;
        
        heart.style.cssText = `
            position: fixed;
            font-size: ${Math.random() * 20 + 25}px;
            left: ${startX}px;
            top: 100vh;
            z-index: 1000;
            pointer-events: none;
            animation: heartFloat ${4 + Math.random() * 2}s ease-out forwards;
            --end-x: ${endX}px;
        `;
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 6000);
    }
    
    // Crear confetti mejorado
    createAdvancedConfetti() {
        for (let i = 0; i < this.config.confettiCount; i++) {
            setTimeout(() => {
                this.createConfettiPiece();
            }, i * 20);
        }
    }
    
    // Crear pieza de confetti
    createConfettiPiece() {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f7b731', '#5f27cd', '#ff9ff3', '#54a0ff'];
        const shapes = ['circle', 'square', 'triangle', 'star'];
        
        const confetti = {
            x: Math.random() * window.innerWidth,
            y: -20,
            vx: (Math.random() - 0.5) * 10,
            vy: Math.random() * 5 + 2,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 20,
            size: Math.random() * 8 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            shape: shapes[Math.floor(Math.random() * shapes.length)],
            gravity: 0.5,
            life: 1.0
        };
        
        this.confetti.push(confetti);
        this.createConfettiElement(confetti);
    }
    
    // Crear elemento de confetti
    createConfettiElement(confetti) {
        const element = document.createElement('div');
        element.className = 'confetti-piece';
        
        // Diferentes formas
        let shapeStyle = '';
        switch(confetti.shape) {
            case 'triangle':
                shapeStyle = `
                    width: 0;
                    height: 0;
                    border-left: ${confetti.size/2}px solid transparent;
                    border-right: ${confetti.size/2}px solid transparent;
                    border-bottom: ${confetti.size}px solid ${confetti.color};
                `;
                break;
            case 'star':
                element.innerHTML = '★';
                shapeStyle = `
                    width: ${confetti.size}px;
                    height: ${confetti.size}px;
                    color: ${confetti.color};
                    font-size: ${confetti.size}px;
                    line-height: 1;
                `;
                break;
            default:
                shapeStyle = `
                    width: ${confetti.size}px;
                    height: ${confetti.size}px;
                    background: ${confetti.color};
                    border-radius: ${confetti.shape === 'circle' ? '50%' : '0'};
                `;
        }
        
        element.style.cssText = `
            position: fixed;
            ${shapeStyle}
            left: ${confetti.x}px;
            top: ${confetti.y}px;
            z-index: 1000;
            pointer-events: none;
            transform: rotate(${confetti.rotation}deg);
        `;
        
        document.body.appendChild(element);
        confetti.element = element;
        
        // Animar confetti
        this.animateConfetti(confetti);
    }
    
    // Animar confetti con física
    animateConfetti(confetti) {
        const animate = () => {
            confetti.x += confetti.vx;
            confetti.y += confetti.vy;
            confetti.vy += confetti.gravity;
            confetti.rotation += confetti.rotationSpeed;
            confetti.life -= 0.01;
            
            if (confetti.element) {
                confetti.element.style.left = confetti.x + 'px';
                confetti.element.style.top = confetti.y + 'px';
                confetti.element.style.transform = `rotate(${confetti.rotation}deg)`;
                confetti.element.style.opacity = confetti.life;
            }
            
            if (confetti.y < window.innerHeight && confetti.life > 0) {
                requestAnimationFrame(animate);
            } else {
                if (confetti.element) {
                    confetti.element.remove();
                }
                const index = this.confetti.indexOf(confetti);
                if (index > -1) {
                    this.confetti.splice(index, 1);
                }
            }
        };
        
        animate();
    }
    
    // Crear partículas mágicas
    createMagicParticles() {
        for (let i = 0; i < this.config.magicCount; i++) {
            setTimeout(() => {
                this.createMagicParticle();
            }, i * 80);
        }
    }
    
    // Crear partícula mágica
    createMagicParticle() {
        const symbols = ['✨', '⭐', '🌟', '💫', '🔸', '🔹', '◆', '◇'];
        const particle = document.createElement('div');
        particle.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
        particle.className = 'magic-particle';
        
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const scale = Math.random() * 0.8 + 0.2;
        
        particle.style.cssText = `
            position: fixed;
            font-size: ${Math.random() * 20 + 15}px;
            left: ${x}px;
            top: ${y}px;
            z-index: 998;
            pointer-events: none;
            transform: scale(${scale});
            animation: magicFloat ${3 + Math.random() * 2}s ease-in-out infinite alternate;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 8000);
    }
    
    // Crear efecto de click
    createClickEffect(x, y) {
        const effectCount = 8;
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f7b731'];
        
        for (let i = 0; i < effectCount; i++) {
            const particle = document.createElement('div');
            const angle = (i / effectCount) * Math.PI * 2;
            const distance = 50 + Math.random() * 30;
            const endX = x + Math.cos(angle) * distance;
            const endY = y + Math.sin(angle) * distance;
            
            particle.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: 50%;
                left: ${x}px;
                top: ${y}px;
                z-index: 1000;
                pointer-events: none;
                animation: explode 0.8s ease-out forwards;
                --end-x: ${endX}px;
                --end-y: ${endY}px;
            `;
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 800);
        }
    }
    
    // Crear lluvia de estrellas
    createStarRain() {
        const starCount = 50;
        const stars = ['⭐', '✨', '🌟', '💫'];
        
        for (let i = 0; i < starCount; i++) {
            setTimeout(() => {
                const star = document.createElement('div');
                star.innerHTML = stars[Math.floor(Math.random() * stars.length)];
                star.className = 'star-rain';
                
                star.style.cssText = `
                    position: fixed;
                    font-size: ${Math.random() * 25 + 20}px;
                    left: ${Math.random() * window.innerWidth}px;
                    top: -50px;
                    z-index: 997;
                    pointer-events: none;
                    animation: starFall ${4 + Math.random() * 3}s ease-in-out forwards;
                `;
                
                document.body.appendChild(star);
                
                setTimeout(() => {
                    star.remove();
                }, 7000);
            }, i * 150);
        }
    }
    
    // Crear fuegos artificiales
    createFireworks() {
        const fireworkCount = 10;
        
        for (let i = 0; i < fireworkCount; i++) {
            setTimeout(() => {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight * 0.6;
                this.createFirework(x, y);
            }, i * 800);
        }
    }
    
    // Crear fuego artificial individual
    createFirework(x, y) {
        const sparkCount = 30;
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f7b731', '#5f27cd'];
        
        for (let i = 0; i < sparkCount; i++) {
            const spark = document.createElement('div');
            const color = colors[Math.floor(Math.random() * colors.length)];
            const angle = (i / sparkCount) * Math.PI * 2;
            const distance = Math.random() * 100 + 50;
            const endX = x + Math.cos(angle) * distance;
            const endY = y + Math.sin(angle) * distance;
            
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
                --end-x: ${endX}px;
                --end-y: ${endY}px;
            `;
            
            document.body.appendChild(spark);
            
            setTimeout(() => {
                spark.remove();
            }, 1500);
        }
    }
    
    // Crear efecto de ondas
    createRippleWaves() {
        const waveCount = 5;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        for (let i = 0; i < waveCount; i++) {
            setTimeout(() => {
                const wave = document.createElement('div');
                wave.className = 'ripple-wave';
                wave.style.cssText = `
                    position: fixed;
                    width: 20px;
                    height: 20px;
                    border: 3px solid rgba(255, 107, 107, 0.6);
                    border-radius: 50%;
                    left: ${centerX - 10}px;
                    top: ${centerY - 10}px;
                    z-index: 999;
                    pointer-events: none;
                    animation: waveExpand 2s ease-out forwards;
                `;
                
                document.body.appendChild(wave);
                
                setTimeout(() => {
                    wave.remove();
                }, 2000);
            }, i * 300);
        }
    }
    
    // Crear partículas de burbujas
    createBubbles() {
        const bubbleCount = 30;
        
        for (let i = 0; i < bubbleCount; i++) {
            setTimeout(() => {
                const bubble = document.createElement('div');
                bubble.className = 'bubble';
                
                const size = Math.random() * 40 + 20;
                const x = Math.random() * window.innerWidth;
                const opacity = Math.random() * 0.5 + 0.3;
                
                bubble.style.cssText = `
                    position: fixed;
                    width: ${size}px;
                    height: ${size}px;
                    background: radial-gradient(circle, rgba(255,255,255,0.8), rgba(255,255,255,0.2));
                    border: 2px solid rgba(255,255,255,0.3);
                    border-radius: 50%;
                    left: ${x}px;
                    top: 100vh;
                    z-index: 996;
                    pointer-events: none;
                    opacity: ${opacity};
                    animation: bubbleFloat ${6 + Math.random() * 4}s ease-out forwards;
                `;
                
                document.body.appendChild(bubble);
                
                setTimeout(() => {
                    bubble.remove();
                }, 10000);
            }, i * 200);
        }
    }
    
    // Crear trail de mouse
    createMouseTrail() {
        let mouseX = 0;
        let mouseY = 0;
        const trail = [];
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Crear partícula de trail
            const trailParticle = document.createElement('div');
            trailParticle.className = 'mouse-trail';
            trailParticle.style.cssText = `
                position: fixed;
                width: 8px;
                height: 8px;
                background: radial-gradient(circle, #ff6b6b, #4ecdc4);
                border-radius: 50%;
                left: ${mouseX - 4}px;
                top: ${mouseY - 4}px;
                z-index: 995;
                pointer-events: none;
                animation: trailFade 1s ease-out forwards;
            `;
            
            document.body.appendChild(trailParticle);
            trail.push(trailParticle);
            
            // Limitar trail a 20 partículas
            if (trail.length > 20) {
                const oldParticle = trail.shift();
                oldParticle.remove();
            }
            
            setTimeout(() => {
                trailParticle.remove();
            }, 1000);
        });
    }
    
    // Crear efecto de texto flotante
    createFloatingText(text, x, y) {
        const textElement = document.createElement('div');
        textElement.innerHTML = text;
        textElement.className = 'floating-text';
        textElement.style.cssText = `
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
        
        document.body.appendChild(textElement);
        
        setTimeout(() => {
            textElement.remove();
        }, 3000);
    }
    
    // Iniciar animación principal
    startAnimation() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.animate();
    }
    
    // Loop principal de animación
    animate() {
        if (!this.isRunning) return;
        
        // Limpiar canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Dibujar efectos en canvas
        this.drawCanvasEffects();
        
        // Continuar animación
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    // Dibujar efectos en canvas
    drawCanvasEffects() {
        // Efecto de gradiente de fondo
        const gradient = this.ctx.createRadialGradient(
            this.canvas.width / 2, this.canvas.height / 2, 0,
            this.canvas.width / 2, this.canvas.height / 2, Math.max(this.canvas.width, this.canvas.height)
        );
        gradient.addColorStop(0, 'rgba(255, 107, 107, 0.05)');
        gradient.addColorStop(1, 'rgba(78, 205, 196, 0.05)');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Dibujar partículas animadas
        this.drawAnimatedParticles();
    }
    
    // Dibujar partículas animadas en canvas
    drawAnimatedParticles() {
        const time = Date.now() * 0.001;
        
        for (let i = 0; i < 20; i++) {
            const x = (Math.sin(time + i) * 100) + this.canvas.width / 2;
            const y = (Math.cos(time + i * 0.5) * 50) + this.canvas.height / 2;
            const size = Math.sin(time + i * 2) * 3 + 5;
            
            this.ctx.beginPath();
            this.ctx.arc(x, y, size, 0, Math.PI * 2);
            this.ctx.fillStyle = `hsla(${(time + i) * 50}, 70%, 60%, 0.6)`;
            this.ctx.fill();
        }
    }
    
    // Detener animación
    stopAnimation() {
        this.isRunning = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
    
    // Obtener color aleatorio
    getRandomColor() {
        const colors = [
            '#ff6b6b', '#4ecdc4', '#45b7d1', '#f7b731', '#5f27cd',
            '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // Limpiar todas las partículas
    clearAllParticles() {
        // Limpiar arrays
        this.particles = [];
        this.hearts = [];
        this.confetti = [];
        this.magic = [];
        
        // Remover elementos DOM
        const particleElements = document.querySelectorAll(
            '.particle, .floating-heart, .confetti-piece, .magic-particle, .star-rain, .bubble, .mouse-trail'
        );
        particleElements.forEach(element => element.remove());
        
        // Limpiar canvas
        if (this.ctx) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }
    
    // Agregar estilos CSS
    addParticleStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes particleFloat {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-20px); }
            }
            
            @keyframes heartFloat {
                0% {
                    transform: translateY(0) scale(1);
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) translateX(var(--end-x, 0)) scale(0.5);
                    opacity: 0;
                }
            }
            
            @keyframes starFall {
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
                    transform: translate(var(--end-x), var(--end-y));
                    opacity: 0;
                }
            }
            
            @keyframes waveExpand {
                0% {
                    width: 20px;
                    height: 20px;
                    opacity: 0.8;
                }
                100% {
                    width: 400px;
                    height: 400px;
                    opacity: 0;
                    transform: translate(-190px, -190px);
                }
            }
            
            @keyframes bubbleFloat {
                0% {
                    transform: translateY(0) scale(1);
                    opacity: 0.8;
                }
                100% {
                    transform: translateY(-100vh) scale(0.5);
                    opacity: 0;
                }
            }
            
            @keyframes trailFade {
                0% {
                    opacity: 1;
                    transform: scale(1);
                }
                100% {
                    opacity: 0;
                    transform: scale(0);
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
            
            @keyframes explode {
                0% {
                    transform: translate(0, 0) scale(1);
                    opacity: 1;
                }
                100% {
                    transform: translate(var(--end-x), var(--end-y)) scale(0);
                    opacity: 0;
                }
            }
            
            @keyframes magicFloat {
                0%, 100% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 0.8;
                }
                50% {
                    transform: translateY(-30px) rotate(180deg);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Destruir sistema
    destroy() {
        this.stopAnimation();
        this.clearAllParticles();
        
        if (this.canvas) {
            this.canvas.remove();
        }
        
        if (this.container) {
            this.container.remove();
        }
    }
}

// Instancia global del sistema de partículas
const particleSystem = new ParticleSystem();

// Funciones globales para compatibilidad
function initializeParticles() {
    particleSystem.addParticleStyles();
    particleSystem.createMouseTrail();
    console.log('✨ Partículas listas para usar');
}

function createParticleSystem() {
    particleSystem.createParticleSystem();
}

function createFloatingHearts() {
    particleSystem.createFloatingHearts();
}

function createStarShower() {
    particleSystem.createStarRain();
}

function createConfetti() {
    particleSystem.createAdvancedConfetti();
}

function createMagicParticles() {
    particleSystem.createMagicParticles();
}

function createFireworks() {
    particleSystem.createFireworks();
}

function createBubbles() {
    particleSystem.createBubbles();
}

function createRippleWaves() {
    particleSystem.createRippleWaves();
}

function createFloatingText(text, x, y) {
    particleSystem.createFloatingText(text, x, y);
}

function clearAllParticles() {
    particleSystem.clearAllParticles();
}

// Inicializar automáticamente
document.addEventListener('DOMContentLoaded', () => {
    initializeParticles();
    
    // Crear algunas partículas iniciales
    setTimeout(() => {
        createParticleSystem();
    }, 1000);
});

// Exportar para uso global
window.ParticleSystem = ParticleSystem;
window.particleSystem = particleSystem;