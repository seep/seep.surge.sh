import { Mesh, ShaderMaterial, Color, AdditiveBlending, Vector3 } from 'three';
import { ParticleBufferGeometry, FannedCircleParticleGeometry } from 'three-particle-buffer-geometry';
import fragmentShader from './shaders/dotcloud-frag.glsl';
import vertexShader from './shaders/dotcloud-vert.glsl';

export function start(app) {

  const { scene, camera } = app;
  camera.position.set(0, 0, 4);

  const mesh = new ParticleMesh();
  scene.add(mesh);

}

function ParticleMesh() {

  const geometry = new ParticleBufferGeometry({

    particleGeometry: FannedCircleParticleGeometry(8),
    particleCount: 8000,

  });

  const material = new ShaderMaterial({

    uniforms: {
      scale: { value: 0.01 },
      color: { value: new Color(0xff0000) }
    },
    vertexShader,
    fragmentShader

  });

  return new Mesh(geometry, material);

}
