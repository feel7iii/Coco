import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { ScDiscussions } from './sc-discussions.model';
import { ScDiscussionsPopupService } from './sc-discussions-popup.service';
import { ScDiscussionsService } from './sc-discussions.service';

@Component({
    selector: 'jhi-sc-discussions-delete-dialog',
    templateUrl: './sc-discussions-delete-dialog.component.html'
})
export class ScDiscussionsDeleteDialogComponent {

    scDiscussions: ScDiscussions;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private scDiscussionsService: ScDiscussionsService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['scDiscussions']);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.scDiscussionsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'scDiscussionsListModification',
                content: 'Deleted an scDiscussions'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-sc-discussions-delete-popup',
    template: ''
})
export class ScDiscussionsDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private scDiscussionsPopupService: ScDiscussionsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.scDiscussionsPopupService
                .open(ScDiscussionsDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
