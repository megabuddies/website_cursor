// Обновленная версия three-animation.js
let scene, camera, renderer;
let particleSystem, pixelBuddy;
let mouseX = 0, mouseY = 0;
let clock = new THREE.Clock();

function initThree() {
    // Создаем сцену
    scene = new THREE.Scene();
    
    // Настраиваем камеру
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Настраиваем рендерер с эффектом пост-обработки
    renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('hero-animation').appendChild(renderer.domElement);
    
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
}

function createPixelBuddy() {
    // Создаем пиксельную геометрию для Buddy
    const geometry = new THREE.BoxGeometry(2, 2, 0.2, 8, 8, 1);
    
    // Загружаем текстуру для пиксельного Buddy
    const textureLoader = new THREE.TextureLoader();
    const buddyTexture = textureLoader.load('images/buddy_texture.png');
    buddyTexture.magFilter = THREE.NearestFilter;
    buddyTexture.minFilter = THREE.NearestFilter;
    
    // Создаем материал с эффектом "глюка"
    const material = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0.0 },
            texture: { value: buddyTexture },
            glitchIntensity: { value: 0.05 },
            glowColor: { value: new THREE.Color(0x00ff41) }
        },
        vertexShader: `
            varying vec2 vUv;
            uniform float time;
            uniform float glitchIntensity;
            
            void main() {
                vUv = uv;
                
                // Добавляем глюк-эффект к вершинам
                vec3 pos = position;
                float glitchFactor = sin(time * 2.0 + position.x * 10.0) * glitchIntensity;
                if (abs(glitchFactor) > 0.9) {
                    pos.x += sin(time * 10.0) * 0.1;
                }
                
                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
        `,
        fragmentShader: `
            varying vec2 vUv;
            uniform float time;
            uniform sampler2D texture;
            uniform float glitchIntensity;
            uniform vec3 glowColor;
            
            void main() {
                // Базовый цвет из текстуры
                vec2 uv = vUv;
                
                // Добавляем случайные смещения для эффекта глюка
                float glitchFactor = sin(time * 5.0) * glitchIntensity;
                if (abs(glitchFactor) > 0.9) {
                    uv.x += sin(time * 50.0 + uv.y * 20.0) * 0.02;
                }
                
                vec4 texColor = texture2D(texture, uv);
                
                // Добавляем эффект свечения
                vec3 finalColor = texColor.rgb;
                if (texColor.a > 0.1) {
                    finalColor += glowColor * 0.3 * (0.5 + 0.5 * sin(time * 2.0));
                }
                
                gl_FragColor = vec4(finalColor, texColor.a);
            }
        `,
        transparent: true
    });
    
    pixelBuddy = new THREE.Mesh(geometry, material);
    scene.add(pixelBuddy);
}

function createParticleSystem() {
    // Создаем систему частиц в стиле MegaETH
    const particleCount = 1000;
    const particles = new THREE.BufferGeometry();
    
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const speeds = new Float32Array(particleCount);
    
    const color1 = new THREE.Color(0x00ff41); // Зеленый
    const color2 = new THREE.Color(0xff3e9a); // Розовый
    
    for (let i = 0; i < particleCount; i++) {
        // Позиции
        positions[i * 3] = (Math.random() - 0.5) * 30;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
        
        // Цвета
        const colorChoice = Math.random();
        let color = colorChoice < 0.7 ? color1 : color2;
        
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
        
        // Размеры
        sizes[i] = Math.random() * 0.15 + 0.05;
        
        // Скорости
        speeds[i] = Math.random() * 0.02 + 0.01;
    }
    
    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    particles.setAttribute('speed', new THREE.BufferAttribute(speeds, 1));
    
    const particleMaterial = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0.0 },
            pixelRatio: { value: window.devicePixelRatio }
        },
        vertexShader: `
            attribute float size;
            attribute float speed;
            varying vec3 vColor;
            uniform float time;
            uniform float pixelRatio;
            
            void main() {
                vColor = color;
                vec3 pos = position;
                
                // Добавляем движение частиц в стиле MegaETH
                pos.y -= mod(time * speed * 5.0 + position.x * 0.1 + position.z * 0.1, 30.0);
                
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
    
    const elapsedTime = clock.getElapsedTime();
    
    // Обновляем время для анимации
    if (particleSystem) {
        particleSystem.material.uniforms.time.value = elapsedTime;
    }
    
    if (pixelBuddy) {
                pixelBuddy.material.uniforms.time.value = elapsedTime;
        pixelBuddy.material.uniforms.glitchIntensity.value = 0.05 + Math.sin(elapsedTime * 0.5) * 0.03;
        
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
        particleSystem.rotation.x += 0.0005;
        particleSystem.rotation.y += 0.0008;
    }
    
    renderer.render(scene, camera);
}

// Инициализация Three.js при загрузке страницы
document.addEventListener('DOMContentLoaded', initThree);

