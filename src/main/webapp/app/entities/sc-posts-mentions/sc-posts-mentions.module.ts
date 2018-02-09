import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CocoSharedModule } from '../../shared';
import { CocoAdminModule } from '../../admin/admin.module';
import {
    ScPostsMentionsService,
    ScPostsMentionsPopupService,
    ScPostsMentionsComponent,
    ScPostsMentionsDetailComponent,
    ScPostsMentionsDialogComponent,
    ScPostsMentionsPopupComponent,
    ScPostsMentionsDeletePopupComponent,
    ScPostsMentionsDeleteDialogComponent,
    scPostsMentionsRoute,
    scPostsMentionsPopupRoute,
} from './';

const ENTITY_STATES = [
    ...scPostsMentionsRoute,
    ...scPostsMentionsPopupRoute,
];

@NgModule({
    imports: [
        CocoSharedModule,
        CocoAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ScPostsMentionsComponent,
        ScPostsMentionsDetailComponent,
        ScPostsMentionsDialogComponent,
        ScPostsMentionsDeleteDialogComponent,
        ScPostsMentionsPopupComponent,
        ScPostsMentionsDeletePopupComponent,
    ],
    entryComponents: [
        ScPostsMentionsComponent,
        ScPostsMentionsDialogComponent,
        ScPostsMentionsPopupComponent,
        ScPostsMentionsDeleteDialogComponent,
        ScPostsMentionsDeletePopupComponent,
    ],
    providers: [
        ScPostsMentionsService,
        ScPostsMentionsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CocoScPostsMentionsModule {}
