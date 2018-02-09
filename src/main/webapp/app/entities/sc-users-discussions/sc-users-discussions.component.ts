import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService } from 'ng-jhipster';

import { ScUsersDiscussions } from './sc-users-discussions.model';
import { ScUsersDiscussionsService } from './sc-users-discussions.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-sc-users-discussions',
    templateUrl: './sc-users-discussions.component.html'
})
export class ScUsersDiscussionsComponent implements OnInit, OnDestroy {
scUsersDiscussions: ScUsersDiscussions[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private scUsersDiscussionsService: ScUsersDiscussionsService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
        this.jhiLanguageService.setLocations(['scUsersDiscussions', 'scSubscription']);
    }

    loadAll() {
        if (this.currentSearch) {
            this.scUsersDiscussionsService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: Response) => this.scUsersDiscussions = res.json(),
                    (res: Response) => this.onError(res.json())
                );
            return;
       }
        this.scUsersDiscussionsService.query().subscribe(
            (res: Response) => {
                this.scUsersDiscussions = res.json();
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
        this.registerChangeInScUsersDiscussions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ScUsersDiscussions) {
        return item.id;
    }
    registerChangeInScUsersDiscussions() {
        this.eventSubscriber = this.eventManager.subscribe('scUsersDiscussionsListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
