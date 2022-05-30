import './style.css';

import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

const textColour = '#ffffff';

let width = window.innerWidth;
let height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(45, width / height, 1, 100000);
const scene = new THREE.Scene();
const torusGeometry = new THREE.TorusGeometry(5, 1.6, 60, 60);
const torusMaterial = new THREE.MeshNormalMaterial({
  alpha: true,
  wireframe: false,
});

let titleMesh;
let subTitleTextMeshes = [];
let subTitleCounter = -1;
let currentTitleMesh;

const loader = new FontLoader();
const titleItemsGroup = new THREE.Group();

// Event Handlers
window.onresize = onWindowResize;

loader.load(
  'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json',
  function (font) {
    const textMaterial = new THREE.MeshBasicMaterial({
      color: textColour,
    });

    let textOptions = {
      font: font,
      size: 1.9,
      height: 0.05,
      curveSegments: 2,
      bevelEnabled: false,
      bevelThickness: 0,
      bevelSize: 0,
      bevelOffset: 0,
      bevelSegments: 0,
    };

    const kiranGeometry = new TextGeometry("Hey, I'm Kiran", {
      ...textOptions,
    });

    titleMesh = new THREE.Mesh(kiranGeometry, textMaterial);
    titleMesh.position.y = -0.1;

    titleItemsGroup.add(titleMesh);

    const titles = [
      'Techie',
      'Developer',
      'Coder',
      'Boffin',
      'Nerd',
      'Geek',
      'Wizard',
      'Ninja',
      'Oddball',
      'Eccentric',
    ];

    titles.forEach((title) => {
      const subTitleGeometry = new TextGeometry(` - ${title}`, {
        ...textOptions,
        size: textOptions.size * 0.6,
      });
      let subTitleMesh = new THREE.Mesh(subTitleGeometry, textMaterial);
      subTitleMesh.position.y = titleMesh.position.y - textOptions.size;
      subTitleTextMeshes.push(subTitleMesh);
      subTitleMesh.visible = false;
      titleItemsGroup.add(subTitleMesh);
    });

    currentTitleMesh = subTitleTextMeshes[0];
    setInterval(() => {
      subTitleCounter++;

      if (subTitleCounter === titles.length) {
        subTitleCounter = 0;
      }

      currentTitleMesh = subTitleTextMeshes[subTitleCounter];
      subTitleTextMeshes.forEach((m) => (m.visible = false));

      if (currentTitleMesh) {
        currentTitleMesh.visible = true;
      }
    }, 800);
  }
);

const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
titleItemsGroup.add(torusMesh);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

renderer.setSize(width, height);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setAnimationLoop(animation);
document.body.appendChild(renderer.domElement);

// animation
const offset = 5.2;
const speed = 0.0008;
const movementAmount = 0.1;
const textMovementAmmount = movementAmount * 10;

onWindowResize();

titleItemsGroup.rotation.x = 0.1;
titleItemsGroup.rotation.y = -0.8;
titleItemsGroup.rotation.z = 0.1;
titleItemsGroup.position.x = -3;

function animation(time) {
  torusMesh.position.x = Math.cos(time * speed) * 7 + 2;
  torusMesh.rotation.x = Math.cos(time * speed * 1);
  Math.sin(time * speed) * movementAmount + (90 + offset);

  camera.rotation.y = torusMesh.rotation.x * 0.05;
  torusMesh.rotation.y = Math.sin(time * speed) * movementAmount + offset;

  let textPosX = Math.sin(time * speed) * textMovementAmmount;

  if (titleMesh) {
    titleMesh.position.x = textPosX - 5;
  }

  if (currentTitleMesh) {
    currentTitleMesh.position.x = textPosX + 1;
  }

  renderer.render(scene, camera);
  scene.add(titleItemsGroup);
}

function onWindowResize() {
  width = window.innerWidth;
  height = window.innerHeight;

  camera.position.z = 50;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}
