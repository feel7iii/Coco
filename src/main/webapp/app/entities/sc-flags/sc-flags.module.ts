import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CocoSharedModule } from '../../shared';
import { CocoAdminModule } from '../../admin/admin.module';
import {
    ScFlagsService,
    ScFlagsPopupService,
    ScFlagsComponent,
    ScFlagsDetailComponent,
    ScFlagsDialogComponent,
    ScFlagsPopupComponent,
    ScFlagsDeletePopupComponent,
    ScFlagsDeleteDialogComponent,
    scFlagsRoute,
    scFlagsPopupRoute,
} from './';

const ENTITY_STATES = [
    ...scFlagsRoute,
    ...scFlagsPopupRoute,
];

@NgModule({
    imports: [
        CocoSharedModule,
        CocoAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ScFlagsComponent,
        ScFlagsDetailComponent,
        ScFlagsDialogComponent,
        ScFlagsDeleteDialogComponent,
        ScFlagsPopupComponent,
        ScFlagsDeletePopupComponent,
    ],
    entryComponents: [
        ScFlagsComponent,
        ScFlagsDialogComponent,
        ScFlagsPopupComponent,
        ScFlagsDeleteDialogComponent,
        ScFlagsDeletePopupComponent,
    ],
    providers: [
        ScFlagsService,
        ScFlagsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CocoScFlagsModule {}
