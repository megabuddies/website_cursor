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
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);
    
    const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    const material = new THREE.MeshPhongMaterial({ 
        color: 0x6e42e5,
        emissive: 0x42f5c5,
        emissiveIntensity: 0.3,
        shininess: 100
    });
    buddyModel = new THREE.Mesh(geometry, material);
    scene.add(buddyModel);
    
    document.addEventListener('mousemove', onDocumentMouseMove);
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
    
    buddyModel.rotation.x += 0.01;
    buddyModel.rotation.y += 0.01;
    
    buddyModel.rotation.x += (mouseY - buddyModel.rotation.x) * 0.05;
    buddyModel.rotation.y += (mouseX - buddyModel.rotation.y) * 0.05;
    
    renderer.render(scene, camera);
}

document.addEventListener('DOMContentLoaded', initThree);
