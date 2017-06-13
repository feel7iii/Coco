import {Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { Subscription } from 'rxjs/Subscription';
import { Account, LoginModalService, Principal, CommunicationService } from '../../../shared';

@Component({
    selector: 'jhi-discussion',
    templateUrl: './discussion.component.html',
})
export class DiscussionComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    subscription: Subscription;
    discussionModalShow = false;
    @ViewChild ('startDiscussion') startDiscussion: ElementRef;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: EventManager,
        private renderer: Renderer2,
        private communicationService: CommunicationService
    ) {
        this.jhiLanguageService.setLocations(['home']);
        this.subscription = communicationService.communicationAnnounced$.subscribe(
            (startDis) => {
                if ('startDiscussion' === startDis) {
                    this.discussionModalShow = true;
                }
            }
        );
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    clear() {
        this.discussionModalShow = false;
    }
}
