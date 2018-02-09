import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { ScMessagingsComponent } from './sc-messagings.component';
import { ScMessagingsDetailComponent } from './sc-messagings-detail.component';
import { ScMessagingsPopupComponent } from './sc-messagings-dialog.component';
import { ScMessagingsDeletePopupComponent } from './sc-messagings-delete-dialog.component';

import { Principal } from '../../shared';

export const scMessagingsRoute: Routes = [
  {
    path: 'sc-messagings',
    component: ScMessagingsComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'cocoApp.scMessagings.home.title'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'sc-messagings/:id',
    component: ScMessagingsDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'cocoApp.scMessagings.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const scMessagingsPopupRoute: Routes = [
  {
    path: 'sc-messagings-new',
    component: ScMessagingsPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'cocoApp.scMessagings.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'sc-messagings/:id/edit',
    component: ScMessagingsPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'cocoApp.scMessagings.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'sc-messagings/:id/delete',
    component: ScMessagingsDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'cocoApp.scMessagings.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
