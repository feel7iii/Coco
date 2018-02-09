import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , JhiLanguageService , DataUtils } from 'ng-jhipster';

import { ScMessagings } from './sc-messagings.model';
import { ScMessagingsService } from './sc-messagings.service';

@Component({
    selector: 'jhi-sc-messagings-detail',
    templateUrl: './sc-messagings-detail.component.html'
})
export class ScMessagingsDetailComponent implements OnInit, OnDestroy {

    scMessagings: ScMessagings;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private jhiLanguageService: JhiLanguageService,
        private dataUtils: DataUtils,
        private scMessagingsService: ScMessagingsService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['scMessagings']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInScMessagings();
    }

    load(id) {
        this.scMessagingsService.find(id).subscribe((scMessagings) => {
            this.scMessagings = scMessagings;
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

    registerChangeInScMessagings() {
        this.eventSubscriber = this.eventManager.subscribe('scMessagingsListModification', (response) => this.load(this.scMessagings.id));
    }
}
