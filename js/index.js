import * as THREE from "../node_modules/three/build/three.module.js";
import { GUI } from "../node_modules/three/examples/jsm/libs/dat.gui.module.js";
import Cube from "./Models/Cube.js";
import SceneState from "./State/SceneState.js";
$(document).ready(function () {
  THREE.Object3D.prototype.dispose = function () {
    this.geometry.dispose();
    this.material.dispose();
  };
  //setup

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

  camera.position.z = 10;

  const gui = new GUI();

  const sceneState = new SceneState();

  //end setup

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();

  function updateShape(shape) {
    sceneState.updateShape(shape);
    if (sceneState.prevObject) {
      scene.remove(sceneState.prevObject);
      sceneState.prevObject.dispose();
      scene.add(sceneState.curObject);
      //to sync new model's texture with the current texture setting
      // updateTexture();
      //to sync new model's transform with the current transform setting
      // updateMesh();
    }
  }

  function updateRenderMode(mode) {
    let intMode;
    switch (mode) {
      case "Solid":
        intMode = 0;
        break;
      case "Wireframe":
        intMode = 1;
        break;
      case "Point":
        intMode = 2;
        break;
      default:
        intMode = 0;
    }
    sceneState.updateRenderMode(intMode);

    if (sceneState.prevObject) {
      scene.remove(sceneState.prevObject);
      scene.add(sceneState.curObject);
      // updateMesh();
    }
  }

  $('button:contains("Point")').click(function () {
    updateRenderMode("Point");
  });

  $('button:contains("Cube")').click(function () {
    updateShape("Cube");
  });
});
