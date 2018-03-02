precision highp float;

#define EPSILON 0.0001

uniform sampler2D state;
uniform vec3 rules;
uniform vec2 size;
uniform vec3 colorA;
uniform vec3 colorB;

varying vec2 vUV;

void main() {

  // Sample the state of current cell. The automaton state is seperated from the
  // presentation in the alpha channel.
  float cell = texture2D(state, vUV).a;

  float dx = 1.0 / size.x;
  float dy = 1.0 / size.y;

  vec2 ns = vec2(+dx, 0.0);
  vec2 ew = vec2(0.0, +dy);
  vec2 ne = vec2(+dx, +dy);
  vec2 sw = vec2(+dx, -dy);

  float neighbors = 0.0;

  // Sum the state of the neighboring cells.
  neighbors += ceil(texture2D(state, vUV + ns).a);
  neighbors += ceil(texture2D(state, vUV - ns).a);
  neighbors += ceil(texture2D(state, vUV + ew).a);
  neighbors += ceil(texture2D(state, vUV - ew).a);
  neighbors += ceil(texture2D(state, vUV + ne).a);
  neighbors += ceil(texture2D(state, vUV - ne).a);
  neighbors += ceil(texture2D(state, vUV + sw).a);
  neighbors += ceil(texture2D(state, vUV - sw).a);

  float lo = step(rules.x, neighbors);
  float hi = step(neighbors, rules.y);
  float eq = step(abs(neighbors - rules.z), EPSILON);

  cell = mix(eq, lo * hi * cell, sign(cell));
  cell = max(cell - 0.008, 0.0);

  gl_FragColor = vec4(colorA + cell * colorB, cell);

}
