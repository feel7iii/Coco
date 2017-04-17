import { Component, Input } from '@angular/core';

@Component({
    selector: 'jhi-notice',
    templateUrl: './notice.component.html'
})
export class NoticeComponent {

    @Input()
    public alerts: Array<IAlert> = [];

    private backup: Array<IAlert>;

    constructor() {
        this.alerts.push({
            id: 1,
            type: 'info',
            message: '欢迎来到JHipster中文社区。See More, Work Together, Then Success!',
        });
        this.backup = this.alerts.map((alert: IAlert) => Object.assign({}, alert));
    }

    public closeAlert(alert: IAlert) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }

    public reset() {
        this.alerts = this.backup.map((alert: IAlert) => Object.assign({}, alert));
    }
}

export interface IAlert {
    id: number;
    type: string;
    message: string;
}
