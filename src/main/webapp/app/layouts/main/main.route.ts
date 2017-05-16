import { Routes } from '@angular/router';

import { JhiMainComponent } from './main.component';

import { homeRoute } from './home/home.route';
import { followingRoute } from './following/following.route';

const MAIN_ROUTES = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    homeRoute,
    followingRoute
];

export const mainState: Routes = [
    {
        path: 'main',
        component: JhiMainComponent,
        children: MAIN_ROUTES
    }
];
