import './vendor.ts';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ng2-webstorage';

import { CocoSharedModule, UserRouteAccessService } from './shared';
import { CocoAdminModule } from './admin/admin.module';
import { CocoAccountModule } from './account/account.module';
import { CocoLayoutModule } from './layouts/layout.module';
import { CocoEntityModule } from './entities/entity.module';

import { AppRoutingModule } from './app.route';
import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

import { JhiLayoutComponent } from './app.component';

import { NoticeComponent } from './layouts'

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        CocoSharedModule,
        CocoAdminModule,
        CocoAccountModule,
        CocoLayoutModule,
        CocoEntityModule
    ],
    declarations: [
        JhiLayoutComponent,
        NoticeComponent
    ],
    providers: [
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [ JhiLayoutComponent ]
})
export class CocoAppModule {}
