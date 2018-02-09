import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { ScSettingsComponent } from './sc-settings.component';
import { ScSettingsDetailComponent } from './sc-settings-detail.component';
import { ScSettingsPopupComponent } from './sc-settings-dialog.component';
import { ScSettingsDeletePopupComponent } from './sc-settings-delete-dialog.component';

import { Principal } from '../../shared';

export const scSettingsRoute: Routes = [
  {
    path: 'sc-settings',
    component: ScSettingsComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'cocoApp.scSettings.home.title'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'sc-settings/:id',
    component: ScSettingsDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'cocoApp.scSettings.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const scSettingsPopupRoute: Routes = [
  {
    path: 'sc-settings-new',
    component: ScSettingsPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'cocoApp.scSettings.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'sc-settings/:id/edit',
    component: ScSettingsPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'cocoApp.scSettings.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'sc-settings/:id/delete',
    component: ScSettingsDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'cocoApp.scSettings.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
