float cubicIn(float t) {
  return t * t * t;
}

float cubicInOut(float t) {
  return t < 0.5
    ? 4.0 * t * t * t
    : 0.5 * pow(2.0 * t - 2.0, 3.0) + 1.0;
}

float cubicOut(float t) {
  float f = t - 1.0;
  return f * f * f + 1.0;
}
