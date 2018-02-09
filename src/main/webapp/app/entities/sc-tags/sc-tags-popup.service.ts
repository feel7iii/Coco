import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { ScTags } from './sc-tags.model';
import { ScTagsService } from './sc-tags.service';
@Injectable()
export class ScTagsPopupService {
    private isOpen = false;
    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private scTagsService: ScTagsService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.scTagsService.find(id).subscribe((scTags) => {
                scTags.lastTime = this.datePipe
                    .transform(scTags.lastTime, 'yyyy-MM-ddThh:mm');
                this.scTagsModalRef(component, scTags);
            });
        } else {
            return this.scTagsModalRef(component, new ScTags());
        }
    }

    scTagsModalRef(component: Component, scTags: ScTags): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.scTags = scTags;
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
