import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { ScPostsMentions } from './sc-posts-mentions.model';
import { ScPostsMentionsPopupService } from './sc-posts-mentions-popup.service';
import { ScPostsMentionsService } from './sc-posts-mentions.service';

@Component({
    selector: 'jhi-sc-posts-mentions-delete-dialog',
    templateUrl: './sc-posts-mentions-delete-dialog.component.html'
})
export class ScPostsMentionsDeleteDialogComponent {

    scPostsMentions: ScPostsMentions;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private scPostsMentionsService: ScPostsMentionsService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['scPostsMentions']);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.scPostsMentionsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'scPostsMentionsListModification',
                content: 'Deleted an scPostsMentions'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-sc-posts-mentions-delete-popup',
    template: ''
})
export class ScPostsMentionsDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private scPostsMentionsPopupService: ScPostsMentionsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.scPostsMentionsPopupService
                .open(ScPostsMentionsDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
