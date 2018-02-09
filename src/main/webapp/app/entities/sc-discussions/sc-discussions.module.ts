import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CocoSharedModule } from '../../shared';
import {
    ScDiscussionsService,
    ScDiscussionsPopupService,
    ScDiscussionsComponent,
    ScDiscussionsDetailComponent,
    ScDiscussionsDialogComponent,
    ScDiscussionsPopupComponent,
    ScDiscussionsDeletePopupComponent,
    ScDiscussionsDeleteDialogComponent,
    scDiscussionsRoute,
    scDiscussionsPopupRoute,
} from './';

const ENTITY_STATES = [
    ...scDiscussionsRoute,
    ...scDiscussionsPopupRoute,
];

@NgModule({
    imports: [
        CocoSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ScDiscussionsComponent,
        ScDiscussionsDetailComponent,
        ScDiscussionsDialogComponent,
        ScDiscussionsDeleteDialogComponent,
        ScDiscussionsPopupComponent,
        ScDiscussionsDeletePopupComponent,
    ],
    entryComponents: [
        ScDiscussionsComponent,
        ScDiscussionsDialogComponent,
        ScDiscussionsPopupComponent,
        ScDiscussionsDeleteDialogComponent,
        ScDiscussionsDeletePopupComponent,
    ],
    providers: [
        ScDiscussionsService,
        ScDiscussionsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CocoScDiscussionsModule {}
