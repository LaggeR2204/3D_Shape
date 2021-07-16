import * as THREE from "three";
import { GUI } from "GUI";
import SceneState from "./State/SceneState.js";
import { OrbitControls } from "Controls/OrbitControls";
import { TransformControls } from "Controls/TransformControls";
$(document).ready(function () {
  THREE.Object3D.prototype.dispose = function () {
    if (this.children.length === 0) {
      console.log("dispose unnormal shape");
      this.geometry.dispose();
      this.material.dispose();
    } else {
      console.log("dispose normal shape");
      this.children[0].geometry.dispose();
      this.children[0].material.dispose();
      this.children[1].geometry.dispose();
      this.children[1].material.dispose();
    }
  };
  //setup

  //SCENE SETUP
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x444444);
  const camera = new THREE.PerspectiveCamera(
    75,
    $("#canvas-container").innerWidth() / $("#canvas-container").innerHeight(),
    0.1,
    50
  );

  const renderer = new THREE.WebGLRenderer({ antialias: true });

  renderer.setSize(
    $("#canvas-container").innerWidth(),
    $("#canvas-container").innerHeight()
  );
  $("#canvas-container").append(renderer.domElement);

  camera.position.z = 10;

  const gui = new GUI({ autoPlace: false });
  $("#gui").append(gui.domElement);
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

  //CONTROL

  //orbit control
  const orbit = new OrbitControls(camera, renderer.domElement);
  orbit.enableZoom = true;
  orbit.enablePan = true;
  orbit.enableRotate = true;
  orbit.enabled = false;
  let camMouseEnable = false;

  $("#camera").click(function () {
    camMouseEnable = !camMouseEnable;
    if (camMouseEnable) {
      orbit.enabled = true;
      $(this).addClass("btnEnable");
    } else {
      orbit.enabled = false;
      $(this).removeClass("btnEnable");
    }
  });

  //transform control

  const controls = new TransformControls(camera, renderer.domElement);
  scene.add(controls);

  const switchGr = {
    controls: [$("#translate"), $("#scale"), $("#rotate")],
    notify: function () {
      if (sceneState.transformMode) {
        controls.setMode(sceneState.transformMode);
        if (!controls.object) controls.attach(sceneState.curObject);
      } else {
        if (controls.object) controls.detach();
      }
      this.controls.forEach((btn) => {
        if (btn.attr("id") === sceneState.transformMode) {
          btn.addClass("btnEnable");
        } else btn.removeClass("btnEnable");
      });
    },
  };

  $("#translate").click(function () {
    sceneState.updateTransformMode("translate");
    switchGr.notify("translate");
  });
  $("#scale").click(function () {
    sceneState.updateTransformMode("scale");
    switchGr.notify("scale");
  });
  $("#rotate").click(function () {
    sceneState.updateTransformMode("rotate");
    switchGr.notify("rotate");
  });

  //end setup

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();

  function updateShape(shape) {
    sceneState.updateShape(gui, { shape: shape }, onObjectChange);
  }

  function updateRenderMode(mode) {
    let intMode;
    switch (mode) {
      case "Normal":
        intMode = 3;
        break;
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
    sceneState.updateRenderMode(intMode, onObjectChange);
  }

  function updateTexture(option) {
    sceneState.updateTexture(option);
  }

  const onObjectChange = function (newObj, oldObj = null) {
    if (oldObj) {
      if (controls.object) controls.detach();
      scene.remove(oldObj);
      oldObj.dispose();
    }
    if (sceneState.transformMode) {
      controls.attach(newObj);
      controls.setMode(sceneState.transformMode);
    }
    scene.add(newObj);
  };

  //event

  $("#clear").click(function () {
    if (sceneState.curGUIFolder) gui.removeFolder(sceneState.curGUIFolder);
    scene.remove(sceneState.curObject);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 10;
    camera.lookAt(0, 0, -1);
    sceneState.clear();
    gui.hide();
    switchGr.notify();
  });

  $(".model").click(function () {
    updateShape($(this).text());
  });

  $(".mode").click(function () {
    updateRenderMode($(this).text());
  });

  $(".texture").click(function () {
    if ($(this).text() === "Choose...") {
      $("#tex-choose").trigger("click");
    } else sceneState.updateTexture($(this).text(), null, onObjectChange);
  });

  $("#tex-choose").change(function (event) {
    // console.log(event);
    const file = $(this)[0].files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      sceneState.updateTexture("custom", url, onObjectChange);
    }
  });
});
