import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as $ from 'jquery';

@Component({
    selector: 'jhi-account-side',
    templateUrl: './side.component.html',
    styles: [`
        a {
            color: #428bca;
        }
    `]
})
export class AccountSideComponent implements OnInit {

    configure = '/account/configure';
    settings = '/account/settings';
    password = '/account/password';
    help = '/account/help';

    configureTab = 'tab_1x';
    settingsTab = 'tab_2x';
    passwordTab = 'tab_3x';
    helpTab = 'tab_4x';

    constructor(private router: Router) {}

    ngOnInit() {
        const routerPath = this.router.routerState.snapshot.url;
        switch (routerPath) {
            case this.configure:
                this.switchPane(this.configureTab);
                break;
            case this.settings:
                this.switchPane(this.settingsTab);
                break;
            case this.password:
                this.switchPane(this.passwordTab);
                break;
            case this.help:
                this.switchPane(this.helpTab);
                break;
            default:
                this.switchPane(this.configureTab);
        }
    }

    switchPane(pageDivId) {
        const groupPane: any = $('#groupPane a');
        for (const divA of groupPane) {
            if (divA.id === pageDivId) {
                $('#' + divA.id).addClass('active');
            } else {
                $('#' + divA.id).removeClass('active');
            }
        }
    }
}
