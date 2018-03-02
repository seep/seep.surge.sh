#ifndef HALF_PI
#define HALF_PI 1.5707963267948966
#endif

float sineIn(float t) {
  return sin((t - 1.0) * HALF_PI) + 1.0;
}

float sineInOut(float t) {
  return -0.5 * (cos(PI * t) - 1.0);
}

float sineOut(float t) {
  return sin(t * HALF_PI);
}
