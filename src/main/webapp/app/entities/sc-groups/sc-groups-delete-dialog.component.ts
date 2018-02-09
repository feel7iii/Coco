import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { ScGroups } from './sc-groups.model';
import { ScGroupsPopupService } from './sc-groups-popup.service';
import { ScGroupsService } from './sc-groups.service';

@Component({
    selector: 'jhi-sc-groups-delete-dialog',
    templateUrl: './sc-groups-delete-dialog.component.html'
})
export class ScGroupsDeleteDialogComponent {

    scGroups: ScGroups;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private scGroupsService: ScGroupsService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['scGroups']);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.scGroupsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'scGroupsListModification',
                content: 'Deleted an scGroups'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-sc-groups-delete-popup',
    template: ''
})
export class ScGroupsDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private scGroupsPopupService: ScGroupsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.scGroupsPopupService
                .open(ScGroupsDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
