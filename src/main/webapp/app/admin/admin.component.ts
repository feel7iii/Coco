import {Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { CommunicationService } from '../shared';

@Component({
    selector: 'jhi-admin',
    template: `
    <div class="IndexPage">
        <jhi-admin-side></jhi-admin-side>
        <div class="sideNavOffset">
            <router-outlet></router-outlet>
        </div>
    </div>
    `
})
export class AdminComponent implements OnInit, OnDestroy {
    switchNav = false;

    constructor(
        private communicationService: CommunicationService,
        private router: Router,
    ) {
        const url = this.router.routerState.snapshot.url;
        alert(url);
        alert(url.indexOf('admin'));
    }

    ngOnInit() {
        this.communicationService.announceCommunication(this.switchNav);
    }
    ngOnDestroy() {
        const adminUrl = this.router.routerState.snapshot.url;
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd && adminUrl.indexOf('admin') <= 0) {
                this.communicationService.announceCommunication(!this.switchNav);
            }
        });
    }
}
