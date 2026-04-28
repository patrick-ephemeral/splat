#version 300 es

precision highp float;

uniform float u_time; 

in vec2 v_uv;
out vec4 outColor;

void main() {
    outColor = vec4(1.0, 0.0, 0.0, 1.0); 
}
