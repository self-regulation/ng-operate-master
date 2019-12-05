import { Component, OnInit } from '@angular/core';
import { PlayerQuestionService } from './player-question.service';
import { NzMessageService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
    selector: "player-question",
    templateUrl: "./player-question.component.html",
    providers: [PlayerQuestionService]
})
export class PlayerQuestionComponent implements OnInit {
    questionForm: FormGroup;
    questionList: any = [];
    tableLoading: boolean = false;
    total: number = 0;
    pageNum: number = 1;
    pageSize: number = 10;
    pageSizeOptions = [10, 20, 30, 40, 50];
    dateRange: any = null;
    startDate: any = null;
    endDate: any = null;
    constructor(private playerQuestionService: PlayerQuestionService, private message: NzMessageService, private fb: FormBuilder, private router: Router) {

    }

    ngOnInit(): void {
        this.questionForm = this.fb.group({
            userName: [null],
            dateRange: [null],
            status: [null]
        });

        this.getQuestionNaireData();
    }

    getQuestionNaireData() {
        let params = {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            userName: this.questionForm.value.userName,
            startDate: this.startDate,
            endDate: this.endDate,
            status: this.questionForm.value.status
        };
        this.tableLoading = true;
        this.playerQuestionService.getQuestionNaireData(params).subscribe((res: any) => {
            this.tableLoading = false;
            if (res.code == 0) {
                this.questionList = res.data.list;
                this.total = res.data.total;
            } else {
                this.questionList = [];
                this.message.create('error', res.message ? res.message : '查询失败!');
            }
        });
    }

    changeDateRange($event) {
        this.startDate = moment($event[0]).format("YYYY-MM-DD HH:mm:ss");
        this.endDate = moment($event[1]).format("YYYY-MM-DD HH:mm:ss");
        this.getQuestionNaireData();
    }

    lookResult(questionDetail) {
        console.log(questionDetail);
        this.router.navigate(['/playermanage/questiondetail'], { queryParams: { questionResult: JSON.stringify(questionDetail) } });
    }

    addWhiteList(userName: any) {
        let params = {
            userName: userName
        };
        this.playerQuestionService.addUserToWhitelist(params).subscribe((res: any) => {
            if (res.code == 0) {
                this.message.create('success', res.message ? res.message : '操作成功!');
                this.getQuestionNaireData();
            } else {
                this.message.create('error', res.message ? res.message : '操作失败!');
            }
        });
    }

    clear(event: any) {
        if (!event || event.length <= 0) {
            this.startDate = '';
            this.endDate = '';
            this.getQuestionNaireData();
        }
    }

    changePage(event) {
        this.pageNum = event;
        this.getQuestionNaireData();
    }

    changePageSize(event) {
        this.pageSize = event;
        this.getQuestionNaireData();
    }
}