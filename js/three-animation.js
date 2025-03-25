// Обновленная версия three-animation.js
let scene, camera, renderer;
let particleSystem, pixelBuddy;
let mouseX = 0, mouseY = 0;
let clock = new THREE.Clock();

function initThree() {
    // Предварительная загрузка ресурсов
    const loadingManager = new THREE.LoadingManager();
    loadingManager.onLoad = function() {
        try {
            // Создаем сцену
            scene = new THREE.Scene();
            
            // Настраиваем камеру
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 2;
            
            // Настраиваем рендерер с эффектом пост-обработки
            renderer = new THREE.WebGLRenderer({ 
                alpha: true, 
                antialias: true,
                powerPreference: "high-performance"
            });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            document.getElementById('hero').appendChild(renderer.domElement);
            
            // Добавляем освещение
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
            scene.add(ambientLight);
            
            const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
            directionalLight.position.set(10, 10, 10);
            scene.add(directionalLight);
            
            // Создаем пиксельного Buddy
            createPixelBuddy();
            
            // Создаем систему частиц в стиле MegaETH
            createParticleSystem();
            
            // Отслеживание движения мыши для интерактивности
            document.addEventListener('mousemove', onDocumentMouseMove);
            
            // Обработка изменения размера окна
            window.addEventListener('resize', onWindowResize);
            
            // Запускаем анимацию
            animate();
        } catch (error) {
            console.error("Ошибка инициализации Three.js:", error);
            createFallbackAnimation();
        }
    };
    
    loadingManager.onError = function(url) {
        console.error("Ошибка загрузки ресурса:", url);
        createFallbackAnimation();
    };
    
    // Загружаем необходимые ресурсы
    loadingManager.itemStart();
    loadingManager.itemEnd();
}

function createPixelBuddy() {
    // Создаем пиксельную геометрию для Buddy
    const geometry = new THREE.BoxGeometry(2, 2, 0.2, 8, 8, 1);
    
    // Создаем базовый материал вместо шейдерного материала
    const material = new THREE.MeshBasicMaterial({
        color: 0x00ff41,
        wireframe: true,
        transparent: true,
        opacity: 0.8
    });
    
    pixelBuddy = new THREE.Mesh(geometry, material);
    scene.add(pixelBuddy);
    
    // Добавляем свечение
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ff41,
        transparent: true,
        opacity: 0.3
    });
    
    const glowMesh = new THREE.Mesh(geometry.clone(), glowMaterial);
    glowMesh.scale.set(1.1, 1.1, 1.1);
    pixelBuddy.add(glowMesh);
}

function createParticleSystem() {
    // Создаем систему частиц в стиле MegaETH
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 5;
    }
    
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.005,
        color: '#ff00ff',
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleSystem);
}

function createFallbackAnimation() {
    // Создаем простую анимацию без WebGL
    const heroSection = document.getElementById('hero');
    heroSection.style.background = 'radial-gradient(circle at center, rgba(0, 255, 65, 0.2) 0%, transparent 70%)';
    
    // Добавляем несколько "звезд"
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.style.position = 'absolute';
        star.style.width = '2px';
        star.style.height = '2px';
        star.style.backgroundColor = Math.random() > 0.7 ? '#ff3e9a' : '#00ff41';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.opacity = Math.random() * 0.7 + 0.3;
        star.style.boxShadow = '0 0 10px currentColor';
        star.style.borderRadius = '50%';
        
        // Добавляем анимацию мерцания
        star.style.animation = `starBlink ${Math.random() * 3 + 2}s infinite alternate`;
        
        heroSection.appendChild(star);
    }
    
    // Добавляем стили анимации
    const style = document.createElement('style');
    style.textContent = `
        @keyframes starBlink {
            0% { opacity: 0.3; }
            100% { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - window.innerWidth / 2) / 100;
    mouseY = (event.clientY - window.innerHeight / 2) / 100;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    
    const elapsedTime = clock.getElapsedTime();
    
    if (pixelBuddy) {
        // Вращаем модель Buddy
        pixelBuddy.rotation.x += 0.005;
        pixelBuddy.rotation.y += 0.01;
        
        // Интерактивное движение в зависимости от положения курсора
        pixelBuddy.rotation.x += (mouseY - pixelBuddy.rotation.x * 0.1) * 0.02;
        pixelBuddy.rotation.y += (mouseX - pixelBuddy.rotation.y * 0.1) * 0.02;
        
        // Пульсация размера
        const pulseFactor = Math.sin(elapsedTime * 2) * 0.05 + 1;
        pixelBuddy.scale.set(pulseFactor, pulseFactor, pulseFactor);
    }
    
    // Вращаем систему частиц
    if (particleSystem) {
        particleSystem.rotation.y += 0.001;
        particleSystem.rotation.x += 0.0005;
    }
    
    renderer.render(scene, camera);
}

// Инициализация Three.js при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    try {
        initThree();
    } catch (error) {
        console.error("Ошибка инициализации Three.js:", error);
        createFallbackAnimation();
    }
});
