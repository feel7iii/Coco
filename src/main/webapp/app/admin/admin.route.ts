import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../shared';

import {
    auditsRoute,
    configurationRoute,
    docsRoute,
    healthRoute,
    logsRoute,
    metricsRoute,
    trackerRoute,
    userMgmtRoute,
    userDialogRoute,
    AdminComponent
} from './';

const ADMIN_ROUTES = [
    { path: '', redirectTo: 'metrics', pathMatch: 'full' },
    auditsRoute,
    configurationRoute,
    docsRoute,
    healthRoute,
    logsRoute,
    trackerRoute,
    metricsRoute,
    ...userMgmtRoute
];

export const adminState: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        data: {
            authorities: ['ROLE_ADMIN']
        },
        canActivate: [UserRouteAccessService],
        children: ADMIN_ROUTES
    },
    ...userDialogRoute
];
