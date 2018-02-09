import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { ScPostsMentions } from './sc-posts-mentions.model';
import { ScPostsMentionsService } from './sc-posts-mentions.service';
@Injectable()
export class ScPostsMentionsPopupService {
    private isOpen = false;
    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private scPostsMentionsService: ScPostsMentionsService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.scPostsMentionsService.find(id).subscribe((scPostsMentions) => {
                scPostsMentions.time = this.datePipe
                    .transform(scPostsMentions.time, 'yyyy-MM-ddThh:mm');
                this.scPostsMentionsModalRef(component, scPostsMentions);
            });
        } else {
            return this.scPostsMentionsModalRef(component, new ScPostsMentions());
        }
    }

    scPostsMentionsModalRef(component: Component, scPostsMentions: ScPostsMentions): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.scPostsMentions = scPostsMentions;
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
