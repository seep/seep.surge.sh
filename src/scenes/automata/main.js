import { OrthographicCamera, PlaneBufferGeometry, Mesh, RawShaderMaterial, Math as MathExt, Color, Vector3, Vector2, WebGLRenderTarget, TextureLoader, LinearFilter } from 'three';
import computeBlitShader from './shaders/compute-blit.glsl';
import computeFragShader from './shaders/compute-frag.glsl';
import renderFragShader from './shaders/render-frag.glsl';
import renderVertShader from './shaders/render-vert.glsl';
import { pick } from '../../util.js'
import dat from 'dat.gui';

const loader = new TextureLoader();

const palettes = [
  [ new Color(0x362696), new Color(0x8b00ad) ], // purple
  [ new Color(0x17a300), new Color(0x0b3600) ], // green
  [ new Color(0xd0162c), new Color(0xff4040) ]  // red
];

export function start(app, gui) {

  const { renderer, scene } = app;
  renderer.autoClear = false;
  renderer.antialias = false;
  renderer.depth = false;

  const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
  scene.camera = camera;

  const [ colorA, colorB ] = pick(palettes);

  const computeMaterial = new RawShaderMaterial({

    uniforms: {
      colorA: { value: colorA },
      colorB: { value: colorB },
      state:  { type: 't', value: null },
      rules:  { value: new Vector3(2.0, 5.0, 3.0) },
      size:   { value: new Vector2() },
    },
    vertexShader: renderVertShader,
    fragmentShader: computeFragShader,

  });

  const blitMaterial = new RawShaderMaterial({

    uniforms: {
      source: { value: loader.load('images/dodec.png', loaded) },
      aspect: { value: 0.0 }
    },
    vertexShader: renderVertShader,
    fragmentShader: computeBlitShader,

  });

  const displayMaterial = new RawShaderMaterial({

    uniforms: {
      state: { type: 't', value: null },
    },
    vertexShader: renderVertShader,
    fragmentShader: renderFragShader,

  });

  const mesh = new Mesh(new PlaneBufferGeometry(2, 2), displayMaterial);
  scene.add(mesh);

  let prevTarget = new WebGLRenderTarget(1, 1, {
    minFilter: LinearFilter,
    magFilter: LinearFilter,
    stencilBuffer: false,
    depthBuffer: false,
  });

  let nextTarget = prevTarget.clone();

  if (gui) {

    gui.addThreeColor(computeMaterial.uniforms.colorA, 'value').name('color a');
    gui.addThreeColor(computeMaterial.uniforms.colorB, 'value').name('color b');

  }

  function blit() {

    const { width, height } = app;

    blitMaterial.uniforms.aspect.value = width / height;

    mesh.material = blitMaterial;
    renderer.render(scene, camera, prevTarget);

  }

  function update() {

    computeMaterial.uniforms.state.value = prevTarget.texture;
    displayMaterial.uniforms.state.value = nextTarget.texture;

    mesh.material = computeMaterial;
    renderer.render(scene, camera, nextTarget);
    mesh.material = displayMaterial;

    [ prevTarget, nextTarget ] = [ nextTarget, prevTarget ];

  }

  function restart() {

    const { width, height } = app;

    prevTarget.setSize(width, height);
    nextTarget.setSize(width, height);
    computeMaterial.uniforms.size.value.set(width, height);

    blit();

  }

  function loaded() {

    restart();

    app.addEventListener('update', update);
    app.addEventListener('resize', restart);

  }

}
