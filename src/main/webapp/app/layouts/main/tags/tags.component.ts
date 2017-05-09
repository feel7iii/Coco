import { Component } from '@angular/core';
import { JhiLanguageService } from 'ng-jhipster';

@Component({
    selector: 'jhi-tags',
    templateUrl: './tags.component.html'
})
export class TagsComponent {
    constructor(
        private languageService: JhiLanguageService
    ){
        this.languageService.setLocations(['home']);
    }
}
