import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { MissionService } from '../../shared';

@Component({
    selector: 'jhi-discussion',
    templateUrl: './discussion.component.html'
})
export class DiscussionComponent implements OnInit, OnDestroy {
    paneShowingAndPinned = 'hasPane paneShowing panePinned';
    changeAppStyle = 'hasPane';
    paneWord: string;
    subscription: Subscription;

    constructor(private missionService: MissionService) {
        this.subscription = missionService.missionAnnounced$.subscribe(
            (paneWord) => this.paneWord = paneWord
        );
        missionService.missionConfirmed$.subscribe();
    }

    ngOnInit() {
        const appStyle = this.changeAppStyle;
        this.missionService.announceMission(appStyle);
    }

    hiddenPane() {
        const appStyle = this.changeAppStyle;
        const paneShowingAndPinned = this.paneShowingAndPinned;
        const paneWord = this.paneWord;
        if (paneWord !== paneShowingAndPinned) {
            this.missionService.announceMission(appStyle);
        }
    }

    ngOnDestroy() {
        const appStyle = '';
        this.missionService.announceMission(appStyle);
    }
}
