import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { ScPostsMentionsComponent } from './sc-posts-mentions.component';
import { ScPostsMentionsDetailComponent } from './sc-posts-mentions-detail.component';
import { ScPostsMentionsPopupComponent } from './sc-posts-mentions-dialog.component';
import { ScPostsMentionsDeletePopupComponent } from './sc-posts-mentions-delete-dialog.component';

import { Principal } from '../../shared';

export const scPostsMentionsRoute: Routes = [
  {
    path: 'sc-posts-mentions',
    component: ScPostsMentionsComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'cocoApp.scPostsMentions.home.title'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'sc-posts-mentions/:id',
    component: ScPostsMentionsDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'cocoApp.scPostsMentions.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const scPostsMentionsPopupRoute: Routes = [
  {
    path: 'sc-posts-mentions-new',
    component: ScPostsMentionsPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'cocoApp.scPostsMentions.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'sc-posts-mentions/:id/edit',
    component: ScPostsMentionsPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'cocoApp.scPostsMentions.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'sc-posts-mentions/:id/delete',
    component: ScPostsMentionsDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'cocoApp.scPostsMentions.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
