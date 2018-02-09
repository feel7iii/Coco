import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { ScMessagings } from './sc-messagings.model';
import { ScMessagingsPopupService } from './sc-messagings-popup.service';
import { ScMessagingsService } from './sc-messagings.service';

@Component({
    selector: 'jhi-sc-messagings-delete-dialog',
    templateUrl: './sc-messagings-delete-dialog.component.html'
})
export class ScMessagingsDeleteDialogComponent {

    scMessagings: ScMessagings;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private scMessagingsService: ScMessagingsService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['scMessagings']);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.scMessagingsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'scMessagingsListModification',
                content: 'Deleted an scMessagings'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-sc-messagings-delete-popup',
    template: ''
})
export class ScMessagingsDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private scMessagingsPopupService: ScMessagingsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.scMessagingsPopupService
                .open(ScMessagingsDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
