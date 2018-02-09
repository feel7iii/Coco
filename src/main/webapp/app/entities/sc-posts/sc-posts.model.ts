import { ScFlags } from '../sc-flags';
import { ScPostsMentions } from '../sc-posts-mentions';
import { User } from '../../shared';
import { ScDiscussions } from '../sc-discussions';
export class ScPosts {
    constructor(
        public id?: number,
        public number?: number,
        public time?: any,
        public type?: string,
        public content?: any,
        public editTime?: any,
        public editUserId?: number,
        public hideTime?: any,
        public hideUserId?: number,
        public ipAddress?: string,
        public isApproved?: number,
        public isSpam?: number,
        public scFlags?: ScFlags,
        public scPostsMentions?: ScPostsMentions,
        public user?: User,
        public scDiscussions?: ScDiscussions,
    ) {
    }
}
