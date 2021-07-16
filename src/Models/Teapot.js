import { TeapotGeometry } from "../../node_modules/three/examples/jsm/geometries/TeapotGeometry.js";

import Shape from "./shape.js";
export default class Teapot extends Shape {
  constructor(size, color = 0xffffff) {
    super(color);
    this.data = {
      size: size,
    };
    this.setMesh();
  }

  getGeometry() {
    return new TeapotGeometry(this.data.size);
  }

  setMesh(renderMode = 3, texture = null) {
    super.createMesh(this.getGeometry(), renderMode, texture);
  }

  createGUI(gui, callback) {
    const { onGeoChange, onColorChange } = callback;

    const folder = gui.addFolder("BoxGeometry");

    super.createGUI(folder, onColorChange);

    return folder;
  }
}
