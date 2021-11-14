'use strict';

const Path      = require('path');
const FS        = require('fs/promises');

const getConfig = require('./getConfig');

const Puppeteer = require('puppeteer');

const { Chart } = require('chart.js');

module.exports = async ({ width, height, data }) => {

    console.time('run Puppeteer');

    const browser = await Puppeteer.launch({ args : ['--no-sandbox', '--disable-setuid-sandbox'], headless : true });

    const page = await browser.newPage();

    page.on('console', (...args) => console.log(...args));
    page.on('error', (...args) => console.error(...args));
    page.on('pageerror', (...args) => console.error(...args));

    await page.setViewport({ width, height });
    await page.setCacheEnabled(false);

    await page.setContent(`
        <!DOCTYPE html>
        <html>
            <body>
                <canvas id="chart" width="${ width }" height="${ height }"></canvas>
            </body>
        </html>
    `);

    await page.addScriptTag({ path : Path.resolve(__dirname, './node_modules/chart.js/dist/Chart.bundle.min.js') });
    await page.addScriptTag({ path : Path.resolve(__dirname, './getConfig.js') });
    await page.addScriptTag({ path : Path.resolve(__dirname, './ChartJSPlugin.js') });

    const canvasHandle = await page.$(`#chart`);

    await page.evaluate(async (canvas, data) => {

        Chart.plugins.register(ChartJSPlugin);

        const ctx = canvas.getContext('2d');

        new Chart(ctx, getConfig(data));

    }, canvasHandle, data);

    const image = await page.screenshot({ type : 'png', omitBackground : true });

    await FS.writeFile('../output/v2/puppeteer.png', image);

    console.timeEnd('run Puppeteer');

    await browser.close();
};
