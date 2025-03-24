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
    
    const pointLight1 = new THREE.PointLight(0x6e42e5, 2, 50);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0xff3e9a, 2, 50);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);
    
    // Создаем геометрию для Buddy
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
    // Создаем сложную геометрию для Buddy
    const geometry = new THREE.TorusKnotGeometry(1, 0.3, 128, 32, 2, 3);
    
    // Создаем материал с градиентом и свечением
    const material = new THREE.MeshPhongMaterial({ 
        color: 0x6e42e5,
        emissive: 0x42f5c5,
        emissiveIntensity: 0.3,
        shininess: 100,
        specular: 0xffffff
    });
    
    buddyModel = new THREE.Mesh(geometry, material);
    scene.add(buddyModel);
    
    // Добавляем ореол вокруг модели
    const glowMaterial = new THREE.ShaderMaterial({
        uniforms: {
            "c": { type: "f", value: 0.1 },
            "p": { type: "f", value: 3.0 },
            glowColor: { type: "c", value: new THREE.Color(0x42f5c5) },
            viewVector: { type: "v3", value: camera.position }
        },
        vertexShader: `
            uniform vec3 viewVector;
            uniform float c;
            uniform float p;
            varying float intensity;
            void main() {
                vec3 vNormal = normalize(normalMatrix * normal);
                vec3 vNormel = normalize(normalMatrix * viewVector);
                intensity = pow(c - dot(vNormal, vNormel), p);
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform vec3 glowColor;
            varying float intensity;
            void main() {
                vec3 glow = glowColor * intensity;
                gl_FragColor = vec4(glow, 1.0);
            }
        `,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true
    });
    
    const glowGeometry = new THREE.TorusKnotGeometry(1.2, 0.5, 128, 32, 2, 3);
    const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glowMesh);
}

function createParticleSystem() {
    // Создаем систему частиц для фона
    const particleCount = 1000;
    const particles = new THREE.BufferGeometry();
    
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    const color1 = new THREE.Color(0x6e42e5);
    const color2 = new THREE.Color(0xff3e9a);
    const color3 = new THREE.Color(0x42f5c5);
    
    for (let i = 0; i < particleCount; i++) {
        // Позиции
        positions[i * 3] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
        
        // Цвета
        const colorChoice = Math.random();
        let color;
        
        if (colorChoice < 0.33) {
            color = color1;
        } else if (colorChoice < 0.66) {
            color = color2;
        } else {
            color = color3;
        }
        
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
                
                // Доб
