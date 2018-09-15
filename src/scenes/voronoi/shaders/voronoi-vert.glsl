varying vec2 vUV;

void main() {

  gl_Position = vec4(position.xy, 0.0, 1.0);
  vUV = (position.xy + 1.0) * 0.5;

}
