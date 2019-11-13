export function basicLine(seriesData: any, xData: any, legend: any, unit: any = '', title?: string, min?: number, max?: number): any {
    return {
        title: {
            text: title ? title : '',
            subtext: '',
            textStyle: {
                color: '#58afff',
            },
            left: 'center'
        },
        legend: {
            data: legend,
            textStyle: {
                color: '#36cbcb'
            },
            top: 30
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params: any) {
                return legend[0] + ':<br/>' + params[0].name + ':&nbsp;&nbsp;&nbsp;' + params[0].value + unit;
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
            },
            min: min ? min : null,
            max: max ? max : null
        },
        dataZoom: [{
            type: 'inside',
            start: 50,
            end: 100
        }, {
            start: 50,
            end: 100,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            handleStyle: {
                color: '#fff',
                shadowBlur: 3,
                shadowColor: 'rgba(0, 0, 0, 0.6)',
                shadowOffsetX: 2,
                shadowOffsetY: 2
            }
        }],
        series: seriesData,
        color: ['#36cbcb', '#faad14', '#975fe4', '#f2637b', '#58afff', '#4ecb73', '#fbd437']
    };
}