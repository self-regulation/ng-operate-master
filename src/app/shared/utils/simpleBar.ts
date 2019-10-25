export function SimpleBar(params: any): any {
    let xData = [], seriesData = [], viewTitle = '', unit = '', legend = null;
    xData = params.xData;
    seriesData = params.seriesData;
    viewTitle = params.viewTitle;
    unit = params.unit;
    legend = params.legend;
    return {
        title: {
            text: viewTitle,
            subtext: '',
            textStyle: {
                color: '#58afff',
            }
        },
        color: ['#3398DB'],
        legend: {
            data: legend,
            textStyle: {
                color: '#03A9F4'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: function (params: any) {
                return legend[0] + ':<br/>' + params[0].name + ':' + params[0].value + unit;
            },
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: xData,
                axisTick: {
                    alignWithLabel: true
                },
                axisLine: {
                    lineStyle: {
                        color: '#3398DB',
                    }
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLabel: {
                    formatter: '{value}' + unit
                },
                axisLine: {
                    lineStyle: {
                        color: '#3398DB',
                    }
                }
            }
        ],
        series: [
            {
                name: legend[0],
                type: 'bar',
                barWidth: '60%',
                data: seriesData
            }
        ]
    };
}