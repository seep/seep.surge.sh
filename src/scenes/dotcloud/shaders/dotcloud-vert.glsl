#include <project_billboard>

uniform float scale;

attribute float pid;
attribute vec3 seed;

void main() {

  vec3 origin = (seed * 2.0) - 1.0;
  vec3 transformed = origin + projectBillboardVertex(position, scale);

  #include <project_vertex>

}
