'use strict';

const FS = require('fs/promises');

const run = async () => {

    const options = { width : 1200, height : 600, data : [] };

    for (let i = 0; i < 10; ++i) {

        options.data.push({ x : new Date().getTime() + (i * 1_000 * 60 * 60 * 24), y : Math.random() * 20 - 10 });
    }

    await FS.mkdir('../output/v2', { recursive : true }).catch(() => {});

    await require('./skia')(options);
    await require('./canvas')(options);
    await require('./puppeteer')(options);
};

run().catch(console.error);
