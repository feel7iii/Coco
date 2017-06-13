import { Route } from '@angular/router';

import { DiscussionPostComponent } from './discussion.component';

export const discussionPostRoute: Route = {
    path: 'discussion-post',
    component: DiscussionPostComponent,
    data: {
        authorities: [],
        pageTitle: 'home.title'
    }
};
