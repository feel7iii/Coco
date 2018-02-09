import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { ScDiscussions } from './sc-discussions.model';
import { ScDiscussionsPopupService } from './sc-discussions-popup.service';
import { ScDiscussionsService } from './sc-discussions.service';
import { ScTags, ScTagsService } from '../sc-tags';

@Component({
    selector: 'jhi-sc-discussions-dialog',
    templateUrl: './sc-discussions-dialog.component.html'
})
export class ScDiscussionsDialogComponent implements OnInit {

    scDiscussions: ScDiscussions;
    authorities: any[];
    isSaving: boolean;

    sctags: ScTags[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private scDiscussionsService: ScDiscussionsService,
        private scTagsService: ScTagsService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['scDiscussions']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.scTagsService.query().subscribe(
            (res: Response) => { this.sctags = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.scDiscussions.id !== undefined) {
            this.scDiscussionsService.update(this.scDiscussions)
                .subscribe((res: ScDiscussions) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.scDiscussionsService.create(this.scDiscussions)
                .subscribe((res: ScDiscussions) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess(result: ScDiscussions) {
        this.eventManager.broadcast({ name: 'scDiscussionsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    trackScTagsById(index: number, item: ScTags) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-sc-discussions-popup',
    template: ''
})
export class ScDiscussionsPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private scDiscussionsPopupService: ScDiscussionsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.scDiscussionsPopupService
                    .open(ScDiscussionsDialogComponent, params['id']);
            } else {
                this.modalRef = this.scDiscussionsPopupService
                    .open(ScDiscussionsDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
