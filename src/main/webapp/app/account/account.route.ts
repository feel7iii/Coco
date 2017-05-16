import { Routes } from '@angular/router';

import {
    activateRoute,
    passwordRoute,
    passwordResetFinishRoute,
    passwordResetInitRoute,
    registerRoute,
    settingsRoute,
    configureRoute
} from './';

const ACCOUNT_ROUTES = [
   { path: '', redirectTo: 'settings', pathMatch: 'full' },
   activateRoute,
   passwordRoute,
   passwordResetFinishRoute,
   passwordResetInitRoute,
   registerRoute,
   settingsRoute,
   configureRoute
];

export const accountState: Routes = [{
    path: 'account',
    children: ACCOUNT_ROUTES
}];
