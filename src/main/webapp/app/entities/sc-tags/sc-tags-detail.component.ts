import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , JhiLanguageService , DataUtils } from 'ng-jhipster';

import { ScTags } from './sc-tags.model';
import { ScTagsService } from './sc-tags.service';

@Component({
    selector: 'jhi-sc-tags-detail',
    templateUrl: './sc-tags-detail.component.html'
})
export class ScTagsDetailComponent implements OnInit, OnDestroy {

    scTags: ScTags;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private jhiLanguageService: JhiLanguageService,
        private dataUtils: DataUtils,
        private scTagsService: ScTagsService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['scTags']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInScTags();
    }

    load(id) {
        this.scTagsService.find(id).subscribe((scTags) => {
            this.scTags = scTags;
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

    registerChangeInScTags() {
        this.eventSubscriber = this.eventManager.subscribe('scTagsListModification', (response) => this.load(this.scTags.id));
    }
}
