import { User } from '../../shared';
export class ScMessagings {
    constructor(
        public id?: number,
        public senderId?: number,
        public subjectType?: string,
        public subjectId?: number,
        public data?: any,
        public time?: any,
        public isRead?: number,
        public isDeleted?: number,
        public user?: User,
    ) {
    }
}
