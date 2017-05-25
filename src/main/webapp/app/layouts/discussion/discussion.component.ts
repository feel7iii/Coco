import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { CommunicationService } from '../../shared';

@Component({
    selector: 'jhi-discussion',
    templateUrl: './discussion.component.html'
})
export class DiscussionComponent implements OnInit, OnDestroy {
    paneShowingAndPinned = 'hasPane paneShowing panePinned';
    changeAppStyle = 'hasPane';
    paneWord: string;
    subscription: Subscription;

    constructor(private communicationService: CommunicationService) {
        this.subscription = communicationService.communicationAnnounced$.subscribe(
            (paneWord) => this.paneWord = paneWord
        );
    }

    ngOnInit() {
        const appStyle = this.changeAppStyle;
        this.communicationService.announceCommunication(appStyle);
    }

    hiddenPane() {
        const appStyle = this.changeAppStyle;
        const paneShowingAndPinned = this.paneShowingAndPinned;
        const paneWord = this.paneWord;
        if (paneWord !== paneShowingAndPinned) {
            this.communicationService.announceCommunication(appStyle);
        }
    }

    ngOnDestroy() {
        const appStyle = '';
        this.communicationService.announceCommunication(appStyle);
        this.subscription.unsubscribe();
    }
}
