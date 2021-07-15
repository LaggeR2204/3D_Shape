import Cube from "../Models/Cube.js";
import Cone from "../Models/Cone.js";
import Cylinder from "../Models/Cylinder.js";
import Sphere from "../Models/Sphere.js";
import Icosahedron from "../Models/Icosahedron.js";
import Torus from "../Models/Torus.js";
import Teapot from "../Models/Teapot.js";
import { getTexture } from "../Textures/Texture.js";
import { Color, Mesh } from "three";
export default class SceneState {
  constructor() {
    // this.curShape = new Cube(1, 1, 1, 0xff0000);
    // this.curObject = this.curShape.getMesh();
    this.curShape = null;
    this.curObject = null;
    this.curTexture = null;
    this.curTextureOption = "";
    this.curGUIFolder = null;
    this.curRenderMode = 3;

    this.onDrag = false;
    this.speed = 0;
    this.accelaretion = 0.001;
  }

  updateShape(shape, gui, renderMode = 3) {
    this.curGUIFolder && gui.removeFolder(this.curGUIFolder);
    this.curGUIFolder = null;
    renderMode = parseInt(renderMode);
    switch (shape) {
      case "Cube":
        this.curShape = new Cube(5, 5, 5, 0x156289);
        break;
      case "Cone":
        this.curShape = new Cone(3, 3, 0x156289);
        break;
      case "Cylinder":
        this.curShape = new Cylinder(3, 3, 3, 0x156289);
        break;
      case "Sphere":
        this.curShape = new Sphere(3, 0x156289);
        break;
      case "Icosahedron":
        this.curShape = new Icosahedron(3, 0x156289);
        break;
      case "Torus":
        this.curShape = new Torus(5, 1.5, 0x156289);
        break;
      case "Teapot":
        this.curShape = new Teapot(2, 0x156289);
        break;
      default:
    }
    this.curShape.setMesh(this.curRenderMode, this.curTexture);
    this.curObject = this.curShape.getMesh();
    this.curGUIFolder = this.curShape.createGUI(gui, {
      onGeoChange: () => {
        // console.log("control change", this);
        if (this.curObject.children.length === 0) {
          this.curObject.geometry.dispose();
          this.curObject.geometry = this.curShape.getGeometry();
        } else {
          this.curObject.children[0].geometry.dispose();
          this.curObject.children[1].geometry.dispose();
          this.curObject.children[0].geometry = this.curShape.getGeometry();
          this.curObject.children[1].geometry = this.curShape.getGeometry();
        }
      },
      onColorChange: (value) => {
        if (typeof value === "string") {
          value = value.replace("#", "0x");
        }
        if (this.curObject.children.length === 0) {
          this.curObject.material.color.setHex(value);
        } else {
          this.curObject.children[1].material.color.setHex(value);
        }
      },
    });
    gui.show();
    this.curGUIFolder.open();
  }

  updateTexture(option, file = null) {
    if (this.curTextureOption) {
      this.curTexture.tex.dispose();
    }
    if (this.curTextureOption === option || !this.curObject) {
      return;
    }

    this.curTextureOption = option;
    this.curTexture = getTexture(option, file);

    if (this.curTexture) {
      if (this.curObject instanceof Mesh) {
        this.curObject.material.envMap = null;
        this.curObject.material.map = null;
        this.curObject.material[this.curTexture.option] = this.curTexture.tex;
        this.curObject.material.color = new Color(0xffffff);
      }
    } else {
      if (this.curObject instanceof Mesh) {
        this.curObject.material.color = new Color(0x156289);
        this.curObject.material.envMap = null;
        this.curObject.material.map = null;
      }
      this.curTextureOption = "";
      this.curTexture = null;
    }
    this.curObject.material.needsUpdate = true;
  }

  updateRenderMode(renderMode = 0) {
    this.curRenderMode = renderMode;
    if (!this.curObject) return { result: false };
    const obj = this.curObject;
    this.curShape.setMesh(this.curRenderMode, this.curTexture);
    this.curObject = this.curShape.getMesh();
    return { result: true, obj };
  }

  clear() {
    this.curShape = null;
    this.curObject = null;
    this.curTexture = null;
    this.curTextureOption = "";
    this.curGUIFolder = null;
    this.curRenderMode = 3;
  }
}
