import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { ScMessagings } from './sc-messagings.model';
import { ScMessagingsService } from './sc-messagings.service';
@Injectable()
export class ScMessagingsPopupService {
    private isOpen = false;
    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private scMessagingsService: ScMessagingsService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.scMessagingsService.find(id).subscribe((scMessagings) => {
                scMessagings.time = this.datePipe
                    .transform(scMessagings.time, 'yyyy-MM-ddThh:mm');
                this.scMessagingsModalRef(component, scMessagings);
            });
        } else {
            return this.scMessagingsModalRef(component, new ScMessagings());
        }
    }

    scMessagingsModalRef(component: Component, scMessagings: ScMessagings): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.scMessagings = scMessagings;
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
