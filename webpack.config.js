const path = require('path');
const copy = require('copy-webpack-plugin');
const clean = require('clean-webpack-plugin');

const debug = process.env.NODE_ENV !== 'production';
const outdir = path.resolve(__dirname, 'dist');

module.exports = {

  entry: './src/index.js',

  output: {
    path: outdir,
    filename: 'index.js'
  },

  module: {
    rules: [
      { test: /\.glsl$/, use: 'raw-loader' }
    ]
  },

  plugins: [
    new clean([ outdir ]),
    new copy([ { from: 'static', to: outdir } ])
  ],

  devtool: debug ? 'eval-source-map' : 'source-map'

};
