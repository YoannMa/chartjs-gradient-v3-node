'use strict';

const FS = require('fs/promises');

const { Canvas } = require('skia-canvas');
const { Chart }  = require('chart.js');

const getConfig     = require('./getConfig');
const ChartJSPlugin = require('./ChartJSPlugin');

class ChartJSSkiaCanvas {

    constructor(options = {}) {

        const { width, height, chartCallback } = options;

        this.width  = width;
        this.height = height;

        this.chartJS = Chart;

        if (chartCallback) {

            chartCallback(this.chartJS);
        }
    }

    /**
     * @param configuration
     * @param mine
     * @param options
     *
     * @returns {Promise<Buffer>}
     */
    renderToBuffer(configuration, mine, options) {

        const { canvas } = this.renderGraph(configuration);

        return canvas.toBuffer(mine, options);
    }

    /**
     * @param configuration
     *
     * @return {Object}
     */
    renderGraph(configuration) {

        const canvas = new Canvas(this.width, this.height);

        configuration.options            = configuration.options || {};
        configuration.options.responsive = false;
        configuration.options.annimation = false;

        const context = canvas.getContext('2d');

        return { chart : new this.chartJS(context, configuration), canvas, context };
    }
}

module.exports = async ({ width, height, data }) => {

    console.time('run Skia');

    const canvasService = new ChartJSSkiaCanvas({
        width, height, chartCallback : (ChartJS) => {

            ChartJS.plugins.register(ChartJSPlugin);
        }
    });

    await FS.writeFile('../output/v2/skia.png', await canvasService.renderToBuffer(getConfig(data)));

    console.timeEnd('run Skia');
};
