'use strict';

const FS = require('fs/promises');

const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

const getConfig     = require('./getConfig');
const ChartJSPlugin = require('./ChartJSPlugin');

module.exports = async ({ width, height, data }) => {

    console.time('run Canvas');

    const canvasService = new ChartJSNodeCanvas({
        width, height, chartCallback : (ChartJS) => {

            ChartJS.plugins.register(ChartJSPlugin);
        }
    });

    await FS.writeFile('../output/v2/canvas.png', await canvasService.renderToBuffer(getConfig(data)));

    console.timeEnd('run Canvas');
};
