import { IProgram } from "@shaders";
import vertexShader from "./vertexShader.glsl?raw";
import fragmentShader from "./fragmentShader.glsl?raw";

export const poleRenderer: IProgram = {
  vertexShader,
  fragmentShader,
  attributes: ["a_position"],
  uniforms: ["u_time"],
};
