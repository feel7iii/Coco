import {Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiLanguageService } from 'ng-jhipster';

import { JhiLanguageHelper } from '../../shared';

@Component({
    selector: 'jhi-admin-side',
    templateUrl: './side.component.html'
})
export class AdminSideComponent implements OnInit {
    languages: any[];
    navOpen: true;

    constructor(
        private languageHelper: JhiLanguageHelper,
        private languageService: JhiLanguageService,
    ) {
        this.languageService.addLocation('home');
    }

    ngOnInit() {
        this.languageHelper.getAll().then((languages) => {
            this.languages = languages;
        });
    }

    openNav() {
    }
}
