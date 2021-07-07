import * as THREE from "three";
import { GUI } from "GUI";
import SceneState from "./State/SceneState.js";
import { OrbitControls } from "OrbitControls";
$(document).ready(function () {
  THREE.Object3D.prototype.dispose = function () {
    this.geometry.dispose();
    this.material.dispose();
  };
  //setup

  //SCENE SETUP
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
  gui.hide();

  const sceneState = new SceneState();

  //LIGHT

  const lights = [];
  lights[0] = new THREE.PointLight(0xffffff, 1, 0);
  lights[1] = new THREE.PointLight(0xffffff, 1, 0);
  lights[2] = new THREE.PointLight(0xffffff, 1, 0);

  lights[0].position.set(0, 200, 0);
  lights[1].position.set(100, 200, 100);
  lights[2].position.set(-100, -200, -100);

  scene.add(lights[0]);
  scene.add(lights[1]);
  scene.add(lights[2]);

  //orbit control
  const orbit = new OrbitControls(camera, renderer.domElement);
  orbit.enableZoom = true;

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

  $(".model").click(function () {
    updateShape($(this).text());
  });

  $(".mode").click(function () {
    updateRenderMode($(this).text());
  });
});
