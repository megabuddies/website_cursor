let scene, camera, renderer;
let buddyModel;
let mouseX = 0, mouseY = 0;
let particleSystem;

function initThree() {
    // Создаем сцену
    scene = new THREE.Scene();
    
    // Настраиваем камеру
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Настраиваем рендерер
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('hero-animation').appendChild(renderer.domElement);
    
    // Добавляем освещение
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);
    
    const pointLight1 = new THREE.PointLight(0x00ff41, 2, 50);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0xff3e9a, 2, 50);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);
    
    // Создаем более "пиксельную" и низкополигональную модель для Buddy
    createBuddyModel();
    
    // Создаем систему частиц
    createParticleSystem();
    
    // Отслеживание движения мыши для интерактивности
    document.addEventListener('mousemove', onDocumentMouseMove);
    
    // Обработка изменения размера окна
    window.addEventListener('resize', onWindowResize);
    
    // Запускаем анимацию
    animate();
}

function createBuddyModel() {
    // Создаем более "пиксельную" и низкополигональную модель
    const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
    
    // Создаем материал с эффектом "глюка"
    const material = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0.0 },
            color1: { value: new THREE.Color(0x00ff41) },
            color2: { value: new THREE.Color(0xff3e9a) }
        },
        vertexShader: `
            varying vec2 vUv;
            uniform float time;
            
            void main() {
                vUv = uv;
                
                // Добавляем глюк-эффект к вершинам
                vec3 pos = position;
                if (sin(time * 2.0 + position.x * 10.0) > 0.9) {
                    pos.x += sin(time) * 0.1;
                }
                
                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
        `,
        fragmentShader: `
            varying vec2 vUv;
            uniform float time;
            uniform vec3 color1;
            uniform vec3 color2;
            
            void main() {
                // Создаем пиксельный эффект
                vec2 pixelatedUV = floor(vUv * 10.0) / 10.0;
                
                // Добавляем шум и глюки
                float noise = fract(sin(dot(pixelatedUV, vec2(12.9898, 78.233))) * 43758.5453);
                float glitch = step(0.97, sin(time * 5.0 + noise * 10.0));
                
                vec3 finalColor = mix(color1, color2, noise);
                if (glitch > 0.0) {
                    finalColor = vec3(1.0) - finalColor;
                }
                
                gl_FragColor = vec4(finalColor, 1.0);
            }
        `
    });
    
    buddyModel = new THREE.Mesh(geometry, material);
    scene.add(buddyModel);
}

function createParticleSystem() {
    // Создаем систему частиц для фона в стиле "матрицы"
    const particleCount = 500;
    const particles = new THREE.BufferGeometry();
    
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    const color1 = new THREE.Color(0x00ff41);
    const color2 = new THREE.Color(0xff3e9a);
    
    for (let i = 0; i < particleCount; i++) {
        // Позиции
        positions[i * 3] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
        
        // Цвета
        const colorChoice = Math.random();
        let color = colorChoice < 0.7 ? color1 : color2;
        
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
        
        // Размеры
        sizes[i] = Math.random() * 0.1 + 0.05;
    }
    
    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    const particleMaterial = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0.0 },
            pixelRatio: { value: window.devicePixelRatio }
        },
        vertexShader: `
            attribute float size;
            varying vec3 vColor;
            uniform float time;
            uniform float pixelRatio;
            
            void main() {
                vColor = color;
                vec3 pos = position;
                
                // Добавляем падающий эффект как в "Матрице"
                pos.y -= mod(time * 0.5 + position.x * 0.1 + position.z * 0.1, 20.0);
                
                vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                gl_PointSize = size * pixelRatio * (300.0 / -mvPosition.z);
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
        fragmentShader: `
            varying vec3 vColor;
            
            void main() {
                // Создаем квадратную точку для пиксельного эффекта
                if (length(gl_PointCoord - vec2(0.5, 0.5)) > 0.475) discard;
                gl_FragColor = vec4(vColor, 1.0);
            }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true
    });
    
    particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);
}

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - window.innerWidth / 2) / 100;
    mouseY = (event.clientY - window.innerHeight / 2) / 100;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Обновляем uniform pixelRatio для частиц
    if (particleSystem) {
        particleSystem.material.uniforms.pixelRatio.value = window.devicePixelRatio;
    }
}

function animate() {
    requestAnimationFrame(animate);
    
    // Обновляем время для анимации
    if (particleSystem) {
        particleSystem.material.uniforms.time.value += 0.01;
    }
    
    if (buddyModel) {
        buddyModel.material.uniforms.time.value += 0.01;
        
        // Вращаем модель Buddy
        buddyModel.rotation.x += 0.005;
        buddyModel.rotation.y += 0.005;
        
        // Интерактивное движение в зависимости от положения курсора
        buddyModel.rotation.x += (mouseY - buddyModel.rotation.x) * 0.05;
        buddyModel.rotation.y += (mouseX - buddyModel.rotation.y) * 0.05;
        
        // Пульсация размера
        const pulseFactor = Math.sin(Date.now() * 0.001) * 0.05 + 1;
        buddyModel.scale.set(pulseFactor, pulseFactor, pulseFactor);
    }
    
    // Вращаем систему частиц
    if (particleSystem) {
        particleSystem.rotation.x += 0.0005;
        particleSystem.rotation.y += 0.0005;
    }
    
    renderer.render(scene, camera);
}

// Инициализация Three.js при загрузке страницы
document.addEventListener('DOMContentLoaded', initThree);
