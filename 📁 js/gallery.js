// gallery.js - Sistema completo de galería de fotos dinámico
class PhotoGallery {
    constructor() {
        this.photos = [];
        this.currentIndex = 0;
        this.isModalOpen = false;
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.init();
    }
    
    init() {
        this.setupPhotoData();
        this.createGalleryElements();
        this.setupEventListeners();
        console.log('📸 Galería de fotos inicializada');
    }
    
    // Configurar datos de fotos
    setupPhotoData() {
        this.photos = [
            {
                src: 'images/mom-photo.jpg',
                title: 'Mi Mamá Hermosa',
                description: 'La sonrisa más bonita del mundo',
                date: '2024',
                category: 'portrait'
            },
            {
                src: 'images/family-photo.jpg',
                title: 'Familia Unida',
                description: 'Momentos especiales en familia',
                date: '2023',
                category: 'family'
            },
            {
                src: 'images/memories-1.jpg',
                title: 'Recuerdos de Navidad',
                description: 'Celebrando juntos las fiestas',
                date: '2023',
                category: 'celebration'
            },
            {
                src: 'images/memories-2.jpg',
                title: 'Día de la Madre',
                description: 'Un día especial para ti',
                date: '2024',
                category: 'celebration'
            },
            {
                src: 'images/cooking.jpg',
                title: 'Cocinando Juntos',
                description: 'Aprendiendo tus recetas favoritas',
                date: '2023',
                category: 'activities'
            },
            {
                src: 'images/vacation.jpg',
                title: 'Vacaciones en la Playa',
                description: 'Momentos de descanso y diversión',
                date: '2024',
                category: 'travel'
            },
            {
                src: 'images/graduation.jpg',
                title: 'Mi Graduación',
                description: 'Orgullosa de mis logros',
                date: '2022',
                category: 'milestone'
            },
            {
                src: 'images/birthday-last.jpg',
                title: 'Cumpleaños Pasado',
                description: 'Celebrando otro año de vida',
                date: '2023',
                category: 'celebration'
            }
        ];
    }
    
    // Crear elementos de la galería
    createGalleryElements() {
        const gallery = document.getElementById('photo-gallery');
        if (!gallery) return;
        
        gallery.innerHTML = ''; // Limpiar galería existente
        
        this.photos.forEach((photo, index) => {
            const photoItem = this.createPhotoItem(photo, index);
            gallery.appendChild(photoItem);
        });
        
        this.createModal();
        this.addGalleryStyles();
    }
    
    // Crear elemento individual de foto
    createPhotoItem(photo, index) {
        const item = document.createElement('div');
        item.className = 'photo-item';
        item.dataset.index = index;
        item.dataset.category = photo.category;
        item.style.animationDelay = `${index * 0.1}s`;
        
        // Crear imagen placeholder si no existe
        const placeholderSvg = this.createPlaceholderImage(photo.title);
        
        item.innerHTML = `
            <div class="photo-wrapper">
                <img src="${photo.src}" 
                     alt="${photo.title}" 
                     onerror="this.src='${placeholderSvg}'">
                <div class="photo-overlay">
                    <div class="photo-info">
                        <h4>${photo.title}</h4>
                        <p>${photo.description}</p>
                        <span class="photo-date">${photo.date}</span>
                    </div>
                    <div class="photo-actions">
                        <button class="view-btn" title="Ver imagen">👁️</button>
                        <button class="like-btn" title="Me gusta">❤️</button>
                        <button class="share-btn" title="Compartir">📤</button>
                    </div>
                </div>
            </div>
        `;
        
        // Configurar eventos
        this.setupPhotoEvents(item, index);
        
        return item;
    }
    
