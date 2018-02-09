import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CocoSharedModule } from '../../shared';
import { CocoAdminModule } from '../../admin/admin.module';
import {
    ScPostsService,
    ScPostsPopupService,
    ScPostsComponent,
    ScPostsDetailComponent,
    ScPostsDialogComponent,
    ScPostsPopupComponent,
    ScPostsDeletePopupComponent,
    ScPostsDeleteDialogComponent,
    scPostsRoute,
    scPostsPopupRoute,
} from './';

const ENTITY_STATES = [
    ...scPostsRoute,
    ...scPostsPopupRoute,
];

@NgModule({
    imports: [
        CocoSharedModule,
        CocoAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ScPostsComponent,
        ScPostsDetailComponent,
        ScPostsDialogComponent,
        ScPostsDeleteDialogComponent,
        ScPostsPopupComponent,
        ScPostsDeletePopupComponent,
    ],
    entryComponents: [
        ScPostsComponent,
        ScPostsDialogComponent,
        ScPostsPopupComponent,
        ScPostsDeleteDialogComponent,
        ScPostsDeletePopupComponent,
    ],
    providers: [
        ScPostsService,
        ScPostsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CocoScPostsModule {}
