import { ILinkedProgram, IProgram } from "./IProgram";

const createShader = (
    gl: WebGL2RenderingContext,
    type: number,
    source: string,
): WebGLShader | false => {
    const shader = gl.createShader(type);
    if (!shader) {
        throw new Error(`Could not create shader of type: ${type}`);
    }

    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!success) {
        console.log(source);
        console.log(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return false;
    }
    return shader;
};

export const linkProgram = (
    gl: WebGL2RenderingContext,
    programSpec: IProgram,
    preLinkChanges?: (preLinkedProgram: WebGLProgram) => void,
): ILinkedProgram | false => {
    const vertShader = createShader(
        gl,
        gl.VERTEX_SHADER,
        programSpec.vertexShader,
    );
    const fragShader = createShader(
        gl,
        gl.FRAGMENT_SHADER,
        programSpec.fragmentShader,
    );

    if (!vertShader || !fragShader) {
        return false;
    }

    const program = gl.createProgram();
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    if (preLinkChanges) {
        preLinkChanges(program);
    }
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.log(gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return false;
    }

    return {
        program,
        attributes: programSpec.attributes
            .map(attr => ({ attr, pointer: gl.getAttribLocation(program, attr) }))
            .reduce((a, { attr, pointer }) => ({ ...a, [attr]: pointer }), {}),
        uniforms: programSpec.uniforms
            .map(unif => ({ unif, pointer: gl.getUniformLocation(program, unif) }))
            .reduce((a, { unif, pointer }) => ({ ...a, [unif]: pointer }), {}),
    };
};
