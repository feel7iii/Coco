import { Route } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ConfigureComponent } from './configure.component';

export const configureRoute: Route = {
  path: 'configure',
  component: ConfigureComponent,
  data: {
    authorities: ['ROLE_USER'],
    pageTitle: 'global.menu.account.configure'
  },
  canActivate: [UserRouteAccessService]
};
