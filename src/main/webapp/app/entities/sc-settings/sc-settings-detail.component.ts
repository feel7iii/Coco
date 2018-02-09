import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , JhiLanguageService , DataUtils } from 'ng-jhipster';

import { ScSettings } from './sc-settings.model';
import { ScSettingsService } from './sc-settings.service';

@Component({
    selector: 'jhi-sc-settings-detail',
    templateUrl: './sc-settings-detail.component.html'
})
export class ScSettingsDetailComponent implements OnInit, OnDestroy {

    scSettings: ScSettings;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private jhiLanguageService: JhiLanguageService,
        private dataUtils: DataUtils,
        private scSettingsService: ScSettingsService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['scSettings']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInScSettings();
    }

    load(id) {
        this.scSettingsService.find(id).subscribe((scSettings) => {
            this.scSettings = scSettings;
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

    registerChangeInScSettings() {
        this.eventSubscriber = this.eventManager.subscribe('scSettingsListModification', (response) => this.load(this.scSettings.id));
    }
}
