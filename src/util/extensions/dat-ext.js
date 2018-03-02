import dat from 'dat.gui';

/**
 * Extend the dat.GUI interface with easier support for three.js colors.
 */
dat.GUI.prototype.addThreeColor = function (obj, name) {

  const prop = obj[name];

  if (prop.isColor !== true) throw new Error('The named property is not a three.js color.');

  const shim = {
    get value()    { return prop.toArray().map(x => x * 256) },
    set value(val) { prop.fromArray(val.map(x => x / 256)) }
  };

  return this.addColor(shim, name);

};
