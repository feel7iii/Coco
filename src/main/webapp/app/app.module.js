"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./vendor.ts");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var ng2_webstorage_1 = require("ng2-webstorage");
var shared_1 = require("./shared");
var home_module_1 = require("./home/home.module");
var admin_module_1 = require("./admin/admin.module");
var account_module_1 = require("./account/account.module");
var entity_module_1 = require("./entities/entity.module");
var layouts_1 = require("./layouts");
var http_provider_1 = require("./blocks/interceptor/http.provider");
var uib_pagination_config_1 = require("./blocks/config/uib-pagination.config");
var layouts_2 = require("./layouts");
var CocoAppModule = (function () {
    function CocoAppModule() {
    }
    return CocoAppModule;
}());
CocoAppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            layouts_1.LayoutRoutingModule,
            ng2_webstorage_1.Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-' }),
            shared_1.CocoSharedModule,
            home_module_1.CocoHomeModule,
            admin_module_1.CocoAdminModule,
            account_module_1.CocoAccountModule,
            entity_module_1.CocoEntityModule
        ],
        declarations: [
            layouts_2.JhiMainComponent,
            layouts_2.NavbarComponent,
            layouts_2.NoticeComponent,
            layouts_2.TagsComponent,
            layouts_2.SortComponent,
            layouts_2.ErrorComponent,
            layouts_2.PageRibbonComponent,
            layouts_2.ActiveMenuDirective,
            layouts_2.FooterComponent
        ],
        providers: [
            layouts_2.ProfileService,
            http_provider_1.customHttpProvider(),
            uib_pagination_config_1.PaginationConfig,
            shared_1.UserRouteAccessService
        ],
        bootstrap: [layouts_2.JhiMainComponent]
    })
], CocoAppModule);
exports.CocoAppModule = CocoAppModule;
