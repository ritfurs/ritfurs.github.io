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

document.addEventListener('DOMContentLoaded', () => {
    setSplashText();
    initPanorama();
    
    const motionToggle = document.getElementById('motionToggle');
    motionToggle.addEventListener('click', toggleMotion);
});