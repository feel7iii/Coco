import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { ScGroupsComponent } from './sc-groups.component';
import { ScGroupsDetailComponent } from './sc-groups-detail.component';
import { ScGroupsPopupComponent } from './sc-groups-dialog.component';
import { ScGroupsDeletePopupComponent } from './sc-groups-delete-dialog.component';

import { Principal } from '../../shared';

export const scGroupsRoute: Routes = [
  {
    path: 'sc-groups',
    component: ScGroupsComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'cocoApp.scGroups.home.title'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'sc-groups/:id',
    component: ScGroupsDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'cocoApp.scGroups.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const scGroupsPopupRoute: Routes = [
  {
    path: 'sc-groups-new',
    component: ScGroupsPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'cocoApp.scGroups.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'sc-groups/:id/edit',
    component: ScGroupsPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'cocoApp.scGroups.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'sc-groups/:id/delete',
    component: ScGroupsDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'cocoApp.scGroups.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
