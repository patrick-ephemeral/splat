export interface IProgram {
    vertexShader: string;
    fragmentShader: string;
    attributes: string[];
    uniforms: string[];
}

export interface ILinkedProgram {
    program: WebGLProgram;
    attributes: {
        [key: string]: number,
    };
    uniforms: {
        [key: string]: number,
    };
}
