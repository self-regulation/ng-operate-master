
export class CommandWindowModal {
    modalTitle: any = '服务器指令';
    private _commandVisible: boolean = false;
    constructor(_commandVisible: boolean) {
        console.log('******');
        this._commandVisible = _commandVisible;
    }

    show() {
        console.log('******@@@');
        this._commandVisible = true;
    }

    close() {
        this._commandVisible = false;
    }
}