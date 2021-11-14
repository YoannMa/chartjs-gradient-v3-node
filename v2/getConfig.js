const getConfig = (data) => {

    return {
        type    : 'line',
        data    : {
            datasets : [
                {
                    data,
                    label                  : 'data',
                    fill                   : true,
                    cubicInterpolationMode : 'monotone'
                }
            ]
        },
        options : {
            legend     : { display : false },
            animation  : false,
            responsive : false,
            elements   : { point : { radius : 0 } },
            scales     : {
                xAxes : [{ type : 'time', time : { unit : 'day' } }],
                yAxes : [{ tile : { display : false } }]
            }
        }
    };
};

module.exports = getConfig;
