#version 300 es

precision highp float;

uniform float u_time; 

in vec2 v_uv;
out vec4 outColor;

void main() {

    float red = v_uv.x * v_uv.y - sin(u_time);
    float green = (1.0 - v_uv.x) * (1.0 - v_uv.y) - sin(u_time * 0.5);
    float blue = (1.0 - v_uv.x) * v_uv.y - sin(u_time * 0.25);
    float white = v_uv.x * (1.0 - v_uv.y) - sin(u_time * 1.5);

    outColor = vec4(red + white, green + white, blue + white, 1.0); 
}
