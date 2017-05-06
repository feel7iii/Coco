"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ng_jhipster_1 = require("ng-jhipster");
var Observable_1 = require("rxjs/Observable");
var auth_service_1 = require("../../shared/auth/auth.service");
var principal_service_1 = require("../../shared/auth/principal.service");
var auth_jwt_service_1 = require("../../shared/auth/auth-jwt.service");
var AuthExpiredInterceptor = (function (_super) {
    __extends(AuthExpiredInterceptor, _super);
    function AuthExpiredInterceptor(injector) {
        var _this = _super.call(this) || this;
        _this.injector = injector;
        return _this;
    }
    AuthExpiredInterceptor.prototype.requestIntercept = function (options) {
        return options;
    };
    AuthExpiredInterceptor.prototype.responseIntercept = function (observable) {
        var _this = this;
        return observable.catch(function (error, source) {
            if (error.status === 401) {
                var principal = _this.injector.get(principal_service_1.Principal);
                if (principal.isAuthenticated()) {
                    var auth = _this.injector.get(auth_service_1.AuthService);
                    auth.authorize(true);
                }
                else {
                    var authServerProvider = _this.injector.get(auth_jwt_service_1.AuthServerProvider);
                    authServerProvider.logout();
                }
            }
            return Observable_1.Observable.throw(error);
        });
    };
    return AuthExpiredInterceptor;
}(ng_jhipster_1.HttpInterceptor));
exports.AuthExpiredInterceptor = AuthExpiredInterceptor;
