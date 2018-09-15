uniform vec3 colorA;
uniform vec3 colorB;
uniform vec2 scale;
uniform vec2 mouse;

varying vec2 vUV;

#define HASHSCALE1 0.1031
#define HASHSCALE3 vec3(0.1031, 0.1030, 0.0973)
#define HASHSCALE4 vec4(1031, 0.1030, 0.0973, 0.1099)

vec2 hash22(vec2 p) {
	vec3 o = fract(p.xyx * HASHSCALE3);
  o += dot(o, o.yzx + 19.19);
  return fract((o.xx + o.yz) * o.zy);
}

float VoronoiDistance(vec2 x) {

  vec2 p = floor(x);
  vec2 f = fract(x);

  vec2 mb;
  vec2 mr;

  float res = 8.0;

  for (int j = -1; j <= 1; j++) {
    for (int i = -1; i <= 1; i++) {
      vec2 b = vec2(i, j);
      vec2 r = b + hash22(p + b) - f;
      float  d = dot(r, r);

      if (d < res) {
        res = d;
        mr = r;
        mb = b;
      }
    }
  }

  res = 8.0;

  for (int j = -2; j <= 2; j++) {
    for (int i = -2; i <= 2; i++) {
      vec2 b = vec2(i, j);
      vec2 r = b + hash22(p + b) - f;
      float d  = dot(0.5 * (mr + r), normalize(r - mr));

      res = min(res, d);
    }
  }

  return res;

}

void main() {

  float edges = 1.0 - VoronoiDistance(vUV * scale);

  float angle = length(mouse - vUV);
  angle = fract(angle * (edges * 2.0 + 2.0));

  gl_FragColor = vec4(mix(colorA, colorB, angle), 1.0);

}