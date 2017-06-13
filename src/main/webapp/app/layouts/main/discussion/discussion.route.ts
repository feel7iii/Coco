import { Route, Routes } from '@angular/router';

import { DiscussionComponent } from './discussion.component';
import { DiscussionModalComponent } from './discussion-modal.component';

export const discussionRoute: Route = {
    path: 'discussion',
    component: DiscussionComponent,
    data: {
        authorities: [],
        pageTitle: 'home.title'
    },
};

export const discussionTagsPopupRoute: Routes = [
    {
        path: 'discussion-modal',
        component: DiscussionModalComponent,
        data: {
            authorities: [],
            pageTitle: 'home.title'
        },
        outlet: 'discussionTags'
    }
];
