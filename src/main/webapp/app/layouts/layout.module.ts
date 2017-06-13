import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CocoSharedModule } from '../shared';
import { MainModule } from './main/main.module';

import {
    ProfileComponent,
    SubjectComponent,
    DiscussionPostComponent,
    ErrorComponent
} from './';

@NgModule({
    imports: [
        CocoSharedModule,
        MainModule
    ],
    declarations: [
        ProfileComponent,
        SubjectComponent,
        DiscussionPostComponent,
        ErrorComponent
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CocoLayoutModule {}
