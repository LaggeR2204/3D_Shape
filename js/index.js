import * as THREE from "../node_modules/three/build/three.module.js";
import { GUI } from "../node_modules/three/examples/jsm/libs/dat.gui.module.js";

$(document).ready(function () {
  const scene = new THREE.Scene();
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

  const geometry = new THREE.BoxGeometry();

  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Line(geometry, material);
  scene.add(cube);

  camera.position.z = 5;

  function animate() {
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
  setTimeout(() => {
    console.log("[]", cube);
    cube.removeFromParent();
    cube.material.dispose();
    cube.geometry.dispose();
    console.log(cube);
  }, 2000);
});
