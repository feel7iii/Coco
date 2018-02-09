
const enum ScSubscription {
    'FOLLOW',
    'IGNORE'

};
import { User } from '../../shared';
import { ScDiscussions } from '../sc-discussions';
export class ScUsersDiscussions {
    constructor(
        public id?: number,
        public readTime?: any,
        public readNumber?: number,
        public scSubscription?: ScSubscription,
        public user?: User,
        public scDiscussions?: ScDiscussions,
    ) {
    }
}
