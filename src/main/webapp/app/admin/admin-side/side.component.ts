import { Component } from '@angular/core';
import { JhiLanguageService } from 'ng-jhipster';

@Component({
    selector: 'jhi-admin-side',
    templateUrl: './side.component.html'
})
export class AdminSideComponent {
    constructor(
        private jhiLanguageService: JhiLanguageService
    ) {
        this.jhiLanguageService.setLocations(['home']);
    }
}
