import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { ScFlags } from './sc-flags.model';
import { ScFlagsPopupService } from './sc-flags-popup.service';
import { ScFlagsService } from './sc-flags.service';
import { User, UserService } from '../../shared';
import { ScPosts, ScPostsService } from '../sc-posts';

@Component({
    selector: 'jhi-sc-flags-dialog',
    templateUrl: './sc-flags-dialog.component.html'
})
export class ScFlagsDialogComponent implements OnInit {

    scFlags: ScFlags;
    authorities: any[];
    isSaving: boolean;

    users: User[];

    scposts: ScPosts[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private scFlagsService: ScFlagsService,
        private userService: UserService,
        private scPostsService: ScPostsService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['scFlags']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.userService.query().subscribe(
            (res: Response) => { this.users = res.json(); }, (res: Response) => this.onError(res.json()));
        this.scPostsService.query().subscribe(
            (res: Response) => { this.scposts = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.scFlags.id !== undefined) {
            this.scFlagsService.update(this.scFlags)
                .subscribe((res: ScFlags) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.scFlagsService.create(this.scFlags)
                .subscribe((res: ScFlags) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess(result: ScFlags) {
        this.eventManager.broadcast({ name: 'scFlagsListModification', content: 'OK'});
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

    trackScPostsById(index: number, item: ScPosts) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-sc-flags-popup',
    template: ''
})
export class ScFlagsPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private scFlagsPopupService: ScFlagsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.scFlagsPopupService
                    .open(ScFlagsDialogComponent, params['id']);
            } else {
                this.modalRef = this.scFlagsPopupService
                    .open(ScFlagsDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
