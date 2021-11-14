const ChartJSPlugin = {
    id           : 'gradient',
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
};

module.exports = ChartJSPlugin;
