import {
  LineSegments,
  MeshBasicMaterial,
  // MeshBasicMaterial,
  Mesh,
  EdgesGeometry,
  LineBasicMaterial,
  PointsMaterial,
  Points,
  MeshPhongMaterial,
  Group,
  DoubleSide,
  MeshLambertMaterial,
} from "three";
export default class Shape {
  // position = {
  //     x: 0,
  //     y: 0,
  //     z: 0
  // }
  // rotation = {
  //     x: 0,
  //     y: 0,
  //     z: 0,
  // }
  // scale = {
  //     x: 1,
  //     y: 1,
  //     z: 1,
  // }
  constructor(color, renderMode) {
    this.color = color;
    //0 - Solid, 1 - Wireframe, 2 - Point, 3- normal
    // this.renderMode = renderMode;
    // this.texture = null;
    this.mesh = null;
  }

  getSolidMesh(geo, texture = undefined) {
    let material;
    if (texture) {
      const op = {};
      op[texture.option] = texture.tex;
      material = new MeshLambertMaterial(op);
    } else {
      material = new MeshLambertMaterial({
        color: this.color,
      });
    }

    const obj = new Mesh(geo, material);
    return obj;
  }

  getWireframeMesh(geo) {
    let geometry = new EdgesGeometry(geo);
    let mat = new LineBasicMaterial({
      color: this.color,
      linewidth: 1,
    });
    return new LineSegments(geometry, mat);
  }

  getPointMesh(geo) {
    const mat = new PointsMaterial({ color: this.color, size: 0.1 });
    const object = new Points(geo, mat);
    object.sortParticles = true;
    return object;
  }

  getNormalMesh(geometry) {
    const lineMaterial = new LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.5,
    });
    const meshMaterial = new MeshPhongMaterial({
      color: this.color,
      emissive: 0x072534,
      side: DoubleSide,
      flatShading: false,
    });

    const group = new Group();
    group.add(new LineSegments(geometry, lineMaterial));
    group.add(new Mesh(geometry, meshMaterial));
    return group;
  }

  createMesh(geo, renderMode = 3, texture = null) {
    switch (renderMode) {
      case 0:
        this.mesh = this.getSolidMesh(geo, texture);
        break;
      case 1:
        this.mesh = this.getWireframeMesh(geo);
        break;
      case 2:
        this.mesh = this.getPointMesh(geo);
        break;
      case 3:
        this.mesh = this.getNormalMesh(geo);
        break;
      default:
        console.log("errr");
    }
    this.mesh.castShadow = true;
  }

  getMesh() {
    return this.mesh;
  }

  createGUI(folder, onColorChange) {
    folder.addColor(this, "color").onChange(onColorChange);
  }
}
