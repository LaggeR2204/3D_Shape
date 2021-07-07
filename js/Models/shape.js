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
    //0 - Solid, 1 - Wireframe, 2 - Point
    this.renderMode = renderMode;
    this.texture = undefined;
  }
}
