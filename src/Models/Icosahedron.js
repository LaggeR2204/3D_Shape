import { IcosahedronGeometry } from "three";
import Shape from "./shape.js";
export default class Icosahedron extends Shape {
  constructor(radius, color = 0xffffff, renderMode = 0) {
    super(color, renderMode);
    this.data = {
      radius: radius,
      detail: 0,
    };
    this.setMesh();
  }

  getGeometry() {
    return new IcosahedronGeometry(this.data.radius, this.data.detail);
  }

  setMesh(texture = undefined) {
    super.createMesh(this.getGeometry(), texture);
  }
}
