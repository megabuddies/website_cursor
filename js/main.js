document.addEventListener('DOMContentLoaded', function() {
    // Инициализация GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Кастомный курсор
    const cursor = document.querySelector('.custom-cursor');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });
    
    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });
    
    // Увеличение курсора при наведении на интерактивные элементы
    const interactiveElements = document.querySelectorAll('a, button, .nft-card, .filter-btn');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '50px';
            cursor.style.height = '50px';
            cursor.style.mixBlendMode = 'normal';
            cursor.style.backgroundColor = 'rgba(66, 245, 197, 0.3)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.mixBlendMode = 'difference';
            cursor.style.backgroundColor = 'var(--accent-color)';
        });
    });
    
    // Переключение темной/светлой темы
    const toggleButton = document.querySelector('.toggle-mode');
    
    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        
        // Сохраняем предпочтение пользователя
        if (document.body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // Проверяем сохраненную тему
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
    }
    
    // Анимация хедера при прокрутке
    const header = document.querySelector('.main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });
    
    // Мобильное меню
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        mainNav.classList.toggle('active');
    });
    
    // Плавная прокрутка к разделам при нажатии на ссылки навигации
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 100,
                behavior: 'smooth'
            });
            
            // Закрываем мобильное меню при клике на ссылку
            if (mainNav.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                mainNav.classList.remove('active');
            }
        });
    });
    
    // Фильтрация NFT карточек
    const filterButtons = document.querySelectorAll('.filter-btn');
    const nftCards = document.querySelectorAll('.nft-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Удаляем активный класс со всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Добавляем активный класс на нажатую кнопку
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            nftCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-rarity') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Анимация элементов при прокрутке
    const animateOnScroll = (elements, className) => {
        elements.forEach(element => {
            gsap.fromTo(element, 
                { y: 50, opacity: 0 }, 
                {
                    y: 0, 
                    opacity: 1, 
                    duration: 0.8, 
                    scrollTrigger: {
                        trigger: element,
                        start: "top 80%",
                        toggleClass: {targets: element, className: className}
                    }
                }
            );
        });
    };
    
    animateOnScroll(document.querySelectorAll('.about-item'), 'in-view');
    animateOnScroll(document.querySelectorAll('.roadmap-item'), 'in-view');
    animateOnScroll(document.querySelectorAll('.twitter-feed, .discord-community'), 'in-view');
    
    // Параллакс эффект для фоновых элементов
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translate(${x * 30}px, ${y * 30}px)`;
        });
    });
    
    // Анимация для NFT карточек при наведении
    nftCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
    
    // Анимация для дорожной карты
    const roadmapItems = document.querySelectorAll('.roadmap-item');
    
    roadmapItems.forEach((item, index) => {
        const progress = item.querySelector('.progress');
        
        if (progress) {
            gsap.fromTo(progress, 
                { width: '0%' }, 
                {
                    width: progress.style.width,
                    duration: 1.5,
                    delay: index * 0.3,
                    scrollTrigger: {
                        trigger: item,
                        start: "top 80%"
                    }
                }
            );
        }
    });
    
    // Анимация для заголовков секций
    const sectionHeadings = document.querySelectorAll('.section-heading');
    
    sectionHeadings.forEach(heading => {
        gsap.fromTo(heading,
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                scrollTrigger: {
                    trigger: heading,
                    start: "top 80%"
                }
            }
        );
    });
    
    // Анимация для линий под заголовками
    const sectionLines = document.querySelectorAll('.section-line');
    
    sectionLines.forEach(line => {
        gsap.fromTo(line,
            { width: 0, opacity: 0 },
            {
                width: 100,
                opacity: 1,
                duration: 1,
                delay: 0.3,
                scrollTrigger: {
                    trigger: line,
                    start: "top 80%"
                }
            }
        );
    });
    
    // Форма подписки на рассылку
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = newsletterForm.querySelector('input[type="email"]').value;
            
            if (email) {
                // Здесь будет код для отправки email на сервер
                alert('Спасибо за подписку! Мы будем держать вас в курсе последних новостей.');
                newsletterForm.reset();
            }
        });
    }
});
