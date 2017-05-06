"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ActivateComponent = (function () {
    function ActivateComponent(jhiLanguageService, activate, loginModalService, route) {
        this.jhiLanguageService = jhiLanguageService;
        this.activate = activate;
        this.loginModalService = loginModalService;
        this.route = route;
        this.jhiLanguageService.setLocations(['activate']);
    }
    ActivateComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.queryParams.subscribe(function (params) {
            _this.activate.get(params['key']).subscribe(function () {
                _this.error = null;
                _this.success = 'OK';
            }, function () {
                _this.success = null;
                _this.error = 'ERROR';
            });
        });
    };
    ActivateComponent.prototype.login = function () {
        this.modalRef = this.loginModalService.open();
    };
    return ActivateComponent;
}());
ActivateComponent = __decorate([
    core_1.Component({
        selector: 'jhi-activate',
        templateUrl: './activate.component.html'
    })
], ActivateComponent);
exports.ActivateComponent = ActivateComponent;
