document.addEventListener('DOMContentLoaded', function() {
    // Инициализация GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Анимация для секции "О проекте"
    gsap.timeline({
        scrollTrigger: {
            trigger: "#about",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
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
    
    // Анимация для секции "Манифест"
    gsap.timeline({
        scrollTrigger: {
            trigger: "#manifesto",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        }
    })
    .from("#manifesto .section-heading", {
        y: 50,
        opacity: 0,
        duration: 0.8
    })
    .from("#manifesto .section-line", {
        width: 0,
        opacity: 0,
        duration: 0.5
    }, "-=0.3")
    .from(".terminal-container", {
        y: 30,
        opacity: 0,
        duration: 0.8
    }, "-=0.2");
    
    // Анимация для секции "Коллекция"
    gsap.timeline({
        scrollTrigger: {
            trigger: "#collection",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        }
    })
    .from("#collection .section-heading", {
        y: 50,
        opacity: 0,
        duration: 0.8
    })
    .from("#collection .section-line", {
        width: 0,
        opacity: 0,
        duration: 0.5
    }, "-=0.3")
    .from(".filter-btn", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5
    }, "-=0.2")
    .from(".nft-card", {
        x: 100,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8
    }, "-=0.3");
    
    // Анимация для секции "Дорожная карта"
    gsap.timeline({
        scrollTrigger: {
            trigger: "#roadmap",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        }
    })
    .from("#roadmap .section-heading", {
        y: 50,
        opacity: 0,
        duration: 0.8
    })
    .from("#roadmap .section-line", {
        width: 0,
        opacity: 0,
        duration: 0.5
    }, "-=0.3")
    .from(".roadmap-item", {
        y: 50,
        opacity: 0,
        stagger: 0.3,
        duration: 0.8
    }, "-=0.2");
    
    // Анимация для секции "Сообщество"
    gsap.timeline({
        scrollTrigger: {
            trigger: "#community",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
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
            toggleActions: "play none none reverse"
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
    const animElements = document.querySelectorAll('.neon-glow, .terminal-container, .nft-card, .roadmap-item');
    
    animElements.forEach(element => {
        ScrollTrigger.create({
            trigger: element,
            start: "top 85%",
            onEnter: () => {
                element.classList.add('active');
            },
            onLeaveBack: () => {
                element.classList.remove('active');
            }
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
});

