import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { ScSettings } from './sc-settings.model';
import { ScSettingsPopupService } from './sc-settings-popup.service';
import { ScSettingsService } from './sc-settings.service';

@Component({
    selector: 'jhi-sc-settings-delete-dialog',
    templateUrl: './sc-settings-delete-dialog.component.html'
})
export class ScSettingsDeleteDialogComponent {

    scSettings: ScSettings;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private scSettingsService: ScSettingsService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['scSettings']);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.scSettingsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'scSettingsListModification',
                content: 'Deleted an scSettings'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-sc-settings-delete-popup',
    template: ''
})
export class ScSettingsDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private scSettingsPopupService: ScSettingsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.scSettingsPopupService
                .open(ScSettingsDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
