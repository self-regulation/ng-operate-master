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
            xDate: this.userActionList.series,
            seriesData: this.reduceArray(this.userActionList.rows[0].values),
            viewTitle: '事件次数'
        });
        console.log(this.userActionData)
    }

    changeActionUnit(event) {
        if (event == 'statistic') {
            this.userActionPie = DoughnutPie();
        }
    }

    reduceArray(arr) {
        return arr.reduce((prev, next) => {
            return prev.concat(Array.isArray(next) ? this.reduceArray(next) : next)
        }, [])
    }
}