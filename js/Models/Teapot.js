import * as THREE from "../../node_modules/three/build/three.module.js";

import { TeapotGeometry } from "../Geometries/TeapotGeometry.js";

import Shape from "./shape.js";
export default class Teapot extends Shape {
  constructor(size, color = 0xffffff, renderMode = 0) {
    super(color, renderMode);
    this.size = size;
    this.RADIAL_SEGMENT_RATE = 12;
    this.mesh = undefined;
    this.setMesh();
  }

  setSolidMesh(texture = undefined) {
    const teapotGeometry = new TeapotGeometry(this.size);

    let material;
    if (texture) {
      material = new THREE.MeshLambertMaterial({ map: texture });
    } else
      material = new THREE.MeshBasicMaterial({
        color: this.color,
      });
    return new THREE.Mesh(teapotGeometry, material);
  }

  setWiredMesh() {
    const teapotGeometry = new TeapotGeometry(this.size);
    let geo = new THREE.EdgesGeometry(teapotGeometry);
    let mat = new THREE.LineBasicMaterial({ color: this.color, linewidth: 1 });
    return new THREE.LineSegments(geo, mat);
  }

  setPointMesh() {
    const teapotGeometry = new TeapotGeometry(this.size);
    let mat = new THREE.PointsMaterial({ color: this.color, size: 0.01 });
    let object = new THREE.Points(teapotGeometry, mat);
    object.sortParticles = true;
    return object;
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
