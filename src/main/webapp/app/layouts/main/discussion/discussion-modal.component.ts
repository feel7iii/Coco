import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router'

@Component({
    selector: 'jhi-discussion-modal',
    templateUrl: './discussion-modal.component.html'
})
export class DiscussionModalComponent implements OnInit {
    @ViewChild('startDiscussion') startDiscussion: ElementRef;
    @ViewChild('backShadow') backShadow: ElementRef;

    constructor(
        private router: Router,
        private renderer2: Renderer2
    ) {
    }

    ngOnInit() {
        document.body.style.cssText = 'overflow: hidden';
    }

    closeModal() {
        this.renderer2.setStyle(this.startDiscussion.nativeElement, 'display', 'none');
        this.renderer2.setStyle(this.backShadow.nativeElement, 'display', 'none');
    }
}
