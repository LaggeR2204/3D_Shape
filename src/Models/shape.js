import {
  LineSegments,
  Mesh,
  EdgesGeometry,
  LineBasicMaterial,
  PointsMaterial,
  Points,
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
  constructor(color) {
    this.color = color;
    //0 - Solid, 1 - Wireframe, 2 - Point, 3- normal
    // this.renderMode = renderMode;
    // this.texture = null;
    this.mesh = null;
  }

  getSolidMesh(geo, texture, option) {
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
    material.side = DoubleSide;

    const obj = new Mesh(geo, material);
    option?.position &&
      obj.position.set(option.position.x, option.position.y, option.position.z);
    return obj;
  }

  getWireframeMesh(geo, option) {
    let geometry = new EdgesGeometry(geo);
    let mat = new LineBasicMaterial({
      color: this.color,
      linewidth: 1,
    });
    const obj = new LineSegments(geometry, mat);
    option?.position &&
      obj.position.set(option.position.x, option.position.y, option.position.z);
    return obj;
  }

  getPointMesh(geo, option) {
    const mat = new PointsMaterial({ color: this.color, size: 0.1 });
    const obj = new Points(geo, mat);
    obj.sortParticles = true;
    option?.position &&
      obj.position.set(option.position.x, option.position.y, option.position.z);
    return obj;
  }

  getNormalMesh(geometry, option) {
    const lineMaterial = new LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.5,
    });
    const meshMaterial = new MeshLambertMaterial({
      color: this.color,
      emissive: 0x072534,
      side: DoubleSide,
      // flatShading: false,
    });

    const group = new Group();
    group.add(new LineSegments(geometry, lineMaterial));
    const mesh = new Mesh(geometry, meshMaterial);
    mesh.castShadow = true;
    group.add(mesh);
    option?.position &&
      group.position.set(
        option.position.x,
        option.position.y,
        option.position.z
      );
    return group;
  }

  createMesh(geo, renderMode = 3, texture = null, option = null) {
    switch (renderMode) {
      case 0:
        this.mesh = this.getSolidMesh(geo, texture, option);
        break;
      case 1:
        this.mesh = this.getWireframeMesh(geo, option);
        break;
      case 2:
        this.mesh = this.getPointMesh(geo, option);
        break;
      case 3:
        this.mesh = this.getNormalMesh(geo, option);
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
