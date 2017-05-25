import { Routes } from '@angular/router';

import {
    activateRoute,
    passwordRoute,
    passwordResetFinishRoute,
    passwordResetInitRoute,
    registerRoute,
    settingsRoute,
    helpRoute,
    configureRoute,
    AccountComponent
} from './';

const ACCOUNT_ROUTES = [
   { path: '', redirectTo: 'configure', pathMatch: 'full' },
   activateRoute,
   passwordRoute,
   passwordResetFinishRoute,
   passwordResetInitRoute,
   registerRoute,
   settingsRoute,
   helpRoute,
   configureRoute
];

export const accountState: Routes = [{
    path: 'account',
    component: AccountComponent,
    children: ACCOUNT_ROUTES
}];
