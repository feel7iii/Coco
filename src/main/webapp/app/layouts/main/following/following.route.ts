import { Route } from '@angular/router';

import { FollowingComponent } from './following.component';

export const followingRoute: Route = {
    path: 'following',
    component: FollowingComponent,
    data: {
        authorities: [],
        pageTitle: 'home.title'
    },
};
