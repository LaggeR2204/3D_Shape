import { BoxGeometry } from "three";
import Shape from "./shape.js";
export default class Cube extends Shape {
  constructor(height, width, depth, color = 0xffffff, renderMode = 3) {
    super(color, renderMode);
    this.data = {
      width: width,
      height: height,
      depth: depth,
      widthSegments: 1,
      heightSegments: 1,
      depthSegments: 1,
    };
    this.setMesh();
  }

  getGeometry() {
    return new BoxGeometry(
      this.data.width,
      this.data.height,
      this.data.depth,
      Math.max(this.data.widthSegments, 1),
      Math.max(this.data.heightSegments, 1),
      Math.max(this.data.depthSegments, 1)
    );
  }

  setMesh(texture = undefined) {
    super.createMesh(this.getGeometry(), texture);
  }
}
