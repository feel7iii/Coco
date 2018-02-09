import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { ScPostsComponent } from './sc-posts.component';
import { ScPostsDetailComponent } from './sc-posts-detail.component';
import { ScPostsPopupComponent } from './sc-posts-dialog.component';
import { ScPostsDeletePopupComponent } from './sc-posts-delete-dialog.component';

import { Principal } from '../../shared';

export const scPostsRoute: Routes = [
  {
    path: 'sc-posts',
    component: ScPostsComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'cocoApp.scPosts.home.title'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'sc-posts/:id',
    component: ScPostsDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'cocoApp.scPosts.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const scPostsPopupRoute: Routes = [
  {
    path: 'sc-posts-new',
    component: ScPostsPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'cocoApp.scPosts.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'sc-posts/:id/edit',
    component: ScPostsPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'cocoApp.scPosts.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'sc-posts/:id/delete',
    component: ScPostsDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'cocoApp.scPosts.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
