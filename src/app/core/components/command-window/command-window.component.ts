import { Component, Input } from '@angular/core';

@Component({
    selector: "command-window",
    styleUrls: ["./command-window.component.less"],
    templateUrl: "./command-window.component.html"
    // template: `<button nz-button (click)="info()">命令操作</button>`
})
export class CommandWindowModal {
    modalTitle: any = '服务器指令';
    @Input() commandVisible: boolean = false;
    @Input() commandContent: any = ['111111', '2', '3', '4', '5'];
    commandInput: any = "";
    constructor() {
    }

    show() {
        this.commandVisible = true;
    }

    close() {
        this.commandVisible = false;
    }

    commandCancel() {
        this.commandVisible = false;
        this.commandInput = "";
        this.commandContent = [];
    }

    commandChange(event: any) {
        if (event.keyCode == 13) {
            this.commandContent.push(event.target.value);
            this.commandInput = "";
        }
    }
}