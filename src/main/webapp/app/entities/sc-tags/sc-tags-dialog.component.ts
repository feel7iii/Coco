import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService, DataUtils } from 'ng-jhipster';

import { ScTags } from './sc-tags.model';
import { ScTagsPopupService } from './sc-tags-popup.service';
import { ScTagsService } from './sc-tags.service';
import { User, UserService } from '../../shared';
import { ScDiscussions, ScDiscussionsService } from '../sc-discussions';

@Component({
    selector: 'jhi-sc-tags-dialog',
    templateUrl: './sc-tags-dialog.component.html'
})
export class ScTagsDialogComponent implements OnInit {

    scTags: ScTags;
    authorities: any[];
    isSaving: boolean;

    users: User[];

    sctags: ScTags[];

    scdiscussions: ScDiscussions[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private dataUtils: DataUtils,
        private alertService: AlertService,
        private scTagsService: ScTagsService,
        private userService: UserService,
        private scDiscussionsService: ScDiscussionsService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['scTags']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.userService.query().subscribe(
            (res: Response) => { this.users = res.json(); }, (res: Response) => this.onError(res.json()));
        this.scTagsService.query().subscribe(
            (res: Response) => { this.sctags = res.json(); }, (res: Response) => this.onError(res.json()));
        this.scDiscussionsService.query().subscribe(
            (res: Response) => { this.scdiscussions = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, scTags, field, isImage) {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            if (isImage && !/^image\//.test(file.type)) {
                return;
            }
            this.dataUtils.toBase64(file, (base64Data) => {
                scTags[field] = base64Data;
                scTags[`${field}ContentType`] = file.type;
            });
        }
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.scTags.id !== undefined) {
            this.scTagsService.update(this.scTags)
                .subscribe((res: ScTags) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.scTagsService.create(this.scTags)
                .subscribe((res: ScTags) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess(result: ScTags) {
        this.eventManager.broadcast({ name: 'scTagsListModification', content: 'OK'});
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

    trackUserById(index: number, item: User) {
        return item.id;
    }

    trackScTagsById(index: number, item: ScTags) {
        return item.id;
    }

    trackScDiscussionsById(index: number, item: ScDiscussions) {
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
    selector: 'jhi-sc-tags-popup',
    template: ''
})
export class ScTagsPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private scTagsPopupService: ScTagsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.scTagsPopupService
                    .open(ScTagsDialogComponent, params['id']);
            } else {
                this.modalRef = this.scTagsPopupService
                    .open(ScTagsDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
