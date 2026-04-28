import { linkProgram } from "@shaders";
import { poleRenderer } from "./render";
import { Pole } from "../game";

export const getDraw = (gl: WebGL2) => {

    const linked = linkProgram(gl, poleRenderer);
    if (!linked) {
        throw new Error("Failed to link program");
    }
    gl.useProgram(linked.program);

    // Create a buffer with 3 clip-space vertices (a simple triangle)
    // Each vertex is (x, y) already in -1..1 clip space
    const vertices = new Float32Array([
        // x,    y
        -1.0, -1.0,
        -1.0, 1.0,
        1, 1,
        1, 1,
        -1, -1,
        1, -1,
    ]);

    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    // Hook up the attribute
    const posLoc = linked.attributes["a_position"];
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(
        posLoc,
        2,            // size (vec2)
        gl.FLOAT,     // type
        false,        // normalize
        0,            // stride (0 = tightly packed)
        0             // offset
    );


    return (seconds: number, poles: Pole[]) => {
        gl.uniform1f(linked.uniforms["u_time"], seconds);
        gl.drawArrays(gl.TRIANGLES, 0, vertices.length);
    };
};