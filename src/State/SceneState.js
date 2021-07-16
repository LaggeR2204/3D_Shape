import Cube from "../Models/Cube.js";
import Cone from "../Models/Cone.js";
import Cylinder from "../Models/Cylinder.js";
import Sphere from "../Models/Sphere.js";
import Icosahedron from "../Models/Icosahedron.js";
import Torus from "../Models/Torus.js";
import Teapot from "../Models/Teapot.js";
import Dodecahedron from "../Models/Dodecahedron";
import Octahedron from "../Models/Octahedron";
import Tetrahedron from "../Models/Tetrahedron";
import Lathe from "../Models/Lathe";
import Tube from "../Models/Tube";
import Extrude from "../Models/Extrude";
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

    this.transformMode = "";
  }

  updateShape(gui, option, cb) {
    this.curGUIFolder && gui.removeFolder(this.curGUIFolder);
    this.curGUIFolder = null;
    // this.curRenderMode = parseInt(option.renderMode || 3);
    switch (option.shape) {
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
      case "Dodecahedron":
        this.curShape = new Dodecahedron();
        break;
      case "Octahedron":
        this.curShape = new Octahedron();
        break;
      case "Tetrahedron":
        this.curShape = new Tetrahedron();
        break;
      case "Lathe":
        this.curShape = new Lathe();
        break;
      case "Tube":
        this.curShape = new Tube();
        break;
      case "Extrude":
        this.curShape = new Extrude();
        break;
      default:
    }
    this.curShape.setMesh(this.curRenderMode, this.curTexture);
    const oldObj = this.curObject;
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
    cb(this.curObject, oldObj);
  }

  updateTexture(option, file = null, cb = null) {
    if (this.curTextureOption === option || !this.curObject) {
      return;
    }

    if (this.curTextureOption) {
      this.curTexture.tex.dispose();
    }

    this.curTextureOption = option;
    this.curTexture = getTexture(option, file);

    if (this.curTexture) {
      if (this.curObject instanceof Mesh) {
        console.log("mesh");
        this.curObject.material.envMap = null;
        this.curObject.material.map = null;
        this.curObject.material[this.curTexture.option] = this.curTexture.tex;
        this.curObject.material.color = new Color(0xffffff);
        this.curObject.material.needsUpdate = true;
      } else {
        console.log("no mesh");
        this.curRenderMode = 0;
        const oldPos = this.curObject.position;
        const oldObj = this.curObject;
        this.curShape.setMesh(this.curRenderMode, this.curTexture);
        this.curObject = this.curShape.getMesh();
        this.curObject.position.set(oldPos.x, oldPos.y, oldPos.z);
        cb(this.curObject, oldObj);
      }
    } else {
      if (this.curObject instanceof Mesh) {
        this.curObject.material.color = new Color(0x156289);
        this.curObject.material.envMap = null;
        this.curObject.material.map = null;
        this.curObject.material.needsUpdate = true;
      }
      this.curTextureOption = "";
      // this.curTexture = null;
    }
  }

  updateRenderMode(renderMode = 0, cb = null) {
    this.curRenderMode = renderMode;
    if (!this.curObject) return;
    const obj = this.curObject;
    const oldPos = obj.position;
    this.curShape.setMesh(this.curRenderMode, this.curTexture);
    this.curObject = this.curShape.getMesh();
    this.curObject.position.set(oldPos.x, oldPos.y, oldPos.z);
    cb(this.curObject, obj);
  }

  clear() {
    this.curShape = null;
    this.curObject = null;
    this.curTexture = null;
    this.curTextureOption = "";
    this.curGUIFolder = null;
    this.curRenderMode = 3;
    this.transformMode = "";
  }

  updateTransformMode(mode) {
    if (!this.curObject) return;
    if (this.transformMode === mode) this.transformMode = "";
    else this.transformMode = mode;
  }
}
