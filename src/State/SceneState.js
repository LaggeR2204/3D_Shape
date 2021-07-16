import Cube from "../Models/Cube.js";
import Cone from "../Models/Cone.js";
import Cylinder from "../Models/Cylinder.js";
import Sphere from "../Models/Sphere.js";
import Icosahedron from "../Models/Icosahedron.js";
import Torus from "../Models/Torus.js";
import Teapot from "../Models/Teapot.js";

export default class SceneState {
  constructor() {
    this.prevObject = null;
    this.curShape = new Cube(1, 1, 1, 0xff0000);
    this.curObject = this.curShape.getMesh();
    this.curTexture = null;
    this.curGUIFolder = null;

    this.onDrag = false;
    this.speed = 0;
    this.accelaretion = 0.001;
  }

  updateShape(shape, gui, renderMode = 3) {
    this.prevObject = this.curObject;
    this.curGUIFolder && gui.removeFolder(this.curGUIFolder);
    this.curGUIFolder = null;
    renderMode = parseInt(renderMode);
    switch (shape) {
      case "Cube":
        this.curShape = new Cube(3, 3, 3, 0x38284b, renderMode);
        break;
      case "Cone":
        this.curShape = new Cone(3, 3, 0x38284b, renderMode);
        break;
      case "Cylinder":
        this.curShape = new Cylinder(2, 2, 3, 0x38284b, renderMode);
        break;
      case "Sphere":
        this.curShape = new Sphere(2, 0x38284b, renderMode);
        break;
      case "Icosahedron":
        this.curShape = new Icosahedron(2, 0x38284b, renderMode);
        break;
      case "Torus":
        this.curShape = new Torus(2, 0.5, 0x38284b, renderMode);
        break;
      case "Teapot":
        this.curShape = new Teapot(2, 0x38284b, renderMode);
        break;
      default:
    }
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

  updateTexture() {
    this.prevObject = this.curObject;
    this.curShape.setMesh(this.curTexture);
    this.curObject = this.curShape.getMesh();
  }

  updateRenderMode(renderMode = 0) {
    this.prevObject = this.curObject;
    this.curShape.renderMode = parseInt(renderMode);
    this.curShape.setMesh(this.curTexture);
    this.curObject = this.curShape.getMesh();
  }
}
