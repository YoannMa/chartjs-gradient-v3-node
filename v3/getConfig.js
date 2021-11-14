const getConfig = (data) => {

    return {
        type    : 'line',
        data    : {
            datasets : [
                {
                    data,
                    fill                   : true,
                    cubicInterpolationMode : 'monotone',
                    parsing                : false,
                    normalized             : true,
                    backgroundColor        : function (context) {

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
            ]
        },
        options : {
            animation  : false,
            responsive : false,
            elements   : { point : { radius : 0 } },
            plugins    : {
                legend  : { display : false },
                tooltip : { enabled : false }
            },
            scales     : {
                x : { type : 'time', time : { unit : 'day' } },
                y : { title : { display : false } }
            }
        }
    };
};

module.exports = getConfig;
