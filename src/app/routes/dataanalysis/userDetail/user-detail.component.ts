import { Component, OnInit } from '@angular/core';
import { UserAction } from '@shared/utils/userAction';
import { SimpleBar } from '@shared/utils/simpleBar';
import { DoughnutPie } from '@shared/utils/doughnutpie';

@Component({
    selector: 'user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.less']
})
export class UserDetailComponent implements OnInit {
    unit: any = 'hour';
    actionUnit: any = 'sequence';
    devDetailLoading: boolean = false;
    userActionList: any = [];
    userActionData: any = null;
    userActionPie: any = null;
    constructor() {

    }

    ngOnInit(): void {
        this.userActionList = UserAction();
        this.userActionData = SimpleBar({
            xData: this.userActionList.series,
            seriesData: this.reduceArray(this.userActionList.rows[0].values),
            viewTitle: '事件次数',
            unit: '次',
            legend: ['事件次数']
        });
        console.log(this.userActionData)
    }

    changeActionUnit(event) {
        if (event == 'statistic') {
            this.userActionPie = DoughnutPie({
                legendData: ['启动APP', '领取礼包', '查看日常任务', '游戏关卡', '领取奖励', '退出APP'],
                seriesName: '玩家行为',
                seriesData: [
                    { value: 100, name: '启动APP' },
                    { value: 100, name: '领取礼包' },
                    { value: 100, name: '查看日常任务' },
                    { value: 100, name: '游戏关卡' },
                    { value: 100, name: '领取奖励' },
                    { value: 100, name: '退出APP' }
                ]
            });
        }
    }

    reduceArray(arr) {
        return arr.reduce((prev, next) => {
            return prev.concat(Array.isArray(next) ? this.reduceArray(next) : next)
        }, [])
    }
}