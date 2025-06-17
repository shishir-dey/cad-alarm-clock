// Import Three.js modules
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Three.js setup
let scene, camera, renderer, controls;
let model;

function init() {
  const container = document.getElementById('threejs-container');
  const loading = document.getElementById('loading');

  // Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf8f9fa);

  // Camera
  const aspect = container.clientWidth / container.clientHeight;
  camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
  camera.position.set(1, 1, 1);

  // Renderer
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  container.appendChild(renderer.domElement);

  // Controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1;
  controls.enableZoom = true;
  controls.enablePan = false;
  controls.minDistance = 0.5;
  controls.maxDistance = 10;

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1.0);
  directionalLight1.position.set(2, 2, 2);
  directionalLight1.castShadow = true;
  scene.add(directionalLight1);

  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.6);
  directionalLight2.position.set(-2, -1, -2);
  scene.add(directionalLight2);

  const directionalLight3 = new THREE.DirectionalLight(0xffffff, 0.4);
  directionalLight3.position.set(0, -2, 1);
  scene.add(directionalLight3);

  // Load GLTF model
  const loader = new GLTFLoader();
  loader.load(
    './models/cad-alarm-clock.gltf',
    function (gltf) {
      model = gltf.scene;

      // Center and scale model
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());

      // Scale to fit viewport
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 1.5 / maxDim;
      model.scale.setScalar(scale);

      // Center the model
      model.position.sub(center.multiplyScalar(scale));

      // Apply light gray material and enable shadows
      model.traverse(function (child) {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;

          // Apply light gray color to materials
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach(mat => {
                mat.color.setHex(0x808080); // Light gray
                mat.metalness = 0.3;
                mat.roughness = 0.7;
              });
            } else {
              child.material.color.setHex(0x808080); // Light gray
              child.material.metalness = 0.3;
              child.material.roughness = 0.7;
            }
          }
        }
      });

      scene.add(model);
      loading.style.display = 'none';

      // Fit camera to model bounds
      fitCameraToModel(model);
    },
    function (progress) {
      const percent = Math.round((progress.loaded / progress.total) * 100);
      loading.textContent = `Loading 3D model... ${percent}%`;
    },
    function (error) {
      console.error('Error loading model:', error);
      loading.textContent = 'Error loading 3D model';
    }
  );

  // Handle window resize
  window.addEventListener('resize', onWindowResize);

  // Start animation loop
  animate();
}

function fitCameraToModel(model) {
  const box = new THREE.Box3().setFromObject(model);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());

  // Get the max side of the bounding box
  const maxDim = Math.max(size.x, size.y, size.z);
  const fov = camera.fov * (Math.PI / 180);
  let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));

  // Apply some padding
  cameraZ *= 1.5;

  // Set camera position
  const direction = new THREE.Vector3(1, 0.5, 1).normalize();
  camera.position.copy(direction.multiplyScalar(cameraZ).add(center));

  // Set controls target to model center
  controls.target.copy(center);

  // Update controls
  controls.update();
}

function onWindowResize() {
  const container = document.getElementById('threejs-container');
  const aspect = container.clientWidth / container.clientHeight;

  camera.aspect = aspect;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

// Pause auto-rotation on user interaction
document.addEventListener('mousedown', () => {
  if (controls) controls.autoRotate = false;
});

document.addEventListener('touchstart', () => {
  if (controls) controls.autoRotate = false;
});

// Resume auto-rotation after inactivity
let inactivityTimer;
function resetInactivityTimer() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(() => {
    if (controls) controls.autoRotate = true;
  }, 5000);
}

document.addEventListener('mouseup', resetInactivityTimer);
document.addEventListener('touchend', resetInactivityTimer);

// Initialize when page loads
document.addEventListener('DOMContentLoaded', init);
