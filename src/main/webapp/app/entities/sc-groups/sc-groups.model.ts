import { User } from '../../shared';
export class ScGroups {
    constructor(
        public id?: number,
        public nameSingular?: string,
        public namePlural?: string,
        public color?: string,
        public icon?: string,
        public user?: User,
    ) {
    }
}