    // Crear imagen placeholder
    createPlaceholderImage(title) {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f7b731', '#5f27cd'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200">
            <rect width="300" height="200" fill="${randomColor}"/>
            <text x="150" y="90" text-anchor="middle" fill="white" font-family="Arial" font-size="16" font-weight="bold">${title}</text>
            <text x="150" y="120" text-anchor="middle" fill="white" font-family="Arial" font-size="12">💕 Para Mamá 💕</text>
        </svg>`;
    }
    
    // Configurar eventos para cada foto
    setupPhotoEvents(item, index) {
        const img = item.querySelector('img');
        const viewBtn = item.querySelector('.view-btn');
        const likeBtn = item.querySelector('.like-btn');
        const shareBtn = item.querySelector('.share-btn');
        
        // Efecto hover
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-10px) scale(1.02)';
            item.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
            item.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        });
        
        // Click en imagen para abrir modal
        img.addEventListener('click', () => {
            this.openModal(index);
        });
        
        // Botón ver
        viewBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.openModal(index);
        });
        
        // Botón like
        likeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleLike(item, index);
        });
        
        // Botón compartir
        shareBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.sharePhoto(index);
        });
    }
    
    // Crear modal para vista ampliada
    createModal() {
        const modal = document.createElement('div');
        modal.id = 'photo-modal';
        modal.className = 'photo-modal';
        modal.innerHTML = `
            <div class="modal-backdrop"></div>
            <div class="modal-content">
                <button class="modal-close">✕</button>
                <button class="modal-prev">‹</button>
                <button class="modal-next">›</button>
                <div class="modal-image-container">
                    <img id="modal-image" src="" alt="">
                </div>
                <div class="modal-info">
                    <h3 id="modal-title"></h3>
                    <p id="modal-description"></p>
                    <div class="modal-meta">
                        <span id="modal-date"></span>
                        <span id="modal-counter"></span>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        this.setupModalEvents();
    }
    
