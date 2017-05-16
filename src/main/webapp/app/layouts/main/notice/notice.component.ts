import { Component, Input } from '@angular/core';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { Account, Principal } from '../../../shared';

@Component({
    selector: 'jhi-notice',
    template: `
    <header [hidden]="true" [ngSwitch]="isAuthenticated()" class="Hero TagHero TagHero--colored" style="color: rgb(255, 255, 255); background-color: rgb(255, 255, 255);">
        <p *ngFor="let alert of alerts">
            <ngb-alert [type]="alert.type" (close)="closeAlert(alert)" *ngIf="account">
                <span jhiTranslate="home.logged.message" translateValues="{username: '{{account.firstName}}'}">
                    Logging
                </span>
            </ngb-alert>
        </p>
    </header>
    `,
    styles: [``]
})
export class NoticeComponent {

    account: Account;

    @Input()
    public alerts: Array<IAlert> = [];

    private backup: Array<IAlert>;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private eventManager: EventManager,
        private principal: Principal,
    ) {
        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();

        this.jhiLanguageService.setLocations(['home']);

        this.alerts.push({
            id: 2,
            type: 'info',
            message: 'This is an info alert',
        });
        this.backup = this.alerts.map((alert: IAlert) => Object.assign({}, alert));
    }

    public closeAlert(alert: IAlert) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }
}

export interface IAlert {
    id: number;
    type: string;
    message: string;
}
