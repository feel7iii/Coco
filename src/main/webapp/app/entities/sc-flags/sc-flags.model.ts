import { User } from '../../shared';
import { ScPosts } from '../sc-posts';
export class ScFlags {
    constructor(
        public id?: number,
        public type?: string,
        public reason?: string,
        public reasonDetail?: string,
        public time?: any,
        public user?: User,
        public scPosts?: ScPosts,
    ) {
    }
}
