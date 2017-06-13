import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {RouterModule} from '@angular/router';

import { CocoSharedModule } from '../../shared';

import {
    JhiMainComponent,
    NoticeComponent,
    SortComponent,
    TagsComponent,
    DiscussionComponent,
    DiscussionModalComponent,
    FollowingComponent,
    mainState
} from './';

@NgModule({
    imports: [
        CocoSharedModule,
        RouterModule.forChild(mainState)
    ],
    declarations: [
        JhiMainComponent,
        NoticeComponent,
        SortComponent,
        TagsComponent,
        DiscussionComponent,
        DiscussionModalComponent,
        FollowingComponent
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MainModule {}
