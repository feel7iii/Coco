import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService, DataUtils } from 'ng-jhipster';

import { ScMessagings } from './sc-messagings.model';
import { ScMessagingsService } from './sc-messagings.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-sc-messagings',
    templateUrl: './sc-messagings.component.html'
})
export class ScMessagingsComponent implements OnInit, OnDestroy {
scMessagings: ScMessagings[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private scMessagingsService: ScMessagingsService,
        private alertService: AlertService,
        private dataUtils: DataUtils,
        private eventManager: EventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
        this.jhiLanguageService.setLocations(['scMessagings']);
    }

    loadAll() {
        if (this.currentSearch) {
            this.scMessagingsService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: Response) => this.scMessagings = res.json(),
                    (res: Response) => this.onError(res.json())
                );
            return;
       }
        this.scMessagingsService.query().subscribe(
            (res: Response) => {
                this.scMessagings = res.json();
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
        this.registerChangeInScMessagings();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ScMessagings) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    registerChangeInScMessagings() {
        this.eventSubscriber = this.eventManager.subscribe('scMessagingsListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
