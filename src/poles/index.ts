import { linkProgram } from "@shaders";
import { poleRenderer } from "./render";
import { Pole } from "../game";

const HEX_ROW_SPACING = Math.sqrt(3) / 2;

const teamToNumber = (team: Pole["team"]) => Number(team);

const poleToWorldPosition = (pole: Pole): [number, number] => {
    const rowOffset = pole.y % 2 === 1 ? 0.5 : 0;
    return [pole.x + rowOffset, pole.y * HEX_ROW_SPACING];
};

const makeOrtho2d = (
    left: number,
    right: number,
    bottom: number,
    top: number,
): Float32Array => {
    // GLSL matrices are supplied in column-major order.
    return new Float32Array([
        2 / (right - left), 0, 0,
        0, 2 / (top - bottom), 0,
        -(right + left) / (right - left), -(top + bottom) / (top - bottom), 1,
    ]);
};

const makeCameraMatrix = (
    canvas: HTMLCanvasElement,
    cameraX: number,
    cameraY: number,
    zoom: number,
): Float32Array => {
    const aspect = canvas.width / canvas.height;

    // zoom is measured in vertical world units visible on screen.
    const halfHeight = zoom / 2;
    const halfWidth = halfHeight * aspect;

    return makeOrtho2d(
        cameraX - halfWidth,
        cameraX + halfWidth,
        cameraY - halfHeight,
        cameraY + halfHeight,
    );
};

export const getDraw = (gl: WebGL2RenderingContext) => {
    const linked = linkProgram(gl, poleRenderer);
    if (!linked) {
        throw new Error("Failed to link program");
    }

    gl.useProgram(linked.program);

    // A square around the origin. The fragment shader discards the corners,
    // turning each instance into a round pole.
    const vertices = new Float32Array([
        -1, -1,
        -1, 1,
        1, 1,

        1, 1,
        -1, -1,
        1, -1,
    ]);

    const vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        throw new Error("Could not create vertex buffer");
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLoc = linked.attributes["a_position"];
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const polePositionBuffer = gl.createBuffer();
    if (!polePositionBuffer) {
        throw new Error("Could not create pole position buffer");
    }

    const teamBuffer = gl.createBuffer();
    if (!teamBuffer) {
        throw new Error("Could not create team buffer");
    }

    const polePositionLoc = linked.attributes["a_polePosition"];
    gl.bindBuffer(gl.ARRAY_BUFFER, polePositionBuffer);
    gl.enableVertexAttribArray(polePositionLoc);
    gl.vertexAttribPointer(polePositionLoc, 2, gl.FLOAT, false, 0, 0);
    gl.vertexAttribDivisor(polePositionLoc, 1);

    const teamLoc = linked.attributes["a_team"];
    gl.bindBuffer(gl.ARRAY_BUFFER, teamBuffer);
    gl.enableVertexAttribArray(teamLoc);
    gl.vertexAttribPointer(teamLoc, 1, gl.FLOAT, false, 0, 0);
    gl.vertexAttribDivisor(teamLoc, 1);

    // Temporary hard-coded camera. This is the piece you can later update
    // from keyboard/mouse input for panning and zooming.
    const camera = {
        x: 10,
        y: 8,
        zoom: 20,
    };

    return (_seconds: number, poles: Pole[]) => {
        gl.useProgram(linked.program);

        const polePositions = new Float32Array(poles.length * 2);
        const teams = new Float32Array(poles.length);

        poles.forEach((pole, index) => {
            const [x, y] = poleToWorldPosition(pole);
            polePositions[index * 2 + 0] = x;
            polePositions[index * 2 + 1] = y;
            teams[index] = teamToNumber(pole.team);
        });

        gl.bindBuffer(gl.ARRAY_BUFFER, polePositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, polePositions, gl.DYNAMIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, teamBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, teams, gl.DYNAMIC_DRAW);

        const viewProjection = makeCameraMatrix(
            gl.canvas as HTMLCanvasElement,
            camera.x,
            camera.y,
            camera.zoom,
        );

        gl.uniformMatrix3fv(linked.uniforms["u_viewProjection"], false, viewProjection);
        gl.uniform1f(linked.uniforms["u_poleRadius"], 0.15);

        gl.drawArraysInstanced(gl.TRIANGLES, 0, 6, poles.length);
    };
};
