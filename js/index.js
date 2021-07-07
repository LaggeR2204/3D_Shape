import * as THREE from "../node_modules/three/build/three.module.js";
import { GUI } from "../node_modules/three/examples/jsm/libs/dat.gui.module.js";
import Cube from "./Models/Cube.js";
$(document).ready(function () {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x444444);
  const camera = new THREE.PerspectiveCamera(
    75,
    $("#canvas-container").innerWidth() / $("#canvas-container").innerHeight(),
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer();

  renderer.setSize(
    $("#canvas-container").innerWidth(),
    $("#canvas-container").innerHeight()
  );
  $("#canvas-container").append(renderer.domElement);

  const shape = new Cube(10, 5, 5, 0x00ff00, 0);
  const mesh = shape.getMesh();

  scene.add(mesh);

  camera.position.z = 30;

  function animate() {
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
});
