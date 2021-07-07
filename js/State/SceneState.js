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
    this.onDrag = false;
    this.speed = 0;
    this.accelaretion = 0.001;
  }

  updateShape(shape, renderMode = 0, callback) {
    this.prevObject = this.curObject;
    //NOTE: dat.gui is really weird with string-number alias option, its assigned value is not a string nor number so without parseInt renderMode value pass will fail
    renderMode = parseInt(renderMode);
    switch (shape) {
      case "Cube":
        this.curShape = new Cube(5, 5, 5, 0xff0000, renderMode);
        break;
      case "Cone":
        this.curShape = new Cone(1, 2, 0xff0000, renderMode);
        break;
      case "Cylinder":
        this.curShape = new Cylinder(1, 1, 2, 0xff0000, renderMode);
        break;
      case "Sphere":
        this.curShape = new Sphere(1, 0xff0000, renderMode);
        break;
      case "Icosahedron":
        this.curShape = new Icosahedron(1, 0xff00000, renderMode);
        break;
      case "Torus":
        this.curShape = new Torus(1, 0.3, 0xff0000, renderMode);
        break;
      case "Teapot":
        this.curShape = new Teapot(1, 0xff0000, renderMode);
        break;
      default:
    }
    this.curObject = this.curShape.getMesh();
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
