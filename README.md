# ChartJS v3.6.0

see : https://github.com/YoannMa/chartjs-gradient-v3-node/blob/main/v3/getConfig.js#L13

```javascript

{
    backgroundColor : function (context) {

        const { scales, chartArea } = context.chart;

        if (!chartArea) {

            return 'rgba(78, 246, 23, 1)';
        }

        const height  = chartArea.bottom - chartArea.top;
        const zeroPos = Math.max(Math.min(Math.floor(scales.y.getPixelForValue(0) - chartArea.top) / height, 1.0), 0);

        const gradient = context.chart.ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);

        gradient.addColorStop(0, 'rgba(66, 228, 13, 1)');
        gradient.addColorStop(zeroPos, 'rgba(94, 154, 19, 1)');
        gradient.addColorStop(zeroPos, 'rgba(153, 9, 9, 1)');
        gradient.addColorStop(1, 'rgba(214, 13, 13, 1)');

        return gradient;
    }
}

```

## Canvas

![ChartJS v3.6.0 Canvas](./output/v3/canvas.png?raw=true "ChartJS v3.6.0 Canvas")

## Skia-Canvas

![ChartJS v3.6.0 Skia-Canvas](./output/v3/skia.png?raw=true "ChartJS v3.6.0 Skia-Canvas")

## Puppeteer

![ChartJS v3.6.0 Puppeteer](./output/v3/puppeteer.png?raw=true "ChartJS v3.6.0 Puppeteer")

# ChartJS v2.9.4

see : https://github.com/YoannMa/chartjs-gradient-v3-node/blob/main/v2/ChartJSPlugin.js

```javascript

{
    beforeRender : function (context) {

        const { chartArea } = context.chart;

        if (!chartArea) {

            return 'rgba(78, 246, 23, 1)';
        }

        const height  = chartArea.bottom - chartArea.top;
        const zeroPos = Math.max(Math.min(Math.floor(context.scales['y-axis-0'].getPixelForValue(0) - chartArea.top) / height, 1.0), 0);

        const gradient = context.chart.ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);

        gradient.addColorStop(0, 'rgba(66, 228, 13, 1)');
        gradient.addColorStop(zeroPos, 'rgba(94, 154, 19, 1)');
        gradient.addColorStop(zeroPos, 'rgba(153, 9, 9, 1)');
        gradient.addColorStop(1, 'rgba(214, 13, 13, 1)');

        const dataset = context.chart.data.datasets[0];

        dataset._meta[Object.keys(dataset._meta)[0]].dataset._model.backgroundColor = gradient;
    }
}

```

## Canvas

![ChartJS v2.9.4 Canvas](./output/v2/canvas.png?raw=true "ChartJS v2.9.4 Canvas")

## Skia-Canvas

![ChartJS v2.9.4 Skia-Canvas](./output/v2/skia.png?raw=true "ChartJS v2.9.4 Skia-Canvas")

## Puppeteer

![ChartJS v2.9.4 Puppeteer](./output/v2/puppeteer.png?raw=true "ChartJS v2.9.4 Puppeteer")
