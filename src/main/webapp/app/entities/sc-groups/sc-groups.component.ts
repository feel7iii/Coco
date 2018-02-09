import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService } from 'ng-jhipster';

import { ScGroups } from './sc-groups.model';
import { ScGroupsService } from './sc-groups.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-sc-groups',
    templateUrl: './sc-groups.component.html'
})
export class ScGroupsComponent implements OnInit, OnDestroy {
scGroups: ScGroups[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private scGroupsService: ScGroupsService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
        this.jhiLanguageService.setLocations(['scGroups']);
    }

    loadAll() {
        if (this.currentSearch) {
            this.scGroupsService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: Response) => this.scGroups = res.json(),
                    (res: Response) => this.onError(res.json())
                );
            return;
       }
        this.scGroupsService.query().subscribe(
            (res: Response) => {
                this.scGroups = res.json();
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
        this.registerChangeInScGroups();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ScGroups) {
        return item.id;
    }
    registerChangeInScGroups() {
        this.eventSubscriber = this.eventManager.subscribe('scGroupsListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
