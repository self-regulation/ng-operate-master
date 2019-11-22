import { Component, OnInit, ViewChild } from '@angular/core';
import { WebsocketService } from '@core/websocket/websocket.service';
import { CommandWindowModal } from '@core/components/command-window/command-window.component';

@Component({
    selector: 'server-update',
    templateUrl: './server-update.component.html'
})
export class ServerUpdateComponent implements OnInit {
    @ViewChild("command", { static: false }) commandWindow: CommandWindowModal;

    constructor(private webSocketService: WebsocketService) {

    }
    ngOnInit(): void {
        // this.webSocketService.connect(`ws://admin-cloudgame-dev.tech.kingsoft.net:9093/client`);

    }
    openCommand(): void {
        this.commandWindow.show();
    }

}