import { Component, OnInit } from '@angular/core';

import { JhiLanguageService } from 'ng-jhipster';
import { CommunicationService } from '../../../shared';

@Component({
    selector: 'jhi-tags',
    templateUrl: './tags.component.html'
})
export class TagsComponent implements OnInit {
    constructor(
        private languageService: JhiLanguageService,
        private communicationService: CommunicationService
    ) {
        this.languageService.setLocations(['home']);
    }

    ngOnInit() {
    }

    startDiscussion() {
        this.communicationService.announceCommunication('startDiscussion');
    }
}
