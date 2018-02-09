import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { ScGroups } from './sc-groups.model';
import { ScGroupsPopupService } from './sc-groups-popup.service';
import { ScGroupsService } from './sc-groups.service';
import { User, UserService } from '../../shared';

@Component({
    selector: 'jhi-sc-groups-dialog',
    templateUrl: './sc-groups-dialog.component.html'
})
export class ScGroupsDialogComponent implements OnInit {

    scGroups: ScGroups;
    authorities: any[];
    isSaving: boolean;

    users: User[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private scGroupsService: ScGroupsService,
        private userService: UserService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['scGroups']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.userService.query().subscribe(
            (res: Response) => { this.users = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.scGroups.id !== undefined) {
            this.scGroupsService.update(this.scGroups)
                .subscribe((res: ScGroups) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.scGroupsService.create(this.scGroups)
                .subscribe((res: ScGroups) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess(result: ScGroups) {
        this.eventManager.broadcast({ name: 'scGroupsListModification', content: 'OK'});
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
    selector: 'jhi-sc-groups-popup',
    template: ''
})
export class ScGroupsPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private scGroupsPopupService: ScGroupsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.scGroupsPopupService
                    .open(ScGroupsDialogComponent, params['id']);
            } else {
                this.modalRef = this.scGroupsPopupService
                    .open(ScGroupsDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
