float circularIn(float t) {
  return 1.0 - sqrt(1.0 - t * t);
}

float circularInOut(float t) {
  return t < 0.5
    ? 0.5 * (1.0 - sqrt(1.0 - 4.0 * t * t))
    : 0.5 * (sqrt((3.0 - 2.0 * t) * (2.0 * t - 1.0)) + 1.0);
}

float circularOut(float t) {
  return sqrt((2.0 - t) * t);
}
