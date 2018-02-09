import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { ScUsersDiscussions } from './sc-users-discussions.model';
import { ScUsersDiscussionsPopupService } from './sc-users-discussions-popup.service';
import { ScUsersDiscussionsService } from './sc-users-discussions.service';
import { User, UserService } from '../../shared';
import { ScDiscussions, ScDiscussionsService } from '../sc-discussions';

@Component({
    selector: 'jhi-sc-users-discussions-dialog',
    templateUrl: './sc-users-discussions-dialog.component.html'
})
export class ScUsersDiscussionsDialogComponent implements OnInit {

    scUsersDiscussions: ScUsersDiscussions;
    authorities: any[];
    isSaving: boolean;

    users: User[];

    scdiscussions: ScDiscussions[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private scUsersDiscussionsService: ScUsersDiscussionsService,
        private userService: UserService,
        private scDiscussionsService: ScDiscussionsService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['scUsersDiscussions', 'scSubscription']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.userService.query().subscribe(
            (res: Response) => { this.users = res.json(); }, (res: Response) => this.onError(res.json()));
        this.scDiscussionsService.query().subscribe(
            (res: Response) => { this.scdiscussions = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.scUsersDiscussions.id !== undefined) {
            this.scUsersDiscussionsService.update(this.scUsersDiscussions)
                .subscribe((res: ScUsersDiscussions) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.scUsersDiscussionsService.create(this.scUsersDiscussions)
                .subscribe((res: ScUsersDiscussions) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess(result: ScUsersDiscussions) {
        this.eventManager.broadcast({ name: 'scUsersDiscussionsListModification', content: 'OK'});
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

    trackScDiscussionsById(index: number, item: ScDiscussions) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-sc-users-discussions-popup',
    template: ''
})
export class ScUsersDiscussionsPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private scUsersDiscussionsPopupService: ScUsersDiscussionsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.scUsersDiscussionsPopupService
                    .open(ScUsersDiscussionsDialogComponent, params['id']);
            } else {
                this.modalRef = this.scUsersDiscussionsPopupService
                    .open(ScUsersDiscussionsDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
