import { ShaderChunk } from 'three';

// Easing equations in GLSL.
import ease_back from './shader-chunks/eases/ease-back.glsl';
import ease_bounce from './shader-chunks/eases/ease-bounce.glsl';
import ease_circular from './shader-chunks/eases/ease-circular.glsl';
import ease_cubic from './shader-chunks/eases/ease-cubic.glsl';
import ease_elastic from './shader-chunks/eases/ease-elastic.glsl';
import ease_exponential from './shader-chunks/eases/ease-exponential.glsl';
import ease_linear from './shader-chunks/eases/ease-linear.glsl';
import ease_quadratic from './shader-chunks/eases/ease-quadratic.glsl';
import ease_quartic from './shader-chunks/eases/ease-quartic.glsl';
import ease_quintic from './shader-chunks/eases/ease-quintic.glsl';
import ease_sine from './shader-chunks/eases/ease-sine.glsl';

// Math helpers in GLSL.
import math_constants from './shader-chunks/math-constants.glsl';
import math_map from './shader-chunks/math-map.glsl';

// Project a mesh as a billboard.
import project_billboard from './shader-chunks/project-billboard.glsl';

Object.assign(ShaderChunk, {
  ease_back,
  ease_bounce,
  ease_circular,
  ease_cubic,
  ease_elastic,
  ease_exponential,
  ease_linear,
  ease_quadratic,
  ease_quartic,
  ease_quintic,
  ease_sine,
  math_map,
  math_constants,
  project_billboard,
});

import { Vector3, Vector2 } from 'three';

Vector2.ZERO  = new Vector2(0, 0);
Vector2.POS_X = new Vector3(+1, 0);
Vector2.NEG_X = new Vector3(-1, 0);
Vector2.POS_Y = new Vector3(0, +1);
Vector2.NEG_Y = new Vector3(0, -1);

Vector3.ZERO  = new Vector3(0, 0, 0);
Vector3.POS_X = new Vector3(+1, 0, 0);
Vector3.NEG_X = new Vector3(-1, 0, 0);
Vector3.POS_Y = new Vector3(0, +1, 0);
Vector3.NEG_Y = new Vector3(0, -1, 0);
Vector3.POS_Z = new Vector3(0, 0, +1);
Vector3.NEG_Z = new Vector3(0, 0, -1);
