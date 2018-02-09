import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService, DataUtils } from 'ng-jhipster';

import { ScPostsMentions } from './sc-posts-mentions.model';
import { ScPostsMentionsPopupService } from './sc-posts-mentions-popup.service';
import { ScPostsMentionsService } from './sc-posts-mentions.service';
import { User, UserService } from '../../shared';
import { ScPosts, ScPostsService } from '../sc-posts';

@Component({
    selector: 'jhi-sc-posts-mentions-dialog',
    templateUrl: './sc-posts-mentions-dialog.component.html'
})
export class ScPostsMentionsDialogComponent implements OnInit {

    scPostsMentions: ScPostsMentions;
    authorities: any[];
    isSaving: boolean;

    users: User[];

    scposts: ScPosts[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private dataUtils: DataUtils,
        private alertService: AlertService,
        private scPostsMentionsService: ScPostsMentionsService,
        private userService: UserService,
        private scPostsService: ScPostsService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['scPostsMentions']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.userService.query().subscribe(
            (res: Response) => { this.users = res.json(); }, (res: Response) => this.onError(res.json()));
        this.scPostsService.query().subscribe(
            (res: Response) => { this.scposts = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, scPostsMentions, field, isImage) {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            if (isImage && !/^image\//.test(file.type)) {
                return;
            }
            this.dataUtils.toBase64(file, (base64Data) => {
                scPostsMentions[field] = base64Data;
                scPostsMentions[`${field}ContentType`] = file.type;
            });
        }
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.scPostsMentions.id !== undefined) {
            this.scPostsMentionsService.update(this.scPostsMentions)
                .subscribe((res: ScPostsMentions) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.scPostsMentionsService.create(this.scPostsMentions)
                .subscribe((res: ScPostsMentions) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess(result: ScPostsMentions) {
        this.eventManager.broadcast({ name: 'scPostsMentionsListModification', content: 'OK'});
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
    selector: 'jhi-sc-posts-mentions-popup',
    template: ''
})
export class ScPostsMentionsPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private scPostsMentionsPopupService: ScPostsMentionsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.scPostsMentionsPopupService
                    .open(ScPostsMentionsDialogComponent, params['id']);
            } else {
                this.modalRef = this.scPostsMentionsPopupService
                    .open(ScPostsMentionsDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
