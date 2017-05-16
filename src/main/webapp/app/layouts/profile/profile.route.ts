import { Route } from '@angular/router';

import { UserRouteAccessService } from '../../shared';

import { ProfileComponent } from './profile.component';

export const profileRoute: Route = {
    path: 'profile',
    component: ProfileComponent,
    data: {
        authorities: ['USER_ROLE'],
        pageTitle: 'home.title'
    },
    canActivate: [UserRouteAccessService]
};
