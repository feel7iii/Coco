import { User } from '../../shared';
import { ScPosts } from '../sc-posts';
export class ScPostsMentions {
    constructor(
        public id?: number,
        public senderId?: number,
        public data?: any,
        public time?: any,
        public isRead?: number,
        public user?: User,
        public scPosts?: ScPosts,
    ) {
    }
}
