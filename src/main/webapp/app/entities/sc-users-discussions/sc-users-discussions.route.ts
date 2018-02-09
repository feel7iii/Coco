import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { ScUsersDiscussionsComponent } from './sc-users-discussions.component';
import { ScUsersDiscussionsDetailComponent } from './sc-users-discussions-detail.component';
import { ScUsersDiscussionsPopupComponent } from './sc-users-discussions-dialog.component';
import { ScUsersDiscussionsDeletePopupComponent } from './sc-users-discussions-delete-dialog.component';

import { Principal } from '../../shared';

export const scUsersDiscussionsRoute: Routes = [
  {
    path: 'sc-users-discussions',
    component: ScUsersDiscussionsComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'cocoApp.scUsersDiscussions.home.title'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'sc-users-discussions/:id',
    component: ScUsersDiscussionsDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'cocoApp.scUsersDiscussions.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const scUsersDiscussionsPopupRoute: Routes = [
  {
    path: 'sc-users-discussions-new',
    component: ScUsersDiscussionsPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'cocoApp.scUsersDiscussions.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'sc-users-discussions/:id/edit',
    component: ScUsersDiscussionsPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'cocoApp.scUsersDiscussions.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'sc-users-discussions/:id/delete',
    component: ScUsersDiscussionsDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'cocoApp.scUsersDiscussions.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
