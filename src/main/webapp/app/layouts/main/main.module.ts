import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {RouterModule} from "@angular/router";

import { CocoSharedModule } from '../../shared/shared.module'

import {
    SortComponent,
    TagsComponent,
    HomeComponent,
    JhiMainComponent,
    mainState
} from './';


@NgModule({
    imports: [
        CocoSharedModule,
        RouterModule.forChild(mainState)
    ],
    declarations: [
        JhiMainComponent,
        SortComponent,
        TagsComponent,
        HomeComponent
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MainModule {}
