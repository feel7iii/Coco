import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , JhiLanguageService  } from 'ng-jhipster';

import { ScGroups } from './sc-groups.model';
import { ScGroupsService } from './sc-groups.service';

@Component({
    selector: 'jhi-sc-groups-detail',
    templateUrl: './sc-groups-detail.component.html'
})
export class ScGroupsDetailComponent implements OnInit, OnDestroy {

    scGroups: ScGroups;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private jhiLanguageService: JhiLanguageService,
        private scGroupsService: ScGroupsService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['scGroups']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInScGroups();
    }

    load(id) {
        this.scGroupsService.find(id).subscribe((scGroups) => {
            this.scGroups = scGroups;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInScGroups() {
        this.eventSubscriber = this.eventManager.subscribe('scGroupsListModification', (response) => this.load(this.scGroups.id));
    }
}
