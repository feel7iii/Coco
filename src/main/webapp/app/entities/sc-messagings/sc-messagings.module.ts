import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CocoSharedModule } from '../../shared';
import { CocoAdminModule } from '../../admin/admin.module';
import {
    ScMessagingsService,
    ScMessagingsPopupService,
    ScMessagingsComponent,
    ScMessagingsDetailComponent,
    ScMessagingsDialogComponent,
    ScMessagingsPopupComponent,
    ScMessagingsDeletePopupComponent,
    ScMessagingsDeleteDialogComponent,
    scMessagingsRoute,
    scMessagingsPopupRoute,
} from './';

const ENTITY_STATES = [
    ...scMessagingsRoute,
    ...scMessagingsPopupRoute,
];

@NgModule({
    imports: [
        CocoSharedModule,
        CocoAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ScMessagingsComponent,
        ScMessagingsDetailComponent,
        ScMessagingsDialogComponent,
        ScMessagingsDeleteDialogComponent,
        ScMessagingsPopupComponent,
        ScMessagingsDeletePopupComponent,
    ],
    entryComponents: [
        ScMessagingsComponent,
        ScMessagingsDialogComponent,
        ScMessagingsPopupComponent,
        ScMessagingsDeleteDialogComponent,
        ScMessagingsDeletePopupComponent,
    ],
    providers: [
        ScMessagingsService,
        ScMessagingsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CocoScMessagingsModule {}
