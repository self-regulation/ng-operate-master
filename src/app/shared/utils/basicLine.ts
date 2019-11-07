export function basicLine(params: any): any {
    let title: any = '', seriesData: any = [], xData: any = [], unit: any = '', legend: any = null;
    title = params.title, seriesData = params.seriesData, xData = params.xData, unit = params.unit, legend = params.legend;
    return {
        title: {
            text: title,
            subtext: '',
            textStyle: {
                color: '#58afff',
            }
        },
        legend: {
            data: legend,
            textStyle: {
                color: '#36cbcb'
            }
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params: any) {
                return legend[0] + ':<br/>' + params[0].name + ':' + params[0].value + unit;
            },
            axisPointer: {
                animation: false
            }
        },
        grid: {
            left: '8%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            splitLine: {
                show: false
            },
            data: xData,
            axisLine: {
                lineStyle: {
                    color: '#58afff',
                },
            },
            axisLabel: {
                rotate: 45,
            }
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            axisLabel: {
                formatter: '{value}' + unit
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed'
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#58afff',
                }
            }
        },
        series: [{
            name: legend[0],
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: seriesData
        }],
        color: ['#36cbcb', '#faad14', '#975fe4', '#f2637b', '#58afff', '#4ecb73', '#fbd437']
    };
}