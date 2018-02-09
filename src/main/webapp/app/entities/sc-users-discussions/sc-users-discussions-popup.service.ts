import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { ScUsersDiscussions } from './sc-users-discussions.model';
import { ScUsersDiscussionsService } from './sc-users-discussions.service';
@Injectable()
export class ScUsersDiscussionsPopupService {
    private isOpen = false;
    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private scUsersDiscussionsService: ScUsersDiscussionsService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.scUsersDiscussionsService.find(id).subscribe((scUsersDiscussions) => {
                scUsersDiscussions.readTime = this.datePipe
                    .transform(scUsersDiscussions.readTime, 'yyyy-MM-ddThh:mm');
                this.scUsersDiscussionsModalRef(component, scUsersDiscussions);
            });
        } else {
            return this.scUsersDiscussionsModalRef(component, new ScUsersDiscussions());
        }
    }

    scUsersDiscussionsModalRef(component: Component, scUsersDiscussions: ScUsersDiscussions): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.scUsersDiscussions = scUsersDiscussions;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}
