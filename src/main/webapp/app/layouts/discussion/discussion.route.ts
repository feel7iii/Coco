import { Route } from '@angular/router';

import { DiscussionComponent } from './discussion.component';

export const discussionRoute: Route = {
    path: 'discussion',
    component: DiscussionComponent,
    data: {
        authorities: [],
        pageTitle: 'home.title'
    }
};
