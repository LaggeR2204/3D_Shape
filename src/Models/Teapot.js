import { TeapotGeometry } from "CustomGeometry/TeapotGeometry.js";

import Shape from "./shape.js";
export default class Teapot extends Shape {
  constructor(params) {
    super(params.color || 0xffffff);
    this.data = {
      size: params.size || 7,
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
