import * as THREE from "../../node_modules/three/build/three.module.js";
import Shape from "./shape.js";
export default class Cone extends Shape {
  constructor(radius, height, color = 0xffffff, renderMode = 0) {
    super(color, renderMode);
    this.size = {
      r: radius,
      h: height,
    };
    this.mesh = undefined;
    this.HEIGHT_SEGMENT_RATE = 12;
    this.RADIAL_SEGMENT_RATE = 32;
    this.setMesh();
  }

  setSolidMesh(texture = undefined) {
    let geometry = new THREE.ConeGeometry(
      this.size.r,
      this.size.h,
      Math.max(parseInt(this.size.r * this.RADIAL_SEGMENT_RATE), 2),
      Math.max(parseInt(this.size.h * this.HEIGHT_SEGMENT_RATE), 1)
    );
    let material;
    if (texture) {
      material = new THREE.MeshLambertMaterial({ map: texture });
    } else
      material = new THREE.MeshBasicMaterial({
        color: this.color,
      });
    return new THREE.Mesh(geometry, material);
  }

  setWiredMesh() {
    let geometry = new THREE.ConeGeometry(
      this.size.r,
      this.size.h,
      Math.max(parseInt(this.size.r * this.RADIAL_SEGMENT_RATE), 2),
      Math.max(parseInt(this.size.h * this.HEIGHT_SEGMENT_RATE), 1)
    );
    let geo = new THREE.EdgesGeometry(geometry);
    let mat = new THREE.LineBasicMaterial({ color: this.color, linewidth: 1 });
    return new THREE.LineSegments(geo, mat);
  }

  setPointMesh() {
    let geometry = new THREE.ConeGeometry(
      this.size.r,
      this.size.h,
      Math.max(parseInt(this.size.r * this.RADIAL_SEGMENT_RATE), 2),
      1 //Segment at 1 to render only real vertices
    );

    let mat = new THREE.PointsMaterial({ color: this.color, size: 0.01 });
    let particles = new THREE.Points(geometry, mat);
    particles.sortParticles = true;
    return particles;
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
