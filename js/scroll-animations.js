document.addEventListener('DOMContentLoaded', function() {
    // Инициализация GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Устанавливаем начальные состояния для всех секций
    gsap.set(['#manifesto', '#collection', '#roadmap'], {
        opacity: 1,
        visibility: 'visible',
        display: 'block'
    });
    
    // Анимация для секции "О проекте"
    gsap.timeline({
        scrollTrigger: {
            trigger: "#about",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none"
        }
    })
    .from("#about .section-heading", {
        y: 50,
        opacity: 0,
        duration: 0.8
    })
    .from("#about .section-line", {
        width: 0,
        opacity: 0,
        duration: 0.5
    }, "-=0.3")
    .from(".about-item", {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8
    }, "-=0.2");
    
    // Анимация для секции манифеста
    gsap.timeline({
        scrollTrigger: {
            trigger: '#manifesto',
            start: 'top center',
            toggleActions: 'play none none none',
            once: true
        }
    })
    .from('#manifesto .terminal-container', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power2.out',
        clearProps: 'all'
    })
    .from('#manifesto .terminal-content', {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power2.out',
        clearProps: 'all'
    }, '-=0.5')
    .from('#manifesto .terminal-line', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        clearProps: 'all'
    }, '-=0.3');
    
    // Анимация для секции коллекции
    gsap.timeline({
        scrollTrigger: {
            trigger: '#collection',
            start: 'top center',
            toggleActions: 'play none none none',
            once: true
        }
    })
    .from('#collection .nft-card', {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out',
        clearProps: 'all'
    })
    .from('#collection .nft-card .nft-image', {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out',
        clearProps: 'all'
    }, '-=0.5')
    .from('#collection .nft-card .nft-info', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        clearProps: 'all'
    }, '-=0.3');
    
    // Анимация для секции дорожной карты
    gsap.timeline({
        scrollTrigger: {
            trigger: '#roadmap',
            start: 'top center',
            toggleActions: 'play none none none',
            once: true
        }
    })
    .from('#roadmap .roadmap-item', {
        opacity: 0,
        x: -50,
        duration: 1,
        stagger: 0.3,
        ease: 'power2.out',
        clearProps: 'all'
    })
    .from('#roadmap .roadmap-content', {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.3,
        ease: 'power2.out',
        clearProps: 'all'
    }, '-=0.5')
    .from('#roadmap .roadmap-item .roadmap-icon', {
        opacity: 0,
        scale: 0,
        duration: 0.8,
        stagger: 0.3,
        ease: 'back.out(1.7)',
        clearProps: 'all'
    }, '-=0.3');
    
    // Анимация для секции "Сообщество"
    gsap.timeline({
        scrollTrigger: {
            trigger: "#community",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none"
        }
    })
    .from("#community .section-heading", {
        y: 50,
        opacity: 0,
        duration: 0.8
    })
    .from("#community .section-line", {
        width: 0,
        opacity: 0,
        duration: 0.5
    }, "-=0.3")
    .from(".twitter-feed", {
        x: -50,
        opacity: 0,
        duration: 0.8
    }, "-=0.2")
    .from(".discord-community", {
        x: 50,
        opacity: 0,
        duration: 0.8
    }, "-=0.8");
    
    // Анимация для секции "Подписка"
    gsap.timeline({
        scrollTrigger: {
            trigger: ".newsletter",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none"
        }
    })
    .from(".newsletter .section-heading", {
        y: 50,
        opacity: 0,
        duration: 0.8
    })
    .from(".newsletter .section-line", {
        width: 0,
        opacity: 0,
        duration: 0.5
    }, "-=0.3")
    .from(".newsletter-content p", {
        y: 30,
        opacity: 0,
        duration: 0.5
    }, "-=0.2")
    .from(".newsletter-form", {
        y: 30,
        opacity: 0,
        duration: 0.5
    }, "-=0.2");
    
    // Эффект появления для терминальных текстов
    const terminalTexts = document.querySelectorAll('.terminal-text');
    
    terminalTexts.forEach((text, index) => {
        const originalText = text.textContent;
        text.textContent = '';
        
        ScrollTrigger.create({
            trigger: text,
            start: "top 90%",
            onEnter: () => {
                let i = 0;
                const typeInterval = setInterval(() => {
                    if (i < originalText.length) {
                        text.textContent += originalText.charAt(i);
                        i++;
                    } else {
                        clearInterval(typeInterval);
                    }
                }, 20);
            },
            once: true
        });
    });
    
    // Добавление случайных глюков к элементам
    function addRandomGlitches() {
        const glitchElements = document.querySelectorAll('.glitch-effect');
        
        glitchElements.forEach(element => {
            if (Math.random() > 0.95) {
                element.classList.add('active-glitch');
                setTimeout(() => {
                    element.classList.remove('active-glitch');
                }, 200);
            }
        });
        
        requestAnimationFrame(addRandomGlitches);
    }
    
    addRandomGlitches();
    
    // Добавляем эффект активации для элементов при скролле
    const animElements = document.querySelectorAll('.terminal-container, .nft-card, .roadmap-item');
    
    animElements.forEach(element => {
        ScrollTrigger.create({
            trigger: element,
            start: "top 85%",
            onEnter: () => {
                element.classList.add('active');
            },
            once: true
        });
    });
    
    // Параллакс эффект для фона
    gsap.to("#hero-animation", {
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        },
        y: 100,
        opacity: 0.5,
        ease: "none"
    });

    // Stars animation
    function createStars() {
        const starsContainer = document.getElementById('stars');
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.cssText = `
                position: absolute;
                width: ${Math.random() * 3}px;
                height: ${Math.random() * 3}px;
                background: white;
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: twinkle ${Math.random() * 3 + 2}s infinite;
            `;
            starsContainer.appendChild(star);
        }
    }

    // Hero section animation
    gsap.from('.hero-content', {
        duration: 1.5,
        y: 100,
        opacity: 0,
        ease: 'power4.out'
    });

    // Manifest section animation
    gsap.from('.terminal-container', {
        scrollTrigger: {
            trigger: '.terminal-container',
            start: 'top center',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
    });

    // Collection section animation
    gsap.from('.nft-grid', {
        scrollTrigger: {
            trigger: '.nft-grid',
            start: 'top center',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
    });

    // Roadmap section animation
    gsap.from('.roadmap-item', {
        scrollTrigger: {
            trigger: '.roadmap-container',
            start: 'top center',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out'
    });

    // Community section animation
    gsap.from('.newsletter-container', {
        scrollTrigger: {
            trigger: '.newsletter-container',
            start: 'top center',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
    });

    // Button hover effects
    document.querySelectorAll('.hero-button, .community-button').forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                duration: 0.3,
                scale: 1.05,
                ease: 'power2.out'
            });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                duration: 0.3,
                scale: 1,
                ease: 'power2.out'
            });
        });
    });

    // Initialize stars animation
    createStars();

    // Add CSS for star animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes twinkle {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
});

