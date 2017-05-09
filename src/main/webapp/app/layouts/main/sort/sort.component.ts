import { Component } from '@angular/core';
import { JhiLanguageService } from 'ng-jhipster';

@Component({
    selector: 'jhi-sort',
    templateUrl: './sort.component.html'
})
export class SortComponent {
    constructor(
        private languageService: JhiLanguageService
    ){
        this.languageService.setLocations(['home']);
    }
}
