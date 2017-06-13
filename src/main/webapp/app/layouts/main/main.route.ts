import { Routes } from '@angular/router';

import {
    discussionRoute,
    discussionTagsPopupRoute,
    followingRoute,
    JhiMainComponent
} from './';

const MAIN_ROUTES = [
    { path: '', redirectTo: 'discussion', pathMatch: 'full' },
    discussionRoute,
    ...discussionTagsPopupRoute,
    followingRoute
];

export const mainState: Routes = [
    {
        path: 'main',
        component: JhiMainComponent,
        children: MAIN_ROUTES
    }
];
