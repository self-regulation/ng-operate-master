import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: "question-detail",
    templateUrl: "./question-detail.component.html",
    styleUrls: ["./question-detail.component.less"],
})
export class QuestionDetailComponent implements OnInit {
    questionDetailForm: FormGroup;
    questionResult: any = null;
    style = {
        display: 'block',
        height: '30px',
        lineHeight: '30px'
    };
    constructor(private fb: FormBuilder, private route: ActivatedRoute) {
        this.route.queryParams.subscribe((res: any) => {
            JSON.stringify(res) != '{}' ? this.questionResult = JSON.parse(res.questionResult) : this.questionResult = null;
        });
    }

    ngOnInit(): void {
        // console.log(this.questionResult);
        this.questionDetailForm = this.fb.group({
            form1: [this.questionResult[1].slice(0, 2) == "其他" ? "Q" : this.questionResult[1]],
            form2: [this.questionResult[2].slice(0, 2) == "其他" ? "Q" : this.questionResult[2]],
            form3: [this.questionResult[3].slice(0, 2) == "其他" ? "Q" : this.questionResult[3]],
            form4: [this.questionResult[4].slice(0, 2) == "其他" ? "Q" : this.questionResult[4]],
            form5: [this.questionResult[5].slice(0, 2) == "其他" ? "Q" : this.questionResult[5]],
            form6: [this.questionResult[6].slice(0, 2) == "其他" ? "Q" : this.questionResult[6]],
        });
    }
}