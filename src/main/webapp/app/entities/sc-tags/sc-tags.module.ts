import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CocoSharedModule } from '../../shared';
import { CocoAdminModule } from '../../admin/admin.module';
import {
    ScTagsService,
    ScTagsPopupService,
    ScTagsComponent,
    ScTagsDetailComponent,
    ScTagsDialogComponent,
    ScTagsPopupComponent,
    ScTagsDeletePopupComponent,
    ScTagsDeleteDialogComponent,
    scTagsRoute,
    scTagsPopupRoute,
} from './';

const ENTITY_STATES = [
    ...scTagsRoute,
    ...scTagsPopupRoute,
];

@NgModule({
    imports: [
        CocoSharedModule,
        CocoAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ScTagsComponent,
        ScTagsDetailComponent,
        ScTagsDialogComponent,
        ScTagsDeleteDialogComponent,
        ScTagsPopupComponent,
        ScTagsDeletePopupComponent,
    ],
    entryComponents: [
        ScTagsComponent,
        ScTagsDialogComponent,
        ScTagsPopupComponent,
        ScTagsDeleteDialogComponent,
        ScTagsDeletePopupComponent,
    ],
    providers: [
        ScTagsService,
        ScTagsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CocoScTagsModule {}
