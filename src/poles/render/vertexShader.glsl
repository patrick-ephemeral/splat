#version 300 es

in vec2 a_position;
in vec2 a_polePosition;
in float a_team;

uniform mat3 u_viewProjection;
uniform float u_poleRadius;

out vec2 v_localPosition;
out float v_team;

void main() {
    vec2 worldPosition = a_polePosition + a_position * u_poleRadius;
    vec3 clipPosition = u_viewProjection * vec3(worldPosition, 1.0);

    gl_Position = vec4(clipPosition.xy, 0.0, 1.0);

    // a_position is in the range -1..1, centered on the pole.
    v_localPosition = a_position;
    v_team = a_team;
}
