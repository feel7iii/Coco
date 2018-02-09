import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService, DataUtils } from 'ng-jhipster';

import { ScTags } from './sc-tags.model';
import { ScTagsService } from './sc-tags.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-sc-tags',
    templateUrl: './sc-tags.component.html'
})
export class ScTagsComponent implements OnInit, OnDestroy {
scTags: ScTags[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private scTagsService: ScTagsService,
        private alertService: AlertService,
        private dataUtils: DataUtils,
        private eventManager: EventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
        this.jhiLanguageService.setLocations(['scTags']);
    }

    loadAll() {
        if (this.currentSearch) {
            this.scTagsService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: Response) => this.scTags = res.json(),
                    (res: Response) => this.onError(res.json())
                );
            return;
       }
        this.scTagsService.query().subscribe(
            (res: Response) => {
                this.scTags = res.json();
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
        this.registerChangeInScTags();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ScTags) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    registerChangeInScTags() {
        this.eventSubscriber = this.eventManager.subscribe('scTagsListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
