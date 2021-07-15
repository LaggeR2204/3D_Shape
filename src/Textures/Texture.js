import {
  TextureLoader,
  CubeTextureLoader,
  RGBFormat,
  // MirroredRepeatWrapping,
} from "three";

import BrickImage from "./image/brick_diffuse.jpg";
import px from "./image/px.jpg";
import py from "./image/py.jpg";
import pz from "./image/pz.jpg";
import nx from "./image/nx.jpg";
import ny from "./image/ny.jpg";
import nz from "./image/nz.jpg";

const textureLoader = new TextureLoader();
const cubeTextureLoader = new CubeTextureLoader();

const tex1 = function () {
  const urls = [px, nx, py, ny, pz, nz];

  const reflectionCube = cubeTextureLoader.load(urls);
  reflectionCube.format = RGBFormat;
  // console.log(reflectionCube);
  return reflectionCube;
};

const brickTex = function () {
  const bricks = textureLoader.load(BrickImage);
  // bricks.wrapS = MirroredRepeatWrapping;
  // bricks.wrapT = MirroredRepeatWrapping;
  // bricks.repeat.set(9, 1);
  // console.log(bricks);
  return bricks;
};

const loadCustomTex = function (file) {
  return textureLoader.load(file);
};

export const getTexture = function (option, file = null) {
  switch (option) {
    case "Texture 1":
      return {
        tex: tex1(),
        option: "envMap",
      };
    case "Brick":
      return {
        tex: brickTex(),
        option: "map",
      };
    case "custom":
      return {
        tex: loadCustomTex(file),
        option: "map",
      };
    default:
      return null;
      break;
  }
};
