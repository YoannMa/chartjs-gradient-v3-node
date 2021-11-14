'use strict';

const FS = require('fs/promises');

const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const ChartJSLuxon          = require('chartjs-adapter-luxon');

const getConfig = require('./getConfig');

module.exports = async ({ width, height, data }) => {

    console.time('run Canvas');

    const canvasService = new ChartJSNodeCanvas({ width, height, plugins : { modern : [ChartJSLuxon] } });

    await FS.writeFile('../output/v3/canvas.png', await canvasService.renderToBuffer(getConfig(data)));

    console.timeEnd('run Canvas');
};
