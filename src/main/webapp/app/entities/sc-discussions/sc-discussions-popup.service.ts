import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { ScDiscussions } from './sc-discussions.model';
import { ScDiscussionsService } from './sc-discussions.service';
@Injectable()
export class ScDiscussionsPopupService {
    private isOpen = false;
    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private scDiscussionsService: ScDiscussionsService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.scDiscussionsService.find(id).subscribe((scDiscussions) => {
                scDiscussions.startTime = this.datePipe
                    .transform(scDiscussions.startTime, 'yyyy-MM-ddThh:mm');
                scDiscussions.lastTime = this.datePipe
                    .transform(scDiscussions.lastTime, 'yyyy-MM-ddThh:mm');
                scDiscussions.hideTime = this.datePipe
                    .transform(scDiscussions.hideTime, 'yyyy-MM-ddThh:mm');
                this.scDiscussionsModalRef(component, scDiscussions);
            });
        } else {
            return this.scDiscussionsModalRef(component, new ScDiscussions());
        }
    }

    scDiscussionsModalRef(component: Component, scDiscussions: ScDiscussions): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.scDiscussions = scDiscussions;
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
