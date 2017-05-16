import { Route } from '@angular/router';

import { HomeComponent } from './home.component';

export const homeRoute: Route = {
    path: 'home',
    component: HomeComponent,
    data: {
        authorities: [],
        pageTitle: 'home.title'
    },
};
