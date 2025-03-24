// Основной JavaScript файл (main.js)
document.addEventListener('DOMContentLoaded', function() {
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
    const interactiveElements = document.querySelectorAll('a, button, .nft-card');
    
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
    
    // Плавная прокрутка к разделам при нажатии на ссылки навигации
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        });
    });
    
    // Анимация дорожной карты при прокрутке
    const roadmapItems = document.querySelectorAll('.roadmap-item');
    
    function checkRoadmap() {
        roadmapItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (itemTop < windowHeight * 0.8) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', checkRoadmap);
    checkRoadmap(); // Инициализация
});

// Three.js анимация (animations.js)
// Здесь будет код для 3D анимации и интерактивных элементов

let scene, camera, renderer;
let buddyModel;
let mouseX = 0, mouseY = 0;

function initThree() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('hero-animation').appendChild(renderer.domElement);
    
    // Добавление освещения
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);
    
    // Здесь будет код загрузки 3D модели Buddy
    // Для примера создадим простую геометрию
    const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    const material = new THREE.MeshPhongMaterial({ 
        color: 0x6e42e5,
        emissive: 0x42f5c5,
        emissiveIntensity: 0.3,
        shininess: 100
    });
    buddyModel = new THREE.Mesh(geometry, material);
    scene.add(buddyModel);
    
    // Отслеживание движения мыши для интерактивности
    document.addEventListener('mousemove', onDocumentMouseMove);
    
    // Обработка изменения размера окна
    window.addEventListener('resize', onWindowResize);
    
    animate();
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
    
    // Плавное вращение модели в зависимости от положения мыши
    buddyModel.rotation.x += 0.01;
    buddyModel.rotation.y += 0.01;
    
    // Интерактивное движение в зависимости от положения курсора
    buddyModel.rotation.x += (mouseY - buddyModel.rotation.x) * 0.05;
    buddyModel.rotation.y += (mouseX - buddyModel.rotation.y) * 0.05;
    
    renderer.render(scene, camera);
}

// Инициализация Three.js при загрузке страницы
document.addEventListener('DOMContentLoaded', initThree);
