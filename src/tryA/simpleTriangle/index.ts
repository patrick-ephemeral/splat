// program-simple.ts
import { IProgram } from "../../../shaders";
import vertexShader from "./vertexShader.glsl";
import fragmentShader from "./fragmentShader.frag";

export const SIMPLE_TRIANGLE: IProgram = {
  vertexShader,
  fragmentShader,
  attributes: ["a_position"],
  uniforms: [],
};
