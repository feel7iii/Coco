import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , JhiLanguageService  } from 'ng-jhipster';

import { ScDiscussions } from './sc-discussions.model';
import { ScDiscussionsService } from './sc-discussions.service';

@Component({
    selector: 'jhi-sc-discussions-detail',
    templateUrl: './sc-discussions-detail.component.html'
})
export class ScDiscussionsDetailComponent implements OnInit, OnDestroy {

    scDiscussions: ScDiscussions;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private jhiLanguageService: JhiLanguageService,
        private scDiscussionsService: ScDiscussionsService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['scDiscussions']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInScDiscussions();
    }

    load(id) {
        this.scDiscussionsService.find(id).subscribe((scDiscussions) => {
            this.scDiscussions = scDiscussions;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInScDiscussions() {
        this.eventSubscriber = this.eventManager.subscribe('scDiscussionsListModification', (response) => this.load(this.scDiscussions.id));
    }
}
