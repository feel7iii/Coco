import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiLanguageService } from 'ng-jhipster';

import { Account, Principal } from '../../../shared';

@Component({
    selector: 'jhi-following',
    templateUrl: './following.component.html',
})
export class FollowingComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private principal: Principal,
    ) {
        this.jhiLanguageService.setLocations(['home']);
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });
    }

}
