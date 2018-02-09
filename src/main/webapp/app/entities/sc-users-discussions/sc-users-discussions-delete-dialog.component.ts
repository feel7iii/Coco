import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { ScUsersDiscussions } from './sc-users-discussions.model';
import { ScUsersDiscussionsPopupService } from './sc-users-discussions-popup.service';
import { ScUsersDiscussionsService } from './sc-users-discussions.service';

@Component({
    selector: 'jhi-sc-users-discussions-delete-dialog',
    templateUrl: './sc-users-discussions-delete-dialog.component.html'
})
export class ScUsersDiscussionsDeleteDialogComponent {

    scUsersDiscussions: ScUsersDiscussions;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private scUsersDiscussionsService: ScUsersDiscussionsService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['scUsersDiscussions', 'scSubscription']);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.scUsersDiscussionsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'scUsersDiscussionsListModification',
                content: 'Deleted an scUsersDiscussions'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-sc-users-discussions-delete-popup',
    template: ''
})
export class ScUsersDiscussionsDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private scUsersDiscussionsPopupService: ScUsersDiscussionsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.scUsersDiscussionsPopupService
                .open(ScUsersDiscussionsDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
