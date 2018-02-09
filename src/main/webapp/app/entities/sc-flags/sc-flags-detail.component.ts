import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , JhiLanguageService  } from 'ng-jhipster';

import { ScFlags } from './sc-flags.model';
import { ScFlagsService } from './sc-flags.service';

@Component({
    selector: 'jhi-sc-flags-detail',
    templateUrl: './sc-flags-detail.component.html'
})
export class ScFlagsDetailComponent implements OnInit, OnDestroy {

    scFlags: ScFlags;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private jhiLanguageService: JhiLanguageService,
        private scFlagsService: ScFlagsService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['scFlags']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInScFlags();
    }

    load(id) {
        this.scFlagsService.find(id).subscribe((scFlags) => {
            this.scFlags = scFlags;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInScFlags() {
        this.eventSubscriber = this.eventManager.subscribe('scFlagsListModification', (response) => this.load(this.scFlags.id));
    }
}
