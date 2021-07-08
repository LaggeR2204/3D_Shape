import { TeapotGeometry } from "../../node_modules/three/examples/jsm/geometries/TeapotGeometry.js";

import Shape from "./shape.js";
export default class Teapot extends Shape {
  constructor(size, color = 0xffffff, renderMode = 0) {
    super(color, renderMode);
    this.data = {
      size: size,
    };
    this.setMesh();
  }

  getGeometry() {
    return new TeapotGeometry(this.data.size);
  }

  setMesh(texture = undefined) {
    super.createMesh(this.getGeometry(), texture);
  }
}
