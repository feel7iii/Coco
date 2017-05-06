"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var ng2_translate_1 = require("ng2-translate");
var ng_jhipster_1 = require("ng-jhipster");
var window_service_1 = require("./tracker/window.service");
var _1 = require("./");
function alertServiceProvider(sanitizer, translateService) {
    // set below to true to make alerts look like toast
    var isToast = false;
    return new ng_jhipster_1.AlertService(sanitizer, isToast, translateService);
}
exports.alertServiceProvider = alertServiceProvider;
var CocoSharedCommonModule = (function () {
    function CocoSharedCommonModule() {
    }
    return CocoSharedCommonModule;
}());
CocoSharedCommonModule = __decorate([
    core_1.NgModule({
        imports: [
            _1.CocoSharedLibsModule
        ],
        declarations: [
            _1.FindLanguageFromKeyPipe,
            _1.JhiAlertComponent,
            _1.JhiAlertErrorComponent
        ],
        providers: [
            _1.JhiLanguageHelper,
            window_service_1.WindowRef,
            {
                provide: ng_jhipster_1.AlertService,
                useFactory: alertServiceProvider,
                deps: [core_1.Sanitizer, ng2_translate_1.TranslateService]
            },
            platform_browser_1.Title
        ],
        exports: [
            _1.CocoSharedLibsModule,
            _1.FindLanguageFromKeyPipe,
            _1.JhiAlertComponent,
            _1.JhiAlertErrorComponent
        ]
    })
], CocoSharedCommonModule);
exports.CocoSharedCommonModule = CocoSharedCommonModule;
