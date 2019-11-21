import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '@core/websocket/websocket.service';

@Component({
    selector: 'server-update',
    templateUrl: './server-update.component.html'
})
export class ServerUpdateComponent implements OnInit {
    constructor(private webSocketService: WebsocketService) {

    }
    ngOnInit(): void {
        this.webSocketService.connect(`ws://admin-cloudgame-dev.tech.kingsoft.net:9093/client`);
    }

}