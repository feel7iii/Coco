import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { ScDiscussionsComponent } from './sc-discussions.component';
import { ScDiscussionsDetailComponent } from './sc-discussions-detail.component';
import { ScDiscussionsPopupComponent } from './sc-discussions-dialog.component';
import { ScDiscussionsDeletePopupComponent } from './sc-discussions-delete-dialog.component';

import { Principal } from '../../shared';

export const scDiscussionsRoute: Routes = [
  {
    path: 'sc-discussions',
    component: ScDiscussionsComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'cocoApp.scDiscussions.home.title'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'sc-discussions/:id',
    component: ScDiscussionsDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'cocoApp.scDiscussions.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const scDiscussionsPopupRoute: Routes = [
  {
    path: 'sc-discussions-new',
    component: ScDiscussionsPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'cocoApp.scDiscussions.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'sc-discussions/:id/edit',
    component: ScDiscussionsPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'cocoApp.scDiscussions.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'sc-discussions/:id/delete',
    component: ScDiscussionsDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'cocoApp.scDiscussions.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
