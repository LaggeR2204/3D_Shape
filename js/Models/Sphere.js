import * as THREE from "../../node_modules/three/build/three.module.js";
import Shape from "./shape.js";
export default class Sphere extends Shape {
  constructor(radius, color = 0xffffff, renderMode = 0) {
    super(color, renderMode);
    this.size = {
      r: radius,
    };
    this.mesh = undefined;
    this.RADIAL_SEGMENT_RATE = 32;
    this.setMesh();
  }

  setSolidMesh(texture = undefined) {
    let geometry = new THREE.SphereGeometry(
      this.size.r,
      Math.max(parseInt(this.size.r * this.RADIAL_SEGMENT_RATE), 2),
      Math.max(parseInt(this.size.r * this.RADIAL_SEGMENT_RATE), 2)
    );
    let material;
    if (texture !== undefined) {
      material = new THREE.MeshLambertMaterial({ map: texture });
    } else material = new THREE.MeshLambertMaterial({ color: this.color });
    return new THREE.Mesh(geometry, material);
  }

  setWiredMesh() {
    let geometry = new THREE.SphereGeometry(
      this.size.r,
      Math.max(parseInt(this.size.r * this.RADIAL_SEGMENT_RATE), 2),
      Math.max(parseInt(this.size.r * this.RADIAL_SEGMENT_RATE), 2)
    );
    let geo = new THREE.EdgesGeometry(geometry);
    let mat = new THREE.LineBasicMaterial({ color: this.color, linewidth: 1 });
    return new THREE.LineSegments(geo, mat);
  }

  setPointMesh() {
    let geometry = new THREE.SphereGeometry(
      this.size.r,
      Math.max(parseInt(this.size.r * this.RADIAL_SEGMENT_RATE), 2),
      Math.max(parseInt(this.size.r * this.RADIAL_SEGMENT_RATE), 2)
    );
    let geo = new THREE.Geometry();

    for (var i = 0; i < geometry.vertices.length; i++) {
      geo.vertices.push(geometry.vertices[i]);
    }

    let mat = new THREE.PointsMaterial({ color: this.color, size: 0.01 });
    let particles = new THREE.Points(geo, mat);
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
