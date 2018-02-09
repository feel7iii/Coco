import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , JhiLanguageService , DataUtils } from 'ng-jhipster';

import { ScPostsMentions } from './sc-posts-mentions.model';
import { ScPostsMentionsService } from './sc-posts-mentions.service';

@Component({
    selector: 'jhi-sc-posts-mentions-detail',
    templateUrl: './sc-posts-mentions-detail.component.html'
})
export class ScPostsMentionsDetailComponent implements OnInit, OnDestroy {

    scPostsMentions: ScPostsMentions;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private jhiLanguageService: JhiLanguageService,
        private dataUtils: DataUtils,
        private scPostsMentionsService: ScPostsMentionsService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['scPostsMentions']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInScPostsMentions();
    }

    load(id) {
        this.scPostsMentionsService.find(id).subscribe((scPostsMentions) => {
            this.scPostsMentions = scPostsMentions;
        });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInScPostsMentions() {
        this.eventSubscriber = this.eventManager.subscribe('scPostsMentionsListModification', (response) => this.load(this.scPostsMentions.id));
    }
}
