import { Route } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { RegisterComponent } from './register.component';

export const registerRoute: Route = {
  path: 'register',
  component: RegisterComponent,
  outlet: 'popup',
  data: {
    authorities: [],
    pageTitle: 'register.title'
  },
  canActivate: [UserRouteAccessService]
};