    // Configurar eventos del modal
    setupModalEvents() {
        const modal = document.getElementById('photo-modal');
        const closeBtn = modal.querySelector('.modal-close');
        const prevBtn = modal.querySelector('.modal-prev');
        const nextBtn = modal.querySelector('.modal-next');
        const backdrop = modal.querySelector('.modal-backdrop');
        
        // Cerrar modal
        closeBtn.addEventListener('click', () => this.closeModal());
        backdrop.addEventListener('click', () => this.closeModal());
        
        // Navegación
        prevBtn.addEventListener('click', () => this.previousPhoto());
        nextBtn.addEventListener('click', () => this.nextPhoto());
        
        // Eventos de teclado
        document.addEventListener('keydown', (e) => {
            if (!this.isModalOpen) return;
            
            switch(e.key) {
                case 'Escape':
                    this.closeModal();
                    break;
                case 'ArrowLeft':
                    this.previousPhoto();
                    break;
                case 'ArrowRight':
                    this.nextPhoto();
                    break;
            }
        });
        
        // Eventos touch para móvil
        const modalContent = modal.querySelector('.modal-content');
        modalContent.addEventListener('touchstart', (e) => {
            this.touchStartX = e.touches[0].clientX;
        });
        
        modalContent.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].clientX;
            this.handleSwipe();
        });
    }
    
    // Manejar swipe en móvil
    handleSwipe() {
        const swipeThreshold = 50;
        const diff = this.touchStartX - this.touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.nextPhoto();
            } else {
                this.previousPhoto();
            }
        }
    }
    
    // Abrir modal
    openModal(index) {
        this.currentIndex = index;
        this.isModalOpen = true;
        
        const modal = document.getElementById('photo-modal');
        const modalImage = document.getElementById('modal-image');
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.getElementById('modal-description');
        const modalDate = document.getElementById('modal-date');
        const modalCounter = document.getElementById('modal-counter');
        
        const photo = this.photos[index];
        
        modalImage.src = photo.src;
        modalImage.alt = photo.title;
        modalTitle.textContent = photo.title;
        modalDescription.textContent = photo.description;
        modalDate.textContent = photo.date;
        modalCounter.textContent = `${index + 1} / ${this.photos.length}`;
        
        // Mostrar modal con animación
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        
        // Bloquear scroll del body
        document.body.style.overflow = 'hidden';
    }
    
    // Cerrar modal
    closeModal() {
        const modal = document.getElementById('photo-modal');
        modal.classList.remove('active');
        
        setTimeout(() => {
            modal.style.display = 'none';
            this.isModalOpen = false;
            document.body.style.overflow = '';
        }, 300);
    }
    
    // Foto anterior
    previousPhoto() {
        this.currentIndex = (this.currentIndex - 1 + this.photos.length) % this.photos.length;
        this.updateModalContent();
    }
    
    // Foto siguiente
    nextPhoto() {
        this.currentIndex = (this.currentIndex + 1) % this.photos.length;
        this.updateModalContent();
    }
    
    // Actualizar contenido del modal
    updateModalContent() {
        const modalImage = document.getElementById('modal-image');
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.getElementById('modal-description');
        const modalDate = document.getElementById('modal-date');
        const modalCounter = document.getElementById('modal-counter');
        
        const photo = this.photos[this.currentIndex];
        
        // Animación de cambio
        modalImage.style.opacity = '0';
        setTimeout(() => {
            modalImage.src = photo.src;
            modalImage.alt = photo.title;
            modalTitle.textContent = photo.title;
            modalDescription.textContent = photo.description;
            modalDate.textContent = photo.date;
            modalCounter.textContent = `${this.currentIndex + 1} / ${this.photos.length}`;
            modalImage.style.opacity = '1';
        }, 150);
    }
    
    // Toggle like en foto
    toggleLike(item, index) {
        const likeBtn = item.querySelector('.like-btn');
        const isLiked = likeBtn.classList.contains('liked');
        
        if (isLiked) {
            likeBtn.classList.remove('liked');
            likeBtn.style.transform = 'scale(0.8)';
            this.createFloatingIcon('💔', item);
        } else {
            likeBtn.classList.add('liked');
            likeBtn.style.transform = 'scale(1.2)';
            this.createFloatingIcon('❤️', item);
        }
        
        setTimeout(() => {
            likeBtn.style.transform = 'scale(1)';
        }, 200);
    }
    
    // Compartir foto
    sharePhoto(index) {
        const photo = this.photos[index];
        
        if (navigator.share) {
            navigator.share({
                title: photo.title,
                text: photo.description,
                url: window.location.href
            });
        } else {
            // Fallback para navegadores sin soporte
            const shareText = `${photo.title}: ${photo.description}`;
            navigator.clipboard.writeText(shareText).then(() => {
                this.showNotification('¡Copiado al portapapeles!');
            });
        }
    }
    
    // Crear icono flotante
    createFloatingIcon(icon, item) {
        const floatingIcon = document.createElement('div');
        floatingIcon.innerHTML = icon;
        floatingIcon.className = 'floating-icon';
        floatingIcon.style.cssText = `
            position: absolute;
            font-size: 2rem;
            pointer-events: none;
            z-index: 1000;
            animation: floatUp 1s ease-out forwards;
        `;
        
        item.appendChild(floatingIcon);
        
        setTimeout(() => {
            floatingIcon.remove();
        }, 1000);
    }
    
    // Mostrar notificación
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4ecdc4;
            color: white;
            padding: 15px 25px;
            border-radius: 25px;
            z-index: 10000;
            font-weight: bold;
            animation: slideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in forwards';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // Configurar eventos principales
    setupEventListeners() {
        // Redimensionamiento de ventana
        window.addEventListener('resize', () => {
            this.adjustGalleryLayout();
        });
        
        // Filtros de categoría (si existen)
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.filterByCategory(btn.dataset.category);
            });
        });
    }
    
    // Filtrar por categoría
    filterByCategory(category) {
        const photoItems = document.querySelectorAll('.photo-item');
        
        photoItems.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s ease-out';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    // Ajustar layout de galería
    adjustGalleryLayout() {
        const gallery = document.getElementById('photo-gallery');
        const width = window.innerWidth;
        
        if (width < 480) {
            gallery.style.gridTemplateColumns = 'repeat(1, 1fr)';
        } else if (width < 768) {
            gallery.style.gridTemplateColumns = 'repeat(2, 1fr)';
        } else {
            gallery.style.gridTemplateColumns = 'repeat(auto-fit, minmax(250px, 1fr))';
        }
    }
    
    // Agregar estilos CSS
    addGalleryStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .photo-item {
                position: relative;
                transition: all 0.3s ease;
                animation: fadeInUp 0.6s ease-out;
            }
            
            .photo-wrapper {
                position: relative;
                overflow: hidden;
                border-radius: 15px;
                background: white;
                box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            }
            
            .photo-overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.8));
                opacity: 0;
                transition: opacity 0.3s ease;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                padding: 20px;
            }
            
            .photo-item:hover .photo-overlay {
                opacity: 1;
            }
            
            .photo-info {
                color: white;
                text-align: center;
            }
            
            .photo-info h4 {
                margin: 0 0 10px 0;
                font-size: 1.2rem;
            }
            
            .photo-info p {
                margin: 0 0 5px 0;
                font-size: 0.9rem;
            }
            
            .photo-date {
                font-size: 0.8rem;
                opacity: 0.8;
            }
            
            .photo-actions {
                display: flex;
                justify-content: center;
                gap: 10px;
            }
            
            .photo-actions button {
                background: rgba(255,255,255,0.2);
                border: none;
                padding: 8px 12px;
                border-radius: 20px;
                cursor: pointer;
                font-size: 1rem;
                transition: all 0.3s ease;
            }
            
            .photo-actions button:hover {
                background: rgba(255,255,255,0.3);
                transform: scale(1.1);
            }
            
            .like-btn.liked {
                background: #ff6b6b;
                color: white;
            }
            
            .photo-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 9999;
                display: none;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .photo-modal.active {
                opacity: 1;
            }
            
            .modal-backdrop {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.9);
            }
            
            .modal-content {
                position: relative;
                max-width: 90%;
                max-height: 90%;
                background: white;
                border-radius: 20px;
                overflow: hidden;
                display: flex;
                flex-direction: column;
            }
            
            .modal-close {
                position: absolute;
                top: 20px;
                right: 20px;
                background: rgba(0,0,0,0.5);
                color: white;
                border: none;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                font-size: 1.5rem;
                cursor: pointer;
                z-index: 10;
            }
            
            .modal-prev, .modal-next {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                background: rgba(0,0,0,0.5);
                color: white;
                border: none;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                font-size: 2rem;
                cursor: pointer;
                z-index: 10;
            }
            
            .modal-prev {
                left: 20px;
            }
            
            .modal-next {
                right: 20px;
            }
            
            .modal-image-container {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
            }
            
            #modal-image {
                max-width: 100%;
                max-height: 100%;
                object-fit: contain;
                transition: opacity 0.3s ease;
            }
            
            .modal-info {
                padding: 20px;
                background: #f8f9fa;
                text-align: center;
            }
            
            .modal-meta {
                display: flex;
                justify-content: space-between;
                margin-top: 10px;
                color: #666;
                font-size: 0.9rem;
            }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes floatUp {
                from {
                    transform: translateY(0);
                    opacity: 1;
                }
                to {
                    transform: translateY(-50px);
                    opacity: 0;
                }
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Función global para inicializar galería
function initializeGallery() {
    const gallery = new PhotoGallery();
    window.photoGallery = gallery;
    return gallery;
}

// Función para agregar nueva foto
function addPhoto(photoData) {
    if (window.photoGallery) {
        window.photoGallery.photos.push(photoData);
        window.photoGallery.createGalleryElements();
    }
}

// Exportar para uso global
window.PhotoGallery = PhotoGallery;
window.initializeGallery = initializeGallery;