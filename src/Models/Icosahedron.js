import { IcosahedronGeometry } from "three";
import Shape from "./shape.js";
export default class Icosahedron extends Shape {
  constructor(radius, color = 0xffffff) {
    super(color);
    this.data = {
      radius: radius,
      detail: 0,
    };
    this.setMesh();
  }

  getGeometry() {
    return new IcosahedronGeometry(this.data.radius, this.data.detail);
  }

  setMesh(renderMode = 3, texture = null) {
    super.createMesh(this.getGeometry(), renderMode, texture);
  }

  createGUI(gui, callback) {
    const { onGeoChange, onColorChange } = callback;

    const folder = gui.addFolder("IcosahedronGeometry");

    super.createGUI(folder, onColorChange);

    folder.add(this.data, "radius", 1, 20).onChange(onGeoChange);
    folder.add(this.data, "detail", 0, 5).step(1).onChange(onGeoChange);

    return folder;
  }
}
