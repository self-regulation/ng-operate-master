/**
 * 面积折线图
 * @param data 数据源
 * @param param 图形配置
 */
export function Line(param: any): any {
    let ratioList = {}, xDate = [], seriesData = [], viewTitle = '', unit = '', des = '';
    xDate = param.xDate;
    seriesData = param.seriesData;
    viewTitle = param.viewTitle;
    unit = param.unit;
    des = param.des;
    ratioList = {
        tooltip: {
            trigger: 'axis',
            position: function (pt) {
                return [pt[0], '10%'];
            }
        },
        title: {
            left: 'center',
            text: viewTitle + unit + '最新值',
            subtext: '最新值：' + seriesData[seriesData.length - 1] + unit,
            subtextStyle: {
                color: '#FFAB40',
                fontSize: 14,
                fontWeight: '600'
            },
            textStyle: {
                color: '#58afff',
            }
        },
        grid: {
            left: '8%',
            bottom: '8%',
            containLabel: true
        },
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
            },
            iconStyle: {
                borderColor: '#58afff'
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xDate,
            axisLine: {
                lineStyle: {
                    color: '#58afff',
                }
            },
            axisLabel: {
                rotate: 45,
            }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value}' + unit
            },
            boundaryGap: [0, '100%'],
            axisLine: {
                lineStyle: {
                    color: '#58afff',
                }
            }
        },
        dataZoom: [{
            type: 'inside',
            start: 0,
            end: 100
        }, {
            start: 0,
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
        series: [
            {
                name: des,
                type: 'line',
                smooth: true,
                symbol: 'none',
                sampling: 'average',
                itemStyle: {
                    color: 'rgb(255, 70, 131)'
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgb(255, 158, 68)'
                    }, {
                        offset: 1,
                        color: 'rgb(255, 70, 131)'
                    }])
                },
                label: {
                    normal: {
                        show: false,
                    }
                },
                data: seriesData
            }
        ]
    };

    return ratioList;
}