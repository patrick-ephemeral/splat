#version 300 es

precision highp float;

in vec2 v_localPosition;
in float v_team;

out vec4 outColor;

void main() {
    // The mesh is a square, but the pole should look round.
    float distanceFromCenter = length(v_localPosition);
    if (distanceFromCenter > 1.0) {
        discard;
    }

    vec3 color = vec3(0.4, 0.4, 0.5); // neutral / black

    if (v_team < 20.0) {
        color = vec3(1.0, 0.15, 0.05); // warm / red
    } else if (v_team > 30.0) {
        color = vec3(0.1, 0.25, 1.0); // cold / blue
    }

    outColor = vec4(color, 1.0);
}
