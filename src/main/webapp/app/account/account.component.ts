import { Component } from '@angular/core';

@Component({
    selector: 'jhi-account',
    template: `
    <div class="UserPage">
        <div class="container">
            <jhi-account-side></jhi-account-side>
            <div class="sideNavOffset UserPage-content">
                <router-outlet></router-outlet>
            </div>
        </div>
    </div>
    `
})
export class AccountComponent {
}
