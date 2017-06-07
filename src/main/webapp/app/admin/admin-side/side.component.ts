import {Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiLanguageService } from 'ng-jhipster';

import { JhiLanguageHelper } from '../../shared';

@Component({
    selector: 'jhi-admin-side',
    templateUrl: './side.component.html',
    styles: [`
    `]
})
export class AdminSideComponent implements OnInit {
    languages: any[];
    navOpen = false;

    inProduction = true;
    swaggerEnabled = true;

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
        this.navOpen = !this.navOpen;
    }

    switchLi(e) {
        const groupLi: any = $('#sidebar-wrapper ul li');
        console.log(e);
        for (const navLi of groupLi) {
            // if (navLi.id === pageDivId) {
            //     $('#' + divA.id).addClass('active');
            // } else {
            //     $('#' + divA.id).removeClass('active');
            // }
        }
    }
}
