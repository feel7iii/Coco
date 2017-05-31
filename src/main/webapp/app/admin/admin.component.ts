import {Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { CommunicationService } from '../shared';

@Component({
    selector: 'jhi-admin',
    template: `
    <div id="wrapper" class="toggled">
        <jhi-admin-side></jhi-admin-side>
        <div id="page-content-wrapper">
            <div class="container-fluid">
                <router-outlet></router-outlet>
            </div>
        </div>
    </div>
    `
})
export class AdminComponent implements OnInit, OnDestroy {
    switchNav = false;

    constructor(
        // private communicationService: CommunicationService,
        // private router: Router,
    ) {
    }

    ngOnInit() {
        // this.communicationService.announceCommunication(this.switchNav);
    }
    ngOnDestroy() {
        // const adminUrl = this.router.routerState.snapshot.url;
        // this.router.events.subscribe((event) => {
        //     if (event instanceof NavigationEnd && adminUrl.indexOf('admin') <= 0) {
        //         this.communicationService.announceCommunication(!this.switchNav);
        //     }
        // });
    }
}
