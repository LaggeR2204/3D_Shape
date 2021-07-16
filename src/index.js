import * as THREE from "three";
import { GUI } from "GUI";
import SceneState from "./State/SceneState.js";
import { OrbitControls } from "OrbitControls";
import { LightOption } from "./Light/LightOption.js";
import { TransformControls } from "TransformControls";
import { AnimationOption } from "./Animations/AnimationOption.js";
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
  scene.background = new THREE.Color(0x000000);
  const camera = new THREE.PerspectiveCamera(
    75,
    $("#canvas-container").innerWidth() / $("#canvas-container").innerHeight(),
    0.1,
    50
  );

  const renderer = new THREE.WebGLRenderer({ antialias: true });
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
  planeMesh.position.y = -4;
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

  //ANIMATION
  var animationOption = new AnimationOption();

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
  function updateMeshAnimation() {
    sceneState.curObject.rotation.x =
      (animationOption.rotationX / 180) * Math.PI;
    sceneState.curObject.rotation.y =
      (animationOption.rotationY / 180) * Math.PI;
    sceneState.curObject.rotation.z =
      (animationOption.rotationZ / 180) * Math.PI;
    sceneState.curObject.position.x = animationOption.positionX;
    sceneState.curObject.position.y = animationOption.positionY;
    sceneState.curObject.position.z = animationOption.positionZ;
  }

  function animate() {
    if (animationOption.isAnimateRotating) {
      animationOption.rotationX += 2;
      if (animationOption.rotationX < -180) animationOption.rotationX += 360;
      else if (animationOption.rotationX > 180)
        animationOption.rotationX -= 360;
      animationOption.rotationY += 2;
      if (animationOption.rotationY < -180) animationOption.rotationY += 360;
      else if (animationOption.rotationY > 180)
        animationOption.rotationY -= 360;
      animationOption.rotationZ += 2;
      if (animationOption.rotationZ < -180) animationOption.rotationZ += 360;
      else if (animationOption.rotationZ > 180)
        animationOption.rotationZ -= 360;
      updateMeshAnimation();
    }
    if (animationOption.isAnimateBouncing) {
      sceneState.speed -= sceneState.accelaretion;
      animationOption.positionY += sceneState.speed;
      if (animationOption.positionY < -2) sceneState.speed = -sceneState.speed;
      updateMeshAnimation();
    }
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

  function updateAnimation(option) {
    switch (option) {
      case "Auto Rotate":
        animationOption.isAnimateRotating = !animationOption.isAnimateRotating;
        break;
      case "Bouncy":
        animationOption.isAnimateBouncing = !animationOption.isAnimateBouncing;
        break;
      case "Stop":
        animationOption.isAnimateRotating = false;
        animationOption.isAnimateBouncing = false;
        break;
      case "Clear":
        animationOption.rotationX = 0;
        animationOption.rotationY = 0;
        animationOption.rotationZ = 0;
        animationOption.positionX = 0;
        animationOption.positionY = 0;
        animationOption.positionZ = 0;
        updateMeshAnimation();
        animationOption.isAnimateRotating = false;
        animationOption.isAnimateBouncing = false;
        break;
      default:
        break;
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
    if (sceneState.curGUIFolder) {
      gui.removeFolder(sceneState.curGUIFolder);
      gui.hide();
    }
    scene.remove(sceneState.curObject);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 10;
    camera.lookAt(0, 0, -1);
    sceneState.clear();
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
    } else updateTexture($(this).text());
  });

  $(".animation").click(function () {
    updateAnimation($(this).text());
  });

  $("#tex-choose").change(function (event) {
    // console.log(event);
    const file = $(this)[0].files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      sceneState.updateTexture("custom", url);
    }
  });
});
