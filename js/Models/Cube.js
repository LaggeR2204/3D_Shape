import * as THREE from "../../node_modules/three/build/three.module.js";
import Shape from "./shape.js";
export default class Cube extends Shape {
  constructor(height, width, depth, color = 0xffffff, renderMode = 0) {
    super(color, renderMode);
    this.size = {
      h: height,
      w: width,
      d: depth,
    };
    this.mesh = undefined;
    this.SEGMENT_RATE = 12;
    this.setMesh();
  }

  setSolidMesh(texture = undefined) {
    let geometry = new THREE.BoxGeometry(
      this.size.w,
      this.size.h,
      this.size.d,
      Math.max(parseInt(this.size.w * this.SEGMENT_RATE), 1),
      Math.max(parseInt(this.size.h * this.SEGMENT_RATE), 1),
      Math.max(parseInt(this.size.d * this.SEGMENT_RATE), 1)
    );
    let material;
    if (texture) {
      material = new THREE.MeshLambertMaterial({ map: texture });
    } else
      material = new THREE.MeshBasicMaterial({
        color: this.color,
      });
    const obj = new THREE.Mesh(geometry, material);
    obj.lookAt(1, 1, 1);
    return obj;
  }

  setWiredMesh() {
    let geometry = new THREE.BoxGeometry(
      this.size.w,
      this.size.h,
      this.size.d,
      Math.max(parseInt(this.size.w * this.SEGMENT_RATE), 1),
      Math.max(parseInt(this.size.h * this.SEGMENT_RATE), 1),
      Math.max(parseInt(this.size.d * this.SEGMENT_RATE), 1)
    );
    let geo = new THREE.EdgesGeometry(geometry);
    let mat = new THREE.LineBasicMaterial({
      color: this.color,
      linewidth: 1,
    });
    return new THREE.LineSegments(geo, mat);
  }

  setPointMesh() {
    let geometry = new THREE.BoxGeometry(
      this.size.w,
      this.size.h,
      this.size.d,
      1, //Segment at 1 to render only real vertices
      1, //Segment at 1 to render only real vertices
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
  //Add getPointMesh
  //Add getLineMesh
}
