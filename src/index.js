import * as THREE from "three";
import { GUI } from "GUI";
import SceneState from "./State/SceneState.js";
import { OrbitControls } from "OrbitControls";
import { LightOption } from "./LightOption.js";
$(document).ready(function () {
  THREE.Object3D.prototype.dispose = function () {
    if (this.children.length === 0) {
      this.geometry.dispose();
      this.material.dispose();
    } else {
      this.children[0].geometry.dispose();
      this.children[0].material.dispose();
      this.children[1].geometry.dispose();
      this.children[1].material.dispose();
    }
  };
  //setup

  //SCENE SETUP
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  const camera = new THREE.PerspectiveCamera(
    75,
    $("#canvas-container").innerWidth() / $("#canvas-container").innerHeight(),
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer();
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

  renderer.setSize(
    $("#canvas-container").innerWidth(),
    $("#canvas-container").innerHeight()
  );
  $("#canvas-container").append(renderer.domElement);

  camera.position.z = 10;
  var mouse = {
    x: 0,
    y: 0,
  };

  //DEFAULT PLANE
  let plane = new THREE.PlaneGeometry(20, 20, 20, 20);
  let mat = new THREE.MeshLambertMaterial({ color: 0x666666 });
  let planeMesh = new THREE.Mesh(plane, mat);
  planeMesh.rotation.x = -Math.PI / 2;
  planeMesh.position.y = -3;
  planeMesh.castShadow = false;
  planeMesh.receiveShadow = true;
  scene.add(planeMesh);

  const gui = new GUI({ autoPlace: false });
  $("#gui").append(gui.domElement);
  gui.hide();
  const sceneState = new SceneState();

  //LIGHT
  var lightOption = new LightOption();
  let lightingFolder = gui.addFolder("Lighting");
  lightingFolder.open();

  lightingFolder
    .add(lightOption, "ambientLightIntensity", 0, 1)
    .step(0.01)
    .name("Ambient")
    .onChange(updateLighting);
  lightingFolder
    .add(lightOption, "lighting")
    .name("Point Light")
    .onChange(updateLighting);
  lightingFolder
    .add(lightOption, "lightsource")
    .name("Mouse Light")
    .onChange(updateLighting);
  lightingFolder
    .add(lightOption, "shadow")
    .name("Enable Shadow")
    .onChange(updateLighting);
  var lights = [];
  lights[0] = new THREE.PointLight(0xffffff);
  lights[1] = new THREE.AmbientLight(0xffffff, 0.2);

  lights[0].position.set(3, 3, 3);
  var sphereSize = 0.1;
  var pointLightHelper = new THREE.PointLightHelper(lights[0], sphereSize);

  scene.add(lights[1]);
  updateLighting();

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
    sceneState.updateShape(shape, gui);
    if (sceneState.prevObject) {
      scene.remove(sceneState.prevObject);
      sceneState.prevObject.dispose();
    }
    scene.add(sceneState.curObject);
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
    sceneState.updateRenderMode(intMode);

    if (sceneState.prevObject) {
      scene.remove(sceneState.prevObject);
      scene.add(sceneState.curObject);
      // updateMesh();
    }
  }

  //update point light
  function updateLighting() {
    lights[1].intensity = lightOption.ambientLightIntensity;
    if (lightOption.lighting) {
      scene.add(lights[0]);
    } else {
      scene.remove(lights[0]);
    }

    if (lightOption.lightsource) {
      lights[0].position.set(3, 3, 2);
    } else {
      lights[0].position.set(
        lightOption.lightingPosX,
        lightOption.lightingPosY,
        lightOption.lightingPosZ
      );
    }

    if (lightOption.shadow) {
      lights[0].castShadow = true;
    } else {
      console.log(lightOption.shadow);
      lights[0].castShadow = false;
    }
  }

  window.onmousemove = function (event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    if (lightOption.lightsource) {
      scene.add(pointLightHelper);
      var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
      vector.unproject(camera);
      var dir = vector.sub(camera.position).normalize();
      var distance = -camera.position.z / dir.z;
      var pos = camera.position.clone().add(dir.multiplyScalar(distance));

      lights[0].position.copy(
        new THREE.Vector3(pos.x, pos.y, lightOption.lightingPosZ)
      );
      lightOption.lightingPosX = pos.x;
      lightOption.lightingPosY = pos.y;
    } else {
      scene.remove(pointLightHelper);
    }
  };

  $(".model").click(function () {
    updateShape($(this).text());
  });

  $(".mode").click(function () {
    updateRenderMode($(this).text());
  });
});
