import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CocoSharedModule } from '../../shared';
import { CocoAdminModule } from '../../admin/admin.module';
import {
    ScUsersDiscussionsService,
    ScUsersDiscussionsPopupService,
    ScUsersDiscussionsComponent,
    ScUsersDiscussionsDetailComponent,
    ScUsersDiscussionsDialogComponent,
    ScUsersDiscussionsPopupComponent,
    ScUsersDiscussionsDeletePopupComponent,
    ScUsersDiscussionsDeleteDialogComponent,
    scUsersDiscussionsRoute,
    scUsersDiscussionsPopupRoute,
} from './';

const ENTITY_STATES = [
    ...scUsersDiscussionsRoute,
    ...scUsersDiscussionsPopupRoute,
];

@NgModule({
    imports: [
        CocoSharedModule,
        CocoAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ScUsersDiscussionsComponent,
        ScUsersDiscussionsDetailComponent,
        ScUsersDiscussionsDialogComponent,
        ScUsersDiscussionsDeleteDialogComponent,
        ScUsersDiscussionsPopupComponent,
        ScUsersDiscussionsDeletePopupComponent,
    ],
    entryComponents: [
        ScUsersDiscussionsComponent,
        ScUsersDiscussionsDialogComponent,
        ScUsersDiscussionsPopupComponent,
        ScUsersDiscussionsDeleteDialogComponent,
        ScUsersDiscussionsDeletePopupComponent,
    ],
    providers: [
        ScUsersDiscussionsService,
        ScUsersDiscussionsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CocoScUsersDiscussionsModule {}
