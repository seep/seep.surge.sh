import {Mesh, ShaderMaterial, Color, PlaneBufferGeometry} from 'three';
import { ParticleBufferGeometry, FannedCircleParticleGeometry } from 'three-particle-buffer-geometry';
import fragmentShader from './shaders/dotcloud-frag.glsl';
import vertexShader from './shaders/dotcloud-vert.glsl';

export function start(app, gui) {

  const { scene } = app;

  const material = new ShaderMaterial();

  const mesh = new Mesh(new PlaneBufferGeometry(2, 2), material);
  scene.add(mesh);

}
