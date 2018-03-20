#include <math_constants>
#include <project_billboard>

uniform float time;
uniform float scale;
uniform float count;

uniform float radiusMultiplier;
uniform float rotationalMultiplierA;
uniform float rotationalMultiplierB;

attribute float pid;
attribute vec3 seed;

varying float distoration;

vec3 DotcloudPosition(float pid, vec3 seed) {

  float sintime = sin(time);

  float norm = pid / count;
  float ring = mod(pid, 10.0) / 10.0;

  float theta = norm * PI * 2.0 + (time * 0.2) + (sintime * 0.2);

  distoration = sin(theta * 8.0 + abs(sintime) + (ring * PI * 20.0)) * mix(0.03, 0.06, sintime);

  float radius = mix(0.5, 1.0, ring) + distoration;

  vec3 position = vec3(cos(theta), sin(theta), 0.0) * radius;

  return position;

}

void main() {

  vec3 transformed = DotcloudPosition(pid, seed) + projectBillboardVertex(position, scale);

  #include <project_vertex>

}
