import { LatheGeometry, Vector2 } from "three";
import Shape from "./shape.js";
export default class Lathe extends Shape {
  constructor(color = 0x156289) {
    super(color);
    this.points = [];

    for (let i = 0; i < 10; i++) {
      this.points.push(new Vector2(Math.sin(i * 0.2) * 10 + 5, i - 5));
    }

    this.data = {
      segments: 12,
      phiStart: 0,
      phiLength: Math.PI * 2,
    };
    // this.setMesh();
  }

  getGeometry() {
    return new LatheGeometry(
      this.points,
      this.data.segments,
      this.data.phiStart,
      this.data.phiLength
    );
  }

  setMesh(renderMode = 3, texture = null) {
    super.createMesh(this.getGeometry(), renderMode, texture);
  }

  createGUI(gui, callback) {
    const { onGeoChange, onColorChange } = callback;

    const folder = gui.addFolder("LatheGeometry");

    super.createGUI(folder, onColorChange);

    folder.add(this.data, "segments", 1, 30).step(1).onChange(onGeoChange);
    folder.add(this.data, "phiStart", 0, Math.PI * 2).onChange(onGeoChange);
    folder.add(this.data, "phiLength", 0, Math.PI * 2).onChange(onGeoChange);

    return folder;
  }
}
