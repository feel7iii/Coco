import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService, DataUtils } from 'ng-jhipster';

import { ScPostsMentions } from './sc-posts-mentions.model';
import { ScPostsMentionsService } from './sc-posts-mentions.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-sc-posts-mentions',
    templateUrl: './sc-posts-mentions.component.html'
})
export class ScPostsMentionsComponent implements OnInit, OnDestroy {
scPostsMentions: ScPostsMentions[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private scPostsMentionsService: ScPostsMentionsService,
        private alertService: AlertService,
        private dataUtils: DataUtils,
        private eventManager: EventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
        this.jhiLanguageService.setLocations(['scPostsMentions']);
    }

    loadAll() {
        if (this.currentSearch) {
            this.scPostsMentionsService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: Response) => this.scPostsMentions = res.json(),
                    (res: Response) => this.onError(res.json())
                );
            return;
       }
        this.scPostsMentionsService.query().subscribe(
            (res: Response) => {
                this.scPostsMentions = res.json();
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
        this.registerChangeInScPostsMentions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ScPostsMentions) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    registerChangeInScPostsMentions() {
        this.eventSubscriber = this.eventManager.subscribe('scPostsMentionsListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
