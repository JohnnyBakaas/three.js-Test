import * as THREE from "three";
import "./style.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const makeRandomArray = (arrayLength) => {
  const outArray = [];

  for (let i = 0; i < arrayLength; i++) {
    outArray.push(Math.floor(Math.random() * 10) + 1);
  }

  return outArray;
};

const arrayLength = 10;

const bubbleSort = () => {
  const ogArr = makeRandomArray(arrayLength);
  const history = [];
  history.push(Array.from(ogArr));

  let notFinished = true;

  while (notFinished) {
    notFinished = false;
    for (let i = 0; i < ogArr.length - 1; i++) {
      if (ogArr[i] > ogArr[i + 1]) {
        let temp = ogArr[i];
        ogArr[i] = ogArr[i + 1];
        ogArr[i + 1] = temp;
        notFinished = true;
      }
      history.push(Array.from(ogArr));
    }
  }

  return history;
};

const history = bubbleSort();

let iteration = 0;

export const iterationPlussOne = () => {
  iteration++;
  if (iteration == history.length) iteration--;
};

export const iterationMinusOne = () => {
  iteration--;
  if (iteration == -1) iteration++;
};

const visualizeArray = () => {
  const colection = [];
  for (let i = 0; i < history[iteration].length; i++) {
    const geometry = new THREE.BoxGeometry(1, 1, history[iteration][i]);

    let material;

    material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    const cube = new THREE.Mesh(geometry, material);
    cube.translateY(i * 1.5);
    colection.push(cube);
  }

  return colection;
};

const killMeshChildren = () => {
  for (let i = 0; i < scene.children.length; i++) {
    if (scene.children[i].type == "Mesh") scene.children[i] = undefined;
  }
  scene.children = scene.children.filter((e) => e != undefined);
};

// Skjerm
const scene = new THREE.Scene();

// Størelse
const size = {
  width: window.innerWidth,
  height: window.innerHeight - 100,
};

// Geomerti her
let geometry = visualizeArray();
geometry.forEach((e) => {
  scene.add(e);
});

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
camerea.position.z = 50;
scene.add(camerea);
const canvas = document.querySelector(".vebGL");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(size.width, size.height);

// Action
window.iterationPlussOne = iterationPlussOne;
window.iterationMinusOne = iterationMinusOne;

renderer.render(scene, camerea);

// Controls
const controls = new OrbitControls(camerea, canvas);

// Resize
window.addEventListener("resize", () => {
  // opdater størelse lagret
  size.height = window.innerHeight - 100;
  size.width = window.innerWidth;

  camerea.updateProjectionMatrix();

  camerea.aspect = size.width / size.height;
  renderer.setSize(size.width, size.height);
});

let position = 100;

killMeshChildren();

const loop = () => {
  killMeshChildren();

  geometry = visualizeArray();
  geometry.forEach((e) => {
    scene.add(e);
  });

  console.log(scene.children.length);
  console.log(geometry.length);

  // HOLD PÅ BUNN
  renderer.render(scene, camerea);
  window.requestAnimationFrame(loop);
};

loop();
