import { SphereGeometry } from "three";
import Shape from "./shape.js";
export default class Sphere extends Shape {
  constructor(params) {
    super(params.color || 0xffffff);
    this.data = {
      radius: params.radius || 10,
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

  setMesh(renderMode = 3, texture = null) {
    super.createMesh(this.getGeometry(), renderMode, texture);
  }

  createGUI(gui, callback) {
    const { onGeoChange, onColorChange } = callback;

    const folder = gui.addFolder("THREE.SphereGeometry");

    super.createGUI(folder, onColorChange);

    folder.add(this.data, "radius", 1, 30).onChange(onGeoChange);
    folder.add(this.data, "widthSegments", 3, 32).step(1).onChange(onGeoChange);
    folder
      .add(this.data, "heightSegments", 2, 32)
      .step(1)
      .onChange(onGeoChange);
    folder.add(this.data, "phiStart", 0, Math.PI * 2).onChange(onGeoChange);
    folder.add(this.data, "phiLength", 0, Math.PI * 2).onChange(onGeoChange);
    folder.add(this.data, "thetaStart", 0, Math.PI * 2).onChange(onGeoChange);
    folder.add(this.data, "thetaLength", 0, Math.PI * 2).onChange(onGeoChange);

    return folder;
  }
}
