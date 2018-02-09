import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService, DataUtils } from 'ng-jhipster';

import { ScPosts } from './sc-posts.model';
import { ScPostsPopupService } from './sc-posts-popup.service';
import { ScPostsService } from './sc-posts.service';
import { User, UserService } from '../../shared';
import { ScDiscussions, ScDiscussionsService } from '../sc-discussions';

@Component({
    selector: 'jhi-sc-posts-dialog',
    templateUrl: './sc-posts-dialog.component.html'
})
export class ScPostsDialogComponent implements OnInit {

    scPosts: ScPosts;
    authorities: any[];
    isSaving: boolean;

    users: User[];

    scdiscussions: ScDiscussions[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private dataUtils: DataUtils,
        private alertService: AlertService,
        private scPostsService: ScPostsService,
        private userService: UserService,
        private scDiscussionsService: ScDiscussionsService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['scPosts']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.userService.query().subscribe(
            (res: Response) => { this.users = res.json(); }, (res: Response) => this.onError(res.json()));
        this.scDiscussionsService.query().subscribe(
            (res: Response) => { this.scdiscussions = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, scPosts, field, isImage) {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            if (isImage && !/^image\//.test(file.type)) {
                return;
            }
            this.dataUtils.toBase64(file, (base64Data) => {
                scPosts[field] = base64Data;
                scPosts[`${field}ContentType`] = file.type;
            });
        }
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.scPosts.id !== undefined) {
            this.scPostsService.update(this.scPosts)
                .subscribe((res: ScPosts) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.scPostsService.create(this.scPosts)
                .subscribe((res: ScPosts) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess(result: ScPosts) {
        this.eventManager.broadcast({ name: 'scPostsListModification', content: 'OK'});
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
    selector: 'jhi-sc-posts-popup',
    template: ''
})
export class ScPostsPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private scPostsPopupService: ScPostsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.scPostsPopupService
                    .open(ScPostsDialogComponent, params['id']);
            } else {
                this.modalRef = this.scPostsPopupService
                    .open(ScPostsDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
