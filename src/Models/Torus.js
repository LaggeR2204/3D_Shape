import { TorusGeometry } from "three";
import Shape from "./shape.js";
export default class Torus extends Shape {
  constructor(radius, tube, color = 0xffffff) {
    super(color);
    this.data = {
      radius: radius,
      tube: tube,
      radialSegments: 16,
      tubularSegments: 100,
      arc: Math.PI * 2,
    };
    this.setMesh();
  }

  getGeometry() {
    return new TorusGeometry(
      this.data.radius,
      this.data.tube,
      this.data.radialSegments,
      this.data.tubularSegments,
      this.data.arc
    );
  }

  setMesh(renderMode = 3, texture = null) {
    super.createMesh(this.getGeometry(), renderMode, texture);
  }

  createGUI(gui, callback) {
    const { onGeoChange, onColorChange } = callback;

    const folder = gui.addFolder("THREE.TorusGeometry");

    super.createGUI(folder, onColorChange);

    folder.add(this.data, "radius", 1, 20).onChange(onGeoChange);
    folder.add(this.data, "tube", 0.1, 10).onChange(onGeoChange);
    folder
      .add(this.data, "radialSegments", 2, 30)
      .step(1)
      .onChange(onGeoChange);
    folder
      .add(this.data, "tubularSegments", 3, 200)
      .step(1)
      .onChange(onGeoChange);
    folder.add(this.data, "arc", 0.1, Math.PI * 2).onChange(onGeoChange);

    return folder;
  }
}
