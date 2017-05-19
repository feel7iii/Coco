import { Route } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { HelpComponent } from './help.component';

export const helpRoute: Route = {
  path: 'help',
  component: HelpComponent,
  data: {
    authorities: ['ROLE_USER'],
    pageTitle: 'global.menu.account.configure'
  },
  canActivate: [UserRouteAccessService]
};
