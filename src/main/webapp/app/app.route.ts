import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { navbarRoute, errorRoute, profileRoute, subjectRoute, discussionPostRoute } from './layouts';

const APP_ROUTES = [
    { path: '', redirectTo: 'main', pathMatch: 'full' },
    navbarRoute,
    profileRoute,
    subjectRoute,
    discussionPostRoute,
    ...errorRoute
];

@NgModule({
    imports: [
        RouterModule.forRoot(APP_ROUTES, { useHash: true })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}
