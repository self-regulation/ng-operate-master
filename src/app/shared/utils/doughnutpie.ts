export function DoughnutPie(params: any): any {
    let legendData: any = params.legendData, seriesName: any = params.seriesName, seriesData: any = params.seriesData;


    return {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data: legendData
        },
        series: [
            {
                name: seriesName,
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: true,
                        // position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '20',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: true
                    }
                },
                data: seriesData
            }
        ],
        color: ['#36cbcb', '#faad14', '#975fe4', '#f2637b', '#58afff', '#4ecb73', '#fbd437']
    };
}