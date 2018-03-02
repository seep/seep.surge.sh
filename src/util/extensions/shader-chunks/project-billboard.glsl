mat4 createRotationMatrix(vec3 axis, float angle) {

  axis = normalize(axis);
  float s = sin(angle);
  float c = cos(angle);
  float oc = 1.0 - c;
  return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
              oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
              oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
              0.0,                                0.0,                                0.0,                                1.0);
}

/**
 * Project a vertex as a billboard in camera-space.
 */
vec3 projectBillboardVertex(vec3 vertex, float scale) {

  vec3 cameraRight = vec3(viewMatrix[0][0], viewMatrix[1][0], viewMatrix[2][0]);
  vec3 cameraUp    = vec3(viewMatrix[0][1], viewMatrix[1][1], viewMatrix[2][1]);

  return (cameraRight * vertex.x * scale) + (cameraUp * vertex.y * scale);

}

/**
 * Project a vertex as a billboard in camera-space, at an angle.
 */
vec3 projectBillboardVertex(vec3 vertex, float angle, float scale) {

  vec3 cameraForward = vec3(viewMatrix[0][2], viewMatrix[1][2], viewMatrix[2][2]);
  vec3 cameraRight   = vec3(viewMatrix[0][0], viewMatrix[1][0], viewMatrix[2][0]);
  vec3 cameraUp      = vec3(viewMatrix[0][1], viewMatrix[1][1], viewMatrix[2][1]);

  mat4 billboardRotation = createRotationMatrix(cameraForward, angle);
  vec3 billboardRight    = (billboardRotation * vec4(cameraRight, 1.0)).xyz;
  vec3 billboardUp       = (billboardRotation * vec4(cameraUp, 1.0)).xyz;

  return (billboardRight * vertex.x * scale) + (billboardUp * vertex.y * scale);

}
