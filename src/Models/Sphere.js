import { SphereGeometry } from "three";
import Shape from "./shape.js";
export default class Sphere extends Shape {
  constructor(radius, color = 0xffffff, renderMode = 0) {
    super(color, renderMode);
    this.data = {
      radius: radius,
      widthSegments: 8,
      heightSegments: 6,
      phiStart: 0,
      phiLength: Math.PI * 2,
      thetaStart: 0,
      thetaLength: Math.PI,
    };
    this.setMesh();
  }

  getGeometry() {
    return new SphereGeometry(
      this.data.radius,
      this.data.widthSegments,
      this.data.heightSegments,
      this.data.phiStart,
      this.data.phiLength,
      this.data.thetaStart,
      this.data.thetaLength
    );
  }

  setMesh(texture = undefined) {
    super.createMesh(this.getGeometry(), texture);
  }
}
