import { Route } from '@angular/router';

import { SubjectComponent } from './subject.component'

export const subjectRoute: Route = {
    path: 'subject',
    component: SubjectComponent,
    data: {
        authorities: [],
        pageTitle: 'home.title'
    }
};
