import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService, DataUtils } from 'ng-jhipster';

import { ScSettings } from './sc-settings.model';
import { ScSettingsPopupService } from './sc-settings-popup.service';
import { ScSettingsService } from './sc-settings.service';
import { User, UserService } from '../../shared';

@Component({
    selector: 'jhi-sc-settings-dialog',
    templateUrl: './sc-settings-dialog.component.html'
})
export class ScSettingsDialogComponent implements OnInit {

    scSettings: ScSettings;
    authorities: any[];
    isSaving: boolean;

    users: User[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private dataUtils: DataUtils,
        private alertService: AlertService,
        private scSettingsService: ScSettingsService,
        private userService: UserService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['scSettings']);
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

    setFileData(event, scSettings, field, isImage) {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            if (isImage && !/^image\//.test(file.type)) {
                return;
            }
            this.dataUtils.toBase64(file, (base64Data) => {
                scSettings[field] = base64Data;
                scSettings[`${field}ContentType`] = file.type;
            });
        }
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.scSettings.id !== undefined) {
            this.scSettingsService.update(this.scSettings)
                .subscribe((res: ScSettings) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.scSettingsService.create(this.scSettings)
                .subscribe((res: ScSettings) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess(result: ScSettings) {
        this.eventManager.broadcast({ name: 'scSettingsListModification', content: 'OK'});
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
    selector: 'jhi-sc-settings-popup',
    template: ''
})
export class ScSettingsPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private scSettingsPopupService: ScSettingsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.scSettingsPopupService
                    .open(ScSettingsDialogComponent, params['id']);
            } else {
                this.modalRef = this.scSettingsPopupService
                    .open(ScSettingsDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
