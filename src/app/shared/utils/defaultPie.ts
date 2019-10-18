export function DefaultPie(params: any): any {
    let title: any = '', seriesData: any = [], xData: any = [], unit: any = '', legend: any = null;
    title = params.title, seriesData = params.seriesData, xData = params.xData, unit = params.unit, legend = params.legend;
    return {
        title: {
            text: title,
            subtext: '',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} 台({d})" + unit
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: legend
        },
        series: [
            {
                name: '服务器使用率',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: seriesData,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 5,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ],
        color: ['#36cbcb', '#faad14', '#975fe4', '#f2637b', '#58afff', '#4ecb73', '#fbd437']
    };
}