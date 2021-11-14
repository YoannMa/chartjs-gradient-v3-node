'use strict';

const FS = require('fs/promises');

const { Canvas }   = require('skia-canvas');
const ChartJSLuxon = require('chartjs-adapter-luxon');
const { Chart }    = require('chart.js');

const getConfig = require('./getConfig');

class ChartJSSkiaCanvas {

    constructor(options = {}) {

        const { width, height } = options;

        this.width  = width;
        this.height = height;

        this.chartJS = Chart;

        this.chartJS.register(ChartJSLuxon); // It is not required I believe because it is already registered by requiring the package ?.
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

        for (const scaleId of Object.keys(configuration.options.scales)) {

            // A weird patch, because sometimes borderDashOffset or tickBorderDashOffset is not defined and it cause an error with Skia so I am just forcing the default value

            configuration.options.scales[scaleId].grid                      = configuration.options.scales[scaleId].grid ?? {};
            configuration.options.scales[scaleId].grid.borderDashOffset     = configuration.options.scales[scaleId].grid.borderDashOffset ?? 0.0;
            configuration.options.scales[scaleId].grid.tickBorderDashOffset = configuration.options.scales[scaleId].grid.tickBorderDashOffset ?? configuration.options.scales[scaleId].grid.borderDashOffset;
        }

        const context = canvas.getContext('2d');

        return { chart : new this.chartJS(context, configuration), canvas, context };
    }
}

module.exports = async ({ width, height, data }) => {

    console.time('run Skia');

    const canvasService = new ChartJSSkiaCanvas({ width, height });

    await FS.writeFile('../output/v3/skia.png', await canvasService.renderToBuffer(getConfig(data)));

    console.timeEnd('run Skia');
};
