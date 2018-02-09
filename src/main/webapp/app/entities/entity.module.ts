import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CocoScTagsModule } from './sc-tags/sc-tags.module';
import { CocoScDiscussionsModule } from './sc-discussions/sc-discussions.module';
import { CocoScPostsModule } from './sc-posts/sc-posts.module';
import { CocoScFlagsModule } from './sc-flags/sc-flags.module';
import { CocoScPostsMentionsModule } from './sc-posts-mentions/sc-posts-mentions.module';
import { CocoScUsersDiscussionsModule } from './sc-users-discussions/sc-users-discussions.module';
import { CocoScGroupsModule } from './sc-groups/sc-groups.module';
import { CocoScSettingsModule } from './sc-settings/sc-settings.module';
import { CocoScMessagingsModule } from './sc-messagings/sc-messagings.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        CocoScTagsModule,
        CocoScDiscussionsModule,
        CocoScPostsModule,
        CocoScFlagsModule,
        CocoScPostsMentionsModule,
        CocoScUsersDiscussionsModule,
        CocoScGroupsModule,
        CocoScSettingsModule,
        CocoScMessagingsModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CocoEntityModule {}
