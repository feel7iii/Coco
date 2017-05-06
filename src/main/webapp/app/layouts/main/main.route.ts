import { Routes } from '@angular/router';

import { JhiMainComponent } from './main.component';

import { homeRoute } from './home/home.route';

const MAIN_ROUTES = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    homeRoute
];

export const mainState: Routes = [
    {
        path: 'main',
        component: JhiMainComponent,
        children: MAIN_ROUTES
    }
];
