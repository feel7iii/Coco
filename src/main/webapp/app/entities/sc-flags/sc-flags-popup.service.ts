import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { ScFlags } from './sc-flags.model';
import { ScFlagsService } from './sc-flags.service';
@Injectable()
export class ScFlagsPopupService {
    private isOpen = false;
    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private scFlagsService: ScFlagsService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.scFlagsService.find(id).subscribe((scFlags) => {
                scFlags.time = this.datePipe
                    .transform(scFlags.time, 'yyyy-MM-ddThh:mm');
                this.scFlagsModalRef(component, scFlags);
            });
        } else {
            return this.scFlagsModalRef(component, new ScFlags());
        }
    }

    scFlagsModalRef(component: Component, scFlags: ScFlags): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.scFlags = scFlags;
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
