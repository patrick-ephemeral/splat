// program-simple.ts
import { IProgram } from "../../../shaders";
import vertexShader from "./vertexShader.glsl?raw";
import fragmentShader from "./fragmentShader.glsl?raw";

const simpleTriangle: IProgram = {
  vertexShader,
  fragmentShader,
  attributes: ["a_position"],
  uniforms: ["u_time"],
};


export default simpleTriangle;