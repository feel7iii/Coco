import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { ScPosts } from './sc-posts.model';
import { ScPostsPopupService } from './sc-posts-popup.service';
import { ScPostsService } from './sc-posts.service';

@Component({
    selector: 'jhi-sc-posts-delete-dialog',
    templateUrl: './sc-posts-delete-dialog.component.html'
})
export class ScPostsDeleteDialogComponent {

    scPosts: ScPosts;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private scPostsService: ScPostsService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['scPosts']);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.scPostsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'scPostsListModification',
                content: 'Deleted an scPosts'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-sc-posts-delete-popup',
    template: ''
})
export class ScPostsDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private scPostsPopupService: ScPostsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.scPostsPopupService
                .open(ScPostsDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
