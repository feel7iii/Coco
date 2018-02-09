import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CocoSharedModule } from '../../shared';
import { CocoAdminModule } from '../../admin/admin.module';
import {
    ScGroupsService,
    ScGroupsPopupService,
    ScGroupsComponent,
    ScGroupsDetailComponent,
    ScGroupsDialogComponent,
    ScGroupsPopupComponent,
    ScGroupsDeletePopupComponent,
    ScGroupsDeleteDialogComponent,
    scGroupsRoute,
    scGroupsPopupRoute,
} from './';

const ENTITY_STATES = [
    ...scGroupsRoute,
    ...scGroupsPopupRoute,
];

@NgModule({
    imports: [
        CocoSharedModule,
        CocoAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ScGroupsComponent,
        ScGroupsDetailComponent,
        ScGroupsDialogComponent,
        ScGroupsDeleteDialogComponent,
        ScGroupsPopupComponent,
        ScGroupsDeletePopupComponent,
    ],
    entryComponents: [
        ScGroupsComponent,
        ScGroupsDialogComponent,
        ScGroupsPopupComponent,
        ScGroupsDeleteDialogComponent,
        ScGroupsDeletePopupComponent,
    ],
    providers: [
        ScGroupsService,
        ScGroupsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CocoScGroupsModule {}
