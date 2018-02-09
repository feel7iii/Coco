import { User } from '../../shared';
import { ScDiscussions } from '../sc-discussions';
export class ScTags {
    constructor(
        public id?: number,
        public name?: string,
        public slug?: string,
        public description?: any,
        public color?: string,
        public backgroundPath?: string,
        public backgroundMode?: string,
        public position?: number,
        public parentId?: number,
        public defaultSort?: string,
        public isRestricted?: number,
        public isHidden?: number,
        public discussionsCount?: number,
        public lastTime?: any,
        public lastDiscussionId?: number,
        public user?: User,
        public scTags?: ScTags,
        public scDiscussions?: ScDiscussions,
    ) {
    }
}
