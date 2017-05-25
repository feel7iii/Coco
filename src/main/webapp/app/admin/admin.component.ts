import { Component, OnInit } from '@angular/core';

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
export class AdminComponent implements OnInit {

    // stickyPaneClass = 'hasPane paneShowing panePinned';

    constructor(
        private communicationService: CommunicationService
    ) {}

    ngOnInit() {
        // this.communicationService.announceCommunication(this.stickyPaneClass);
    }
}
