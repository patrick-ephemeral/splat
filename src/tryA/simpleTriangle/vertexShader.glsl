#version 300 es

in vec2 a_position;

void main() {
    // positions are already in clipspace (-1..1)
    gl_Position = vec4(a_position, 0.0, 1.0);
}
