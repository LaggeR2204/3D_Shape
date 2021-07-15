import { BoxGeometry } from "three";
import Shape from "./shape.js";
export default class Cube extends Shape {
  constructor(height, width, depth, color = 0xffffff) {
    super(color);
    this.data = {
      width: width,
      height: height,
      depth: depth,
      widthSegments: 1,
      heightSegments: 1,
      depthSegments: 1,
    };
    // this.setMesh();
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

  setMesh(renderMode = 3, texture = null) {
    super.createMesh(this.getGeometry(), renderMode, texture);
  }

  createGUI(gui, callback) {
    const { onGeoChange, onColorChange } = callback;

    const folder = gui.addFolder("BoxGeometry");

    super.createGUI(folder, onColorChange);

    folder.add(this.data, "width", 1, 30).onChange(onGeoChange);
    folder.add(this.data, "height", 1, 30).onChange(onGeoChange);
    folder.add(this.data, "depth", 1, 30).onChange(onGeoChange);
    folder.add(this.data, "widthSegments", 1, 10).step(1).onChange(onGeoChange);
    folder
      .add(this.data, "heightSegments", 1, 10)
      .step(1)
      .onChange(onGeoChange);
    folder.add(this.data, "depthSegments", 1, 10).step(1).onChange(onGeoChange);

    return folder;
  }
}
