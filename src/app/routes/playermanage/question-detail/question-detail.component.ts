import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: "question-detail",
    templateUrl: "./question-detail.component.html",
    styleUrls: ["./question-detail.component.less"]
})
export class QuestionDetailComponent implements OnInit {
    // questionDetailForm: FormGroup;
    questionResult: any = null;
    constructor(private fb: FormBuilder, private route: ActivatedRoute) {
        this.route.queryParams.subscribe((res: any) => {
            JSON.stringify(res) != '{}' ? this.questionResult = JSON.parse(res.questionResult) : this.questionResult = null;
        });
    }

    ngOnInit(): void {
        console.log(this.questionResult);
        // this.questionDetailForm = this.fb.group({

        // });
    }
}