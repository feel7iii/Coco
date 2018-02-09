import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService, DataUtils } from 'ng-jhipster';

import { ScSettings } from './sc-settings.model';
import { ScSettingsService } from './sc-settings.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-sc-settings',
    templateUrl: './sc-settings.component.html'
})
export class ScSettingsComponent implements OnInit, OnDestroy {
scSettings: ScSettings[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private scSettingsService: ScSettingsService,
        private alertService: AlertService,
        private dataUtils: DataUtils,
        private eventManager: EventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
        this.jhiLanguageService.setLocations(['scSettings']);
    }

    loadAll() {
        if (this.currentSearch) {
            this.scSettingsService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: Response) => this.scSettings = res.json(),
                    (res: Response) => this.onError(res.json())
                );
            return;
       }
        this.scSettingsService.query().subscribe(
            (res: Response) => {
                this.scSettings = res.json();
                this.currentSearch = '';
            },
            (res: Response) => this.onError(res.json())
        );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInScSettings();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ScSettings) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    registerChangeInScSettings() {
        this.eventSubscriber = this.eventManager.subscribe('scSettingsListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
