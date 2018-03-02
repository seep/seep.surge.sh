float quadraticIn(float t) {
   return t * t;
 }

float quadraticInOut(float t) {
  float p = 2.0 * t * t;
  return t < 0.5 ? p : -p + (4.0 * t) - 1.0;
}

float quadraticOut(float t) {
  return -t * (t - 2.0);
}
