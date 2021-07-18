import { TubeGeometry, Curve, Vector3 } from "three";
import Shape from "./shape.js";

class CustomSinCurve extends Curve {
  constructor(scale = 1) {
    super();

    this.scale = scale;
  }

  getPoint(t, optionalTarget = new Vector3()) {
    const tx = t * 3 - 1.5;
    const ty = Math.sin(2 * Math.PI * t);
    const tz = 0;

    return optionalTarget.set(tx, ty, tz).multiplyScalar(this.scale);
  }
}

export default class Tube extends Shape {
  constructor(params) {
    super(params.color || 0xffffff);
    this.data = {
      segments: 20,
      radius: 2,
      radialSegments: 8,
    };
    this.path = new CustomSinCurve(10);
    // this.setMesh();
  }

  getGeometry() {
    return new TubeGeometry(
      this.path,
      this.data.segments,
      this.data.radius,
      this.data.radialSegments,
      false
    );
  }

  setMesh(renderMode = 3, texture = null) {
    super.createMesh(this.getGeometry(), renderMode, texture);
  }

  createGUI(gui, callback) {
    const { onGeoChange, onColorChange } = callback;

    const folder = gui.addFolder("TubeGeometry");
    super.createGUI(folder, onColorChange);

    folder.add(this.data, "segments", 1, 100).step(1).onChange(onGeoChange);
    folder.add(this.data, "radius", 1, 10).onChange(onGeoChange);
    folder
      .add(this.data, "radialSegments", 1, 20)
      .step(1)
      .onChange(onGeoChange);
    return folder;
  }
}
