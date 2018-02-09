import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService } from 'ng-jhipster';

import { ScFlags } from './sc-flags.model';
import { ScFlagsService } from './sc-flags.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-sc-flags',
    templateUrl: './sc-flags.component.html'
})
export class ScFlagsComponent implements OnInit, OnDestroy {
scFlags: ScFlags[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private scFlagsService: ScFlagsService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
        this.jhiLanguageService.setLocations(['scFlags']);
    }

    loadAll() {
        if (this.currentSearch) {
            this.scFlagsService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: Response) => this.scFlags = res.json(),
                    (res: Response) => this.onError(res.json())
                );
            return;
       }
        this.scFlagsService.query().subscribe(
            (res: Response) => {
                this.scFlags = res.json();
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
        this.registerChangeInScFlags();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ScFlags) {
        return item.id;
    }
    registerChangeInScFlags() {
        this.eventSubscriber = this.eventManager.subscribe('scFlagsListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
