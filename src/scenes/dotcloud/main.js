import { Mesh, ShaderMaterial, Color } from 'three';
import { ParticleBufferGeometry, FannedCircleParticleGeometry } from 'three-particle-buffer-geometry';
import fragmentShader from './shaders/dotcloud-frag.glsl';
import vertexShader from './shaders/dotcloud-vert.glsl';

export function start(app, gui) {

  const { scene, camera } = app;
  camera.position.set(0, 0, 4);

  const mesh = new ParticleMesh(app, gui);
  scene.add(mesh);

  app.addEventListener('update', event => {

    mesh.material.uniforms.time.value = app.time;

  })

}

function ParticleMesh(app, gui) {

  const geometry = new ParticleBufferGeometry({

    particleGeometry: FannedCircleParticleGeometry(8),
    particleCount: 1000,

  });

  const material = new ShaderMaterial({

    uniforms: {
      time: { value: 0.0 },
      scale: { value: 0.01 },
      count: { value: geometry.particleCount },

      colorA: { value: new Color(0xff0000) },
      colorB: { value: new Color(0x00ff00) },

      radiusMultiplier: { value: 1.0 },
      rotationalMultiplierA: { value: 57.0 },
      rotationalMultiplierB: { value: 57.0 },
    },
    vertexShader,
    fragmentShader

  });

  if (gui) {

    gui.addThreeColor(material.uniforms.colorA, 'value').name('color a');
    gui.addThreeColor(material.uniforms.colorB, 'value').name('color b');

    gui.add(material.uniforms.radiusMultiplier, 'value').name('rad mult');
    gui.add(material.uniforms.rotationalMultiplierA, 'value').name('rot mult a');
    gui.add(material.uniforms.rotationalMultiplierB, 'value').name('rot mult b');

  }

  return new Mesh(geometry, material);

}
