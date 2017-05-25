import { Routes } from '@angular/router';

import {
    homeRoute,
    followingRoute,
    JhiMainComponent
} from './';

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
