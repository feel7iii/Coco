import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , JhiLanguageService  } from 'ng-jhipster';

import { ScUsersDiscussions } from './sc-users-discussions.model';
import { ScUsersDiscussionsService } from './sc-users-discussions.service';

@Component({
    selector: 'jhi-sc-users-discussions-detail',
    templateUrl: './sc-users-discussions-detail.component.html'
})
export class ScUsersDiscussionsDetailComponent implements OnInit, OnDestroy {

    scUsersDiscussions: ScUsersDiscussions;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private jhiLanguageService: JhiLanguageService,
        private scUsersDiscussionsService: ScUsersDiscussionsService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['scUsersDiscussions', 'scSubscription']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInScUsersDiscussions();
    }

    load(id) {
        this.scUsersDiscussionsService.find(id).subscribe((scUsersDiscussions) => {
            this.scUsersDiscussions = scUsersDiscussions;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInScUsersDiscussions() {
        this.eventSubscriber = this.eventManager.subscribe('scUsersDiscussionsListModification', (response) => this.load(this.scUsersDiscussions.id));
    }
}
