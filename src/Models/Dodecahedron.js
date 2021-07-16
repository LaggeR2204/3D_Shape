import { DodecahedronGeometry } from "three";
import Shape from "./shape.js";
export default class Dodecahedron extends Shape {
  constructor(radius = 5, detail = 0, color = 0x156289) {
    super(color);
    this.data = {
      radius: radius,
      detail: detail,
    };
    // this.setMesh();
  }

  getGeometry() {
    return new DodecahedronGeometry(this.data.radius, this.data.detail);
  }

  setMesh(renderMode = 3, texture = null) {
    super.createMesh(this.getGeometry(), renderMode, texture);
  }

  createGUI(gui, callback) {
    const { onGeoChange, onColorChange } = callback;

    const folder = gui.addFolder("DodecahedronGeometry");

    super.createGUI(folder, onColorChange);

    folder.add(this.data, "radius", 1, 20).onChange(onGeoChange);
    folder.add(this.data, "detail", 0, 5).step(1).onChange(onGeoChange);

    return folder;
  }
}
