// tryA.ts
import { linkProgram } from "../../shaders";
import simpleTriangle from "./simpleTriangle";

export const tryA = (canvas: HTMLCanvasElement): void => {
    const gl = canvas.getContext("webgl2");
    if (!gl) {
        console.error("WebGL2 not supported");
        return;
    }

    // Link the simple program
    const linked = linkProgram(gl, simpleTriangle);
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

    const start = performance.now();

    // Clear + draw
    const draw = () => {
        // Make the canvas crisp on HiDPI screens and match its CSS size
        const dpr = window.devicePixelRatio || 1;
        const displayWidth = Math.floor(canvas.clientWidth * dpr) || canvas.width || 300;
        const displayHeight = Math.floor(canvas.clientHeight * dpr) || canvas.height || 150;
        if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
            canvas.width = displayWidth;
            canvas.height = displayHeight;
        }
        gl.viewport(0, 0, canvas.width, canvas.height);

        const now = performance.now();
        const seconds = (now - start) / 700;

        gl.uniform1f(linked.uniforms["u_time"], seconds);

        gl.clearColor(0.08, 0.08, 0.1, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, vertices.length);
        window.requestAnimationFrame(draw);
    };
    draw();
};
