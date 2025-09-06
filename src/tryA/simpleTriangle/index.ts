// program-simple.ts
import { IProgram } from "../../../shaders";
import vertexShader from "./vertexShader.glsl?raw";
import fragmentShader from "./fragmentShader.glsl?raw";

export const SIMPLE_TRIANGLE: IProgram = {
  vertexShader,
  fragmentShader,
  attributes: ["a_position"],
  uniforms: [],
};
