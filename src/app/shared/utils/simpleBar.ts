export function SimpleBar(params: any): any {
    let xDate = [], seriesData = [], viewTitle = '', unit = '', des = '';
    xDate = params.xDate;
    seriesData = params.seriesData;
    viewTitle = params.viewTitle;
    return {
        color: ['#3398DB'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
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
                data: xDate,
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: viewTitle,
                type: 'bar',
                barWidth: '60%',
                data: seriesData
            }
        ]
    };
}