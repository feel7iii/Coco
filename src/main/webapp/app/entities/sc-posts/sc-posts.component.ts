import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService, DataUtils } from 'ng-jhipster';

import { ScPosts } from './sc-posts.model';
import { ScPostsService } from './sc-posts.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-sc-posts',
    templateUrl: './sc-posts.component.html'
})
export class ScPostsComponent implements OnInit, OnDestroy {
scPosts: ScPosts[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private scPostsService: ScPostsService,
        private alertService: AlertService,
        private dataUtils: DataUtils,
        private eventManager: EventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
        this.jhiLanguageService.setLocations(['scPosts']);
    }

    loadAll() {
        if (this.currentSearch) {
            this.scPostsService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: Response) => this.scPosts = res.json(),
                    (res: Response) => this.onError(res.json())
                );
            return;
       }
        this.scPostsService.query().subscribe(
            (res: Response) => {
                this.scPosts = res.json();
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
        this.registerChangeInScPosts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ScPosts) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    registerChangeInScPosts() {
        this.eventSubscriber = this.eventManager.subscribe('scPostsListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
