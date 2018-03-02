precision highp float;

uniform sampler2D state;

varying vec2 vUV;

void main() {

  gl_FragColor = texture2D(state, vUV);

}
