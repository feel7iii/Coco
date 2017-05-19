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
    AcountComponent
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
    component: AcountComponent,
    children: ACCOUNT_ROUTES
}];
