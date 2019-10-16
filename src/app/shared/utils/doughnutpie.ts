export function DoughnutPie(): any {
    return {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data: ['启动APP', '领取礼包', '查看日常任务', '游戏关卡', '领取奖励', '退出APP']
        },
        series: [
            {
                name: '玩家行为',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [
                    { value: 100, name: '启动APP' },
                    { value: 100, name: '领取礼包' },
                    { value: 100, name: '查看日常任务' },
                    { value: 100, name: '游戏关卡' },
                    { value: 100, name: '领取奖励' },
                    { value: 100, name: '退出APP' }
                ]
            }
        ]
    };
}