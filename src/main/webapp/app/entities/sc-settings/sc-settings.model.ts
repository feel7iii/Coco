import { User } from '../../shared';
export class ScSettings {
    constructor(
        public id?: number,
        public key?: string,
        public value?: any,
        public user?: User,
    ) {
    }
}
