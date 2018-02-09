import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { ScFlags } from './sc-flags.model';
import { ScFlagsPopupService } from './sc-flags-popup.service';
import { ScFlagsService } from './sc-flags.service';

@Component({
    selector: 'jhi-sc-flags-delete-dialog',
    templateUrl: './sc-flags-delete-dialog.component.html'
})
export class ScFlagsDeleteDialogComponent {

    scFlags: ScFlags;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private scFlagsService: ScFlagsService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['scFlags']);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.scFlagsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'scFlagsListModification',
                content: 'Deleted an scFlags'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-sc-flags-delete-popup',
    template: ''
})
export class ScFlagsDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private scFlagsPopupService: ScFlagsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.scFlagsPopupService
                .open(ScFlagsDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
