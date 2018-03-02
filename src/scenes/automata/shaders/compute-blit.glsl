precision highp float;

uniform sampler2D source;
uniform float aspect;

varying vec2 vUV;

void main() {

  vec2 uv = (vUV * 2.0 - 1.0) * vec2(aspect, 1.0);
  gl_FragColor = texture2D(source, uv * 0.5 + 0.5);

}
