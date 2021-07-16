import { ExtrudeGeometry, Shape } from "three";
import Shape1 from "./shape.js";
export default class Extrude extends Shape1 {
  constructor(color = 0x156289) {
    super(color);
    this.data = {
      steps: 2,
      depth: 16,
      bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: 1,
      bevelOffset: 0,
      bevelSegments: 1,
    };

    const length = 12,
      width = 8;

    this.shape = new Shape();
    this.shape.moveTo(0, 0);
    this.shape.lineTo(0, width);
    this.shape.lineTo(length, width);
    this.shape.lineTo(length, 0);
    this.shape.lineTo(0, 0);
    // this.setMesh();
  }

  getGeometry() {
    return new ExtrudeGeometry(this.shape, this.data);
  }

  setMesh(renderMode = 3, texture = null) {
    super.createMesh(this.getGeometry(), renderMode, texture);
  }

  createGUI(gui, callback) {
    const { onGeoChange, onColorChange } = callback;

    const folder = gui.addFolder("ExtrudeGeometry");

    super.createGUI(folder, onColorChange);

    folder.add(this.data, "steps", 1, 10).step(1).onChange(onGeoChange);
    folder.add(this.data, "depth", 1, 20).onChange(onGeoChange);
    folder.add(this.data, "bevelThickness", 1, 5).step(1).onChange(onGeoChange);
    folder.add(this.data, "bevelSize", 0, 5).step(1).onChange(onGeoChange);
    folder.add(this.data, "bevelOffset", -4, 5).step(1).onChange(onGeoChange);
    folder.add(this.data, "bevelSegments", 1, 5).step(1).onChange(onGeoChange);

    return folder;
  }
}
