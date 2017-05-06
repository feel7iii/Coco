import { Route } from '@angular/router';

import { ProfileComponent } from './profile.component'

export const profileRoute: Route = {
    path: 'profile',
    component: ProfileComponent,
    data: {
        authorities: [],
        pageTitle: 'home.title'
    }
};
