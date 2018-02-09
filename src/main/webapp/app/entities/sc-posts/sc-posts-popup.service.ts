import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { ScPosts } from './sc-posts.model';
import { ScPostsService } from './sc-posts.service';
@Injectable()
export class ScPostsPopupService {
    private isOpen = false;
    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private scPostsService: ScPostsService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.scPostsService.find(id).subscribe((scPosts) => {
                scPosts.time = this.datePipe
                    .transform(scPosts.time, 'yyyy-MM-ddThh:mm');
                scPosts.editTime = this.datePipe
                    .transform(scPosts.editTime, 'yyyy-MM-ddThh:mm');
                scPosts.hideTime = this.datePipe
                    .transform(scPosts.hideTime, 'yyyy-MM-ddThh:mm');
                this.scPostsModalRef(component, scPosts);
            });
        } else {
            return this.scPostsModalRef(component, new ScPosts());
        }
    }

    scPostsModalRef(component: Component, scPosts: ScPosts): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.scPosts = scPosts;
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
