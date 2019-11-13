export function barLine(params: any): any {
    let title: any = '', seriesData: any = [], xData: any = [], legend: any = null, y1AxisName = '', y1unit: any = '', y2AxisName = '', y2unit: any = '';
    title = params.title, seriesData = params.seriesData, xData = params.xData, legend = params.legend,
        y1AxisName = params.y1AxisName, y1unit = params.y1unit, y2AxisName = params.y2AxisName, y2unit = params.y2unit;

    return {
        title: {
            text: title,
            subtext: '',
            textStyle: {
                color: '#58afff',
                height: 100
            },
            left: 400,
            top: -5
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        toolbox: {
            feature: {
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ['line'] },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        legend: {
            data: legend,
            textStyle: {
                color: '#36cbcb'
            },
            top: 25,
        },
        grid: {
            left: '8%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: xData,
                axisPointer: {
                    type: 'shadow'
                },
                axisLine: {
                    lineStyle: {
                        color: '#58afff',
                    },
                },
                axisLabel: {
                    rotate: 45,
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: y1AxisName,
                min: params.y1min,
                max: params.y1max,
                splitNumber: 5,
                interval: (params.y1max - params.y1min) / 5,
                axisLabel: {
                    formatter: '{value}' + y1unit
                },
                axisLine: {
                    lineStyle: {
                        color: '#58afff',
                    }
                }
            },
            {
                type: 'value',
                name: y2AxisName,
                min: params.y2max,
                max: params.y2min,
                axisLabel: {
                    formatter: '{value}' + y2unit
                },
                axisLine: {
                    lineStyle: {
                        color: '#58afff',
                    }
                },
                splitNumber: 5,
                interval: (params.y2max - params.y2min) / 5
            }
        ],
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