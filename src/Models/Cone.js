import { ConeGeometry } from "three";
import Shape from "./shape.js";
export default class Cone extends Shape {
  constructor(params) {
    super(params.color || 0xffffff);
    this.data = {
      radius: params.radius || 10,
      height: params.height || 15,
      radialSegments: 8,
      heightSegments: 1,
      openEnded: false,
      thetaStart: 0,
      thetaLength: Math.PI * 2,
    };
    // this.setMesh();
  }

  getGeometry() {
    return new ConeGeometry(
      this.data.radius,
      this.data.height,
      this.data.radialSegments,
      this.data.heightSegments,
      this.data.openEnded,
      this.data.thetaStart,
      this.data.thetaLength
    );
  }

  setMesh(renderMode = 3, texture = null) {
    super.createMesh(this.getGeometry(), renderMode, texture);
  }

  createGUI(gui, callback) {
    const { onGeoChange, onColorChange } = callback;

    const folder = gui.addFolder("ConeGeometry");

    super.createGUI(folder, onColorChange);

    folder.add(this.data, "radius", 0, 30).onChange(onGeoChange);
    folder.add(this.data, "height", 1, 50).onChange(onGeoChange);
    folder
      .add(this.data, "radialSegments", 3, 64)
      .step(1)
      .onChange(onGeoChange);
    folder
      .add(this.data, "heightSegments", 1, 64)
      .step(1)
      .onChange(onGeoChange);
    folder.add(this.data, "openEnded").onChange(onGeoChange);
    folder.add(this.data, "thetaStart", 0, Math.PI * 2).onChange(onGeoChange);
    folder.add(this.data, "thetaLength", 0, Math.PI * 2).onChange(onGeoChange);

    return folder;
  }
}
