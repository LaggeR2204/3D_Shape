import { TorusGeometry } from "three";
import Shape from "./shape.js";
export default class Torus extends Shape {
  constructor(radius, tube, color = 0xffffff, renderMode = 0) {
    super(color, renderMode);
    this.data = {
      radius: radius,
      tube: tube,
      radialSegments: 16,
      tubularSegments: 100,
      arc: Math.PI * 2,
    };
    this.setMesh();
  }

  getGeometry() {
    return new TorusGeometry(
      this.data.radius,
      this.data.tube,
      this.data.radialSegments,
      this.data.tubularSegments,
      this.data.arc
    );
  }

  setMesh(texture = undefined) {
    super.createMesh(this.getGeometry(), texture);
  }
}
