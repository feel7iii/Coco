import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { ScFlagsComponent } from './sc-flags.component';
import { ScFlagsDetailComponent } from './sc-flags-detail.component';
import { ScFlagsPopupComponent } from './sc-flags-dialog.component';
import { ScFlagsDeletePopupComponent } from './sc-flags-delete-dialog.component';

import { Principal } from '../../shared';

export const scFlagsRoute: Routes = [
  {
    path: 'sc-flags',
    component: ScFlagsComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'cocoApp.scFlags.home.title'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'sc-flags/:id',
    component: ScFlagsDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'cocoApp.scFlags.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const scFlagsPopupRoute: Routes = [
  {
    path: 'sc-flags-new',
    component: ScFlagsPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'cocoApp.scFlags.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'sc-flags/:id/edit',
    component: ScFlagsPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'cocoApp.scFlags.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'sc-flags/:id/delete',
    component: ScFlagsDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'cocoApp.scFlags.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
