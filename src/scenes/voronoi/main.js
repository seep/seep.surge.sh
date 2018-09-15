import { Mesh, ShaderMaterial, PlaneBufferGeometry, Vector3, Vector2 } from 'three';
import fragmentShader from './shaders/voronoi-frag.glsl';
import vertexShader from './shaders/voronoi-vert.glsl';

export function start(app, gui) {

  const { scene } = app;

  const uniforms = Object.assign({
    colorA: { value: new Vector3(1, 0, 0) },
    colorB: { value: new Vector3(0, 1, 0) },
    scale: { value: new Vector2(10, 10) }
  }, app.uniforms);

  const material = new ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
  });

  const mesh = new Mesh(new PlaneBufferGeometry(2, 2), material);
  scene.add(mesh);

}
