import * as THREE from "../../node_modules/three/build/three.module.js";
import Shape from "./shape.js";
export default class Torus extends Shape {
  constructor(radius, tube, color = 0xffffff, renderMode = 0) {
    super(color, renderMode);
    this.size = {
      r: radius,
      t: tube,
    };
    this.mesh = undefined;
    this.TUBULAR_SEGMENT_RATE = 32;
    this.RADIAL_SEGMENT_RATE = 32;
    this.setMesh();
  }

  setSolidMesh(texture = undefined) {
    let geometry = new THREE.TorusGeometry(
      this.size.r,
      this.size.t,
      Math.max(parseInt(this.RADIAL_SEGMENT_RATE * this.size.t), 2),
      Math.max(parseInt(this.TUBULAR_SEGMENT_RATE * this.size.r), 2)
    );
    let material;
    if (texture) {
      material = new THREE.MeshLambertMaterial({ map: texture });
    } else material = new THREE.MeshBasicMaterial({ color: this.color });
    return new THREE.Mesh(geometry, material);
  }

  setWiredMesh() {
    let geometry = new THREE.TorusGeometry(
      this.size.r,
      this.size.t,
      Math.max(parseInt(this.RADIAL_SEGMENT_RATE * this.size.t), 2),
      Math.max(parseInt(this.TUBULAR_SEGMENT_RATE * this.size.r), 2)
    );
    let geo = new THREE.WireframeGeometry(geometry);
    const mat = new THREE.LineBasicMaterial({ color: 0x00ff00 });

    return new THREE.LineSegments(geo, mat);
  }

  setPointMesh() {
    let geometry = new THREE.TorusGeometry(
      this.size.r,
      this.size.t,
      Math.max(parseInt(this.RADIAL_SEGMENT_RATE * this.size.t), 2),
      Math.max(parseInt(this.TUBULAR_SEGMENT_RATE * this.size.r), 2)
    );

    let mat = new THREE.PointsMaterial({ color: this.color, size: 0.01 });
    let obj = new THREE.Points(geometry, mat);
    obj.sortParticles = true;
    return obj;
  }

  setMesh(texture = undefined) {
    //console.log(this.renderMode)
    switch (this.renderMode) {
      case 0:
        this.mesh = this.setSolidMesh(texture);
        break;
      case 1:
        this.mesh = this.setWiredMesh();
        break;
      case 2:
        this.mesh = this.setPointMesh();
        break;
      default:
        console.log("errr");
    }
    this.mesh.castShadow = true;
  }

  getMesh() {
    return this.mesh;
  }
}
