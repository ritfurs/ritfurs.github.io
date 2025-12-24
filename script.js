const splashTexts = [
    "Also try Terraria!",
    "Awesome community!",
    "Now with more fun!",
    "Pixel perfect!",
    "Bringing people together!",
    "Made with love!",
    "Join the adventure!",
    "Furry friendly!",
    "RIT approved!",
    "Block by block!"
];


let motionEnabled = true;


let scene, camera, renderer, sphere;
let rotationSpeed = 0.0005;

let imagesToLoad = 5;
let imagesLoaded = 0;

function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === imagesToLoad) {
       
        document.body.classList.add('loaded');
    }
}


function preloadImages() {
    const images = [
        'stone.png',
        'stone_color.png',
        'dirt.png',
        'title.png',
        'Street View 360.jpg'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.onload = imageLoaded;
        img.onerror = imageLoaded; 
        img.src = src;
    });
}


function initPanorama() {
    const canvas = document.getElementById('panorama');
    

    scene = new THREE.Scene();
    

    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(0, 0, 0);
    
 
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    

    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1); 
    

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('Street View 360.jpg');
    
  
    const material = new THREE.MeshBasicMaterial({ map: texture });
    

    sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    

    window.addEventListener('resize', onWindowResize, false);
    

    animate();
}


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}


function animate() {
    requestAnimationFrame(animate);
    

    if (motionEnabled && sphere) {
        sphere.rotation.y += rotationSpeed;
    }
    
    renderer.render(scene, camera);
}


function setSplashText() {
    const splashElement = document.getElementById('splashText');
    const randomSplash = splashTexts[Math.floor(Math.random() * splashTexts.length)];
    splashElement.textContent = randomSplash;
}


function toggleMotion() {
    motionEnabled = !motionEnabled;
    const button = document.getElementById('motionToggle');
    const splashElement = document.getElementById('splashText');
    
    if (motionEnabled) {
        button.textContent = 'Disable Motion';
        splashElement.classList.remove('motion-disabled');
    } else {
        button.textContent = 'Enable Motion';
        splashElement.classList.add('motion-disabled');
    }
}


function showInfoPage(pageId) {
    const page = document.getElementById(pageId);
    page.classList.add('active');
}


function hideInfoPage(pageId) {
    const page = document.getElementById(pageId);
    page.classList.remove('active');
}


document.addEventListener('DOMContentLoaded', () => {

    preloadImages();
    
    setSplashText();
    initPanorama();
    

    const motionToggle = document.getElementById('motionToggle');
    motionToggle.addEventListener('click', toggleMotion);
    

    const aboutBtn = document.getElementById('aboutBtn');
    aboutBtn.addEventListener('click', () => showInfoPage('aboutPage'));
    

    const creditsBtn = document.getElementById('creditsBtn');
    creditsBtn.addEventListener('click', () => showInfoPage('creditsPage'));
    

    const aboutBackBtn = document.getElementById('aboutBackBtn');
    aboutBackBtn.addEventListener('click', () => hideInfoPage('aboutPage'));
    
    const creditsBackBtn = document.getElementById('creditsBackBtn');
    creditsBackBtn.addEventListener('click', () => hideInfoPage('creditsPage'));
});