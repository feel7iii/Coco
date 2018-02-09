import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CocoSharedModule } from '../../shared';
import { CocoAdminModule } from '../../admin/admin.module';
import {
    ScSettingsService,
    ScSettingsPopupService,
    ScSettingsComponent,
    ScSettingsDetailComponent,
    ScSettingsDialogComponent,
    ScSettingsPopupComponent,
    ScSettingsDeletePopupComponent,
    ScSettingsDeleteDialogComponent,
    scSettingsRoute,
    scSettingsPopupRoute,
} from './';

const ENTITY_STATES = [
    ...scSettingsRoute,
    ...scSettingsPopupRoute,
];

@NgModule({
    imports: [
        CocoSharedModule,
        CocoAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ScSettingsComponent,
        ScSettingsDetailComponent,
        ScSettingsDialogComponent,
        ScSettingsDeleteDialogComponent,
        ScSettingsPopupComponent,
        ScSettingsDeletePopupComponent,
    ],
    entryComponents: [
        ScSettingsComponent,
        ScSettingsDialogComponent,
        ScSettingsPopupComponent,
        ScSettingsDeleteDialogComponent,
        ScSettingsDeletePopupComponent,
    ],
    providers: [
        ScSettingsService,
        ScSettingsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CocoScSettingsModule {}
