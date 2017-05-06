"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var tracker_service_1 = require("./../shared/tracker/tracker.service");
var shared_1 = require("../shared");
var _1 = require("./");
var CocoAdminModule = (function () {
    function CocoAdminModule() {
    }
    return CocoAdminModule;
}());
CocoAdminModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_1.CocoSharedModule,
            router_1.RouterModule.forRoot(_1.adminState, { useHash: true })
        ],
        declarations: [
            _1.AuditsComponent,
            _1.UserMgmtComponent,
            _1.UserDialogComponent,
            _1.UserDeleteDialogComponent,
            _1.UserMgmtDetailComponent,
            _1.UserMgmtDialogComponent,
            _1.UserMgmtDeleteDialogComponent,
            _1.LogsComponent,
            _1.JhiConfigurationComponent,
            _1.JhiHealthCheckComponent,
            _1.JhiHealthModalComponent,
            _1.JhiDocsComponent,
            _1.JhiTrackerComponent,
            _1.JhiMetricsMonitoringComponent,
            _1.JhiMetricsMonitoringModalComponent
        ],
        entryComponents: [
            _1.UserMgmtDialogComponent,
            _1.UserMgmtDeleteDialogComponent,
            _1.JhiHealthModalComponent,
            _1.JhiMetricsMonitoringModalComponent,
        ],
        providers: [
            _1.AuditsService,
            _1.JhiConfigurationService,
            _1.JhiHealthService,
            _1.JhiMetricsService,
            _1.LogsService,
            tracker_service_1.JhiTrackerService,
            _1.UserResolvePagingParams,
            _1.UserResolve,
            _1.UserModalService
        ],
        schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA]
    })
], CocoAdminModule);
exports.CocoAdminModule = CocoAdminModule;
