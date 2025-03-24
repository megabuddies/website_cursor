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
    .from(".about-content .section-heading", {
        y: 50,
        opacity: 0,
        duration: 0.8
    })
    .from(".about-content .section-line", {
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
    
    // Анимация для секции "Коллекция"
    gsap.timeline({
        scrollTrigger: {
            trigger: "#collection",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        }
    })
    .from(".collection-preview .section-heading", {
        y: 50,
        opacity: 0,
        duration: 0.8
    })
    .from(".collection-preview .section-line", {
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
    .from(".roadmap .section-heading", {
        y: 50,
        opacity: 0,
        duration: 0.8
    })
    .from(".roadmap .section-line", {
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
    .from(".community .section-heading", {
        y: 50,
        opacity: 0,
        duration: 0.8
    })
    .from(".community .section-line", {
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
    
    // Параллакс эффект для фоновых элементов
    gsap.utils.toArray('.parallax-element').forEach(element => {
        gsap.to(element, {
            y: -100,
            scrollTrigger: {
                trigger: element.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });
    
    // Анимация для 3D элементов в разных секциях
    const initSection3D = (sectionId, canvasId) => {
        const section = document.getElementById(sectionId);
        const canvas = document.getElementById(canvasId);
        
        if (!section || !canvas) return;
        
        // Здесь будет код для инициализации 3D элементов с использованием Spline или Three.js
        // Это заглушка, так как полная реализация требует дополнительных ресурсов
        console.log(`Initializing 3D for section: ${sectionId}`);
    };
    
    // Инициализация 3D элементов для разных секций
    initSection3D('about', 'about-3d');
    initSection3D('collection', 'collection-3d');
    initSection3D('roadmap', 'roadmap-3d');
    initSection3D('community', 'community-3d');
    
    // Анимация текста с эффектом печатной машинки
    const typewriterElements = document.querySelectorAll('[data-typewriter]');
    
    typewriterElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        
        ScrollTrigger.create({
            trigger: element,
            start: "top 80%",
            onEnter: () => {
                let i = 0;
                const interval = setInterval(() => {
                    element.textContent += text[i];
                    i++;
                    if (i >= text.length) {
                        clearInterval(interval);
                    }
                }, 50);
            },
            once: true
        });
    });
    
    // Эффект появления для изображений
    gsap.utils.toArray('.fade-in-image').forEach(img => {
        gsap.from(img, {
            opacity: 0,
            scale: 0.8,
            duration: 1,
            scrollTrigger: {
                trigger: img,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });
    });
});
