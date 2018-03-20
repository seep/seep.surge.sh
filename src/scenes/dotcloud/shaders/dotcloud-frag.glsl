uniform vec3 colorA;
uniform vec3 colorB;

varying float distoration;

void main() {

  gl_FragColor = vec4(mix(colorA, colorB, distoration * 20.0), 1.0);

}
