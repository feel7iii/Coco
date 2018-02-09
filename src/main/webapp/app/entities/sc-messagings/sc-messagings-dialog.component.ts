import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService, DataUtils } from 'ng-jhipster';

import { ScMessagings } from './sc-messagings.model';
import { ScMessagingsPopupService } from './sc-messagings-popup.service';
import { ScMessagingsService } from './sc-messagings.service';
import { User, UserService } from '../../shared';

@Component({
    selector: 'jhi-sc-messagings-dialog',
    templateUrl: './sc-messagings-dialog.component.html'
})
export class ScMessagingsDialogComponent implements OnInit {

    scMessagings: ScMessagings;
    authorities: any[];
    isSaving: boolean;

    users: User[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private dataUtils: DataUtils,
        private alertService: AlertService,
        private scMessagingsService: ScMessagingsService,
        private userService: UserService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['scMessagings']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.userService.query().subscribe(
            (res: Response) => { this.users = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, scMessagings, field, isImage) {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            if (isImage && !/^image\//.test(file.type)) {
                return;
            }
            this.dataUtils.toBase64(file, (base64Data) => {
                scMessagings[field] = base64Data;
                scMessagings[`${field}ContentType`] = file.type;
            });
        }
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.scMessagings.id !== undefined) {
            this.scMessagingsService.update(this.scMessagings)
                .subscribe((res: ScMessagings) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.scMessagingsService.create(this.scMessagings)
                .subscribe((res: ScMessagings) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess(result: ScMessagings) {
        this.eventManager.broadcast({ name: 'scMessagingsListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-sc-messagings-popup',
    template: ''
})
export class ScMessagingsPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private scMessagingsPopupService: ScMessagingsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.scMessagingsPopupService
                    .open(ScMessagingsDialogComponent, params['id']);
            } else {
                this.modalRef = this.scMessagingsPopupService
                    .open(ScMessagingsDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
