/**
 * 面积折线图(不需要X、Y轴)
 * @param data 数据源
 * @param param 图形配置
 */
export function areaLine(param: any): any {
    let ratioList = {}, xDate = [], seriesData = [], unit = '';
    xDate = param.xDate;
    seriesData = param.seriesData;
    unit = param.unit ? param.unit : '%';
    ratioList = {
        xAxis: {
            type: 'category',
            data: xDate,
            "splitLine": {
                "show": false
            },
            show: false
        },
        yAxis: {
            type: 'value',
            show: false
        },
        series: [
            {
                type: 'line',
                smooth: false,
                data: seriesData,
                symbol: 'none',
                color: '#009688',
                connectNulls: true,
                markPoint: {
                    data: [
                        {
                            value: seriesData[seriesData.length - 1] + unit,
                            coord: [xDate[xDate.length - 1], seriesData[seriesData.length - 1]],
                            symbolSize: 15,
                            symbol: 'pin',
                            label: {
                                normal: {
                                    position: 'left',
                                    color: 'red',
                                    offset: [0, 7]
                                }
                            },
                            itemStyle: {
                                normal: { color: 'red' }
                            }
                        }
                    ]
                }
            }

        ]

    };
    return ratioList;
}