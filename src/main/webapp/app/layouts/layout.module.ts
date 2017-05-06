import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CocoSharedModule } from '../shared';
import { MainModule } from './main/main.module';

import {
    ProfileComponent,
    NoticeComponent,
    NavbarComponent,
    SubjectComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent
} from './'

@NgModule({
    imports: [
        CocoSharedModule,
        MainModule,
    ],
    declarations: [
        ProfileComponent,
        NoticeComponent,
        NavbarComponent,
        SubjectComponent,
        FooterComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        ErrorComponent
    ],
    providers: [
        ProfileService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CocoLayoutModule {}
