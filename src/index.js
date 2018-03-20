// Extend three.js and dat.gui with helper code before importing any app code.
import './util/extensions/three-ext.js';
import './util/extensions/dat-ext.js';

import { Application } from 'three-application';
import { start as automata } from './scenes/automata/main.js';
import { start as dotcloud } from './scenes/dotcloud/main.js';
import { pick } from './util.js';
import dat from 'dat.gui';

const demos = [ automata, dotcloud ];

window.gui = (on) => on ? localStorage.setItem("controls", true)
                        : localStorage.removeItem("controls");

console.log('To show dat.gui controls, type `gui(true)` and refresh. Enjoy!');

window.onload = function start() {

  const app = new Application();
  const gui = localStorage.getItem("controls") ? new dat.GUI() : null;

  //pick(demos)(app, gui); // set up the specific app we're gonna show
  dotcloud(app, gui);

  document.getElementById('background').appendChild(app.canvas);

  app.start();

};
