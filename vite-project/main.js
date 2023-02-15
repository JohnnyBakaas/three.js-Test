import * as THREE from "three";
import "./style.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { VSMShadowMap } from "three";

// Skjerm
const scene = new THREE.Scene();

// Størelse
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Geomerti her

const geomerty = [];

const cordsFromAngleAndRadius = (inputRadius, inputAngle) => {
  return {
    x: inputRadius * Math.cos(inputAngle * (Math.PI / 180)),
    y: inputRadius * Math.sin(inputAngle * (Math.PI / 180)),
  };
};

const kake = [
  [
    true,
    false,
    true,
    false,
    false,
    true,
    false,
    false,
    true,
    false,
    true,
    false,
    true,
    true,
    true,
  ],
  [
    true,
    true,
    false,
    false,
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    false,
    true,
    false,
    false,
  ],
  [
    true,
    false,
    false,
    false,
    true,
    true,
    true,
    false,
    true,
    false,
    false,
    false,
    true,
    true,
    false,
  ],
  [
    true,
    true,
    false,
    false,
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    false,
    true,
    false,
    false,
  ],
  [
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    true,
    true,
  ],
];

kake.forEach((e) => {
  e.reverse();
});

const GET = [
  [0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0],
  [1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0],
];

GET.forEach((e) => {
  e.reverse();
});

const johnny = [
  [
    1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0,
    1, 0, 0, 0, 0, 0, 1,
  ],
  [
    1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0,
    0, 1, 0, 0, 0, 1, 0,
  ],
  [
    1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0,
    0, 0, 1, 0, 1, 0, 0,
  ],
  [
    0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0,
    0, 0, 0, 1, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 1, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    0, 0, 0, 0, 0, 0, 0,
  ],
];

johnny.forEach((e) => {
  e.reverse();
});

//

let iteration = 0;
const text = johnny;
text.forEach((e) => {
  for (let i = 0; i < 60; i++) {
    if (e[i]) {
      const geometry = new THREE.SphereGeometry(1.5, 30, 30);
      const material = new THREE.MeshPhongMaterial({ color: 0xffff00 });
      material.shininess = 30;
      material.emissive = new THREE.Color(0xcc5500);
      material.emissiveIntensity = 100000000000;
      const sphere = new THREE.Mesh(geometry, material);

      let cords = cordsFromAngleAndRadius(30, (i * 360) / 60);

      sphere.position.x = cords.x;
      sphere.position.y = cords.y;
      sphere.position.z = iteration - text.length;
      geomerty.push(sphere);
    }
  }
  iteration += 3;
});

const geometry = new THREE.SphereGeometry(20, 300, 300);
const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

geomerty.forEach((e) => {
  sphere.add(e);
});

// Til her

// Lights
const light = new THREE.PointLight(0x3f7b9d, 3, 100);

scene.add(light);

// Camera
const camerea = new THREE.PerspectiveCamera(
  45,
  size.width / size.height,
  0.1,
  1000
);
camerea.position.z = 100;
scene.add(camerea);
const canvas = document.querySelector(".vebGL");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(size.width, size.height);

// Action
renderer.render(scene, camerea);

// Controls
const controls = new OrbitControls(camerea, canvas);

// Resize
window.addEventListener("resize", () => {
  // opdater størelse lagret
  size.height = window.innerHeight;
  size.width = window.innerWidth;

  camerea.updateProjectionMatrix();

  camerea.aspect = size.width / size.height;
  renderer.setSize(size.width, size.height);
});

let position = 100;

const loop = () => {
  sphere.rotateZ(0.01);
  /*
  if (camerea.position.z < 2000) {
    camerea.position.z++;
  }
  if (camerea.position.z > 500) {
    if (position > 30) {
      position -= 0.1;
      document.getElementById("kakeTekst").style.marginTop = `${position}vh`;
    }
  }
  */
  renderer.render(scene, camerea);
  window.requestAnimationFrame(loop);
};

loop();
