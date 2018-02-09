import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { ScTags } from './sc-tags.model';
import { ScTagsPopupService } from './sc-tags-popup.service';
import { ScTagsService } from './sc-tags.service';

@Component({
    selector: 'jhi-sc-tags-delete-dialog',
    templateUrl: './sc-tags-delete-dialog.component.html'
})
export class ScTagsDeleteDialogComponent {

    scTags: ScTags;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private scTagsService: ScTagsService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['scTags']);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.scTagsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'scTagsListModification',
                content: 'Deleted an scTags'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-sc-tags-delete-popup',
    template: ''
})
export class ScTagsDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private scTagsPopupService: ScTagsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.scTagsPopupService
                .open(ScTagsDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
