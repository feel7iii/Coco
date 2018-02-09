import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { ScTagsComponent } from './sc-tags.component';
import { ScTagsDetailComponent } from './sc-tags-detail.component';
import { ScTagsPopupComponent } from './sc-tags-dialog.component';
import { ScTagsDeletePopupComponent } from './sc-tags-delete-dialog.component';

import { Principal } from '../../shared';

export const scTagsRoute: Routes = [
  {
    path: 'sc-tags',
    component: ScTagsComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'cocoApp.scTags.home.title'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'sc-tags/:id',
    component: ScTagsDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'cocoApp.scTags.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const scTagsPopupRoute: Routes = [
  {
    path: 'sc-tags-new',
    component: ScTagsPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'cocoApp.scTags.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'sc-tags/:id/edit',
    component: ScTagsPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'cocoApp.scTags.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'sc-tags/:id/delete',
    component: ScTagsDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'cocoApp.scTags.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
