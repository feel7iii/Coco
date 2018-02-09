import { ScUsersDiscussions } from '../sc-users-discussions';
import { ScPosts } from '../sc-posts';
import { ScTags } from '../sc-tags';
export class ScDiscussions {
    constructor(
        public id?: number,
        public title?: string,
        public commentsCount?: number,
        public participantsCount?: number,
        public numberIndex?: number,
        public startTime?: any,
        public startUserId?: number,
        public startPostId?: number,
        public lastTime?: any,
        public lastUserId?: number,
        public lastPostId?: number,
        public lastPostNumber?: number,
        public hideTime?: any,
        public hideUserId?: number,
        public isApproved?: number,
        public isLocked?: number,
        public isSticky?: number,
        public scUsersDiscussions?: ScUsersDiscussions,
        public scPosts?: ScPosts,
        public scTags?: ScTags,
    ) {
    }
}
