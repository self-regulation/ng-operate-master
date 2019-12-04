import { Component, OnInit, ViewChild } from '@angular/core';
// import { CommandWindowModal } from '@core/components/command-window/command-window.component';
import { ServerUpdateService } from './server-update.service';
import { NzMessageService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'server-update',
    templateUrl: './server-update.component.html',
    providers: [ServerUpdateService]
})
export class ServerUpdateComponent implements OnInit {
    // @ViewChild("command", { static: false }) commandWindow: CommandWindowModal;
    serverForm: FormGroup;
    pageNum: number = 1;
    pageSize: number = 10;
    serverInfoList: any = [];
    total: number = 0;
    tableLoading: boolean = false;
    pageSizeOptions = [10, 20, 30, 40, 50];
    constructor(private serverUpdateService: ServerUpdateService, private message: NzMessageService, private fb: FormBuilder, private router: Router) {

    }
    ngOnInit(): void {
        // this.webSocketService.connect(`ws://admin-cloudgame-dev.tech.kingsoft.net:9093/client`);
        this.serverForm = this.fb.group({
            serverName: [null],
            status: [null]
        });
        this.inquireServerInfo();
    }

    inquireServerInfo() {
        let params = {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            serverName: this.serverForm.value.serverName,
            status: this.serverForm.value.status
        }
        this.tableLoading = true;
        this.serverUpdateService.inquireServerInfo(params).subscribe((res: any) => {
            this.tableLoading = false;
            if (res.code == 0) {
                this.serverInfoList = res.data.list;
                this.total = res.data.total;
            } else {
                this.message.create('error', res.message ? res.message : '查询失败!');
            }
        });
    }
    //服务器日志记录/serverrecord , { queryParams: { name: serverName } }
    showServerRecord(serverName: any) {
        console.log(serverName);
        this.router.navigate(['/operation/serverrecord'], { queryParams: { name: serverName } });
    }

    changePage(event) {
        this.pageNum = event;
        this.inquireServerInfo();
    }

    changePageSize(event) {
        this.pageSize = event;
        this.inquireServerInfo();
    }

}