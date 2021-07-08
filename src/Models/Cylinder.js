import { CylinderGeometry } from "three";
import Shape from "./shape.js";
export default class Cylinder extends Shape {
  constructor(
    radiusBottom,
    radiusTop,
    height,
    color = 0xffffff,
    renderMode = 0
  ) {
    super(color, renderMode);
    this.data = {
      radiusTop: radiusTop,
      radiusBottom: radiusBottom,
      height: height,
      radialSegments: 8,
      heightSegments: 1,
      openEnded: false,
      thetaStart: 0,
      thetaLength: Math.PI * 2,
    };
    this.setMesh();
  }

  getGeometry() {
    return new CylinderGeometry(
      this.data.radiusTop,
      this.data.radiusBottom,
      this.data.height,
      this.data.radialSegments,
      this.data.heightSegments,
      this.data.openEnded,
      this.data.thetaStart,
      this.data.thetaLength
    );
  }

  setMesh(texture = undefined) {
    super.createMesh(this.getGeometry(), texture);
  }

  createGUI(gui, callback) {
    const { onGeoChange, onColorChange } = callback;

    const folder = gui.addFolder("CylinderGeometry");

    super.createGUI(folder, onColorChange);

    folder.add(this.data, "radiusTop", 0, 30).onChange(onGeoChange);
    folder.add(this.data, "radiusBottom", 0, 30).onChange(onGeoChange);
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
