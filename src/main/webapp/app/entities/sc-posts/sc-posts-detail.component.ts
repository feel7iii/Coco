import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , JhiLanguageService , DataUtils } from 'ng-jhipster';

import { ScPosts } from './sc-posts.model';
import { ScPostsService } from './sc-posts.service';

@Component({
    selector: 'jhi-sc-posts-detail',
    templateUrl: './sc-posts-detail.component.html'
})
export class ScPostsDetailComponent implements OnInit, OnDestroy {

    scPosts: ScPosts;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private jhiLanguageService: JhiLanguageService,
        private dataUtils: DataUtils,
        private scPostsService: ScPostsService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['scPosts']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInScPosts();
    }

    load(id) {
        this.scPostsService.find(id).subscribe((scPosts) => {
            this.scPosts = scPosts;
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

    registerChangeInScPosts() {
        this.eventSubscriber = this.eventManager.subscribe('scPostsListModification', (response) => this.load(this.scPosts.id));
    }
}
