"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AuthService = (function () {
    function AuthService(principal, stateStorageService, loginModalService, router) {
        this.principal = principal;
        this.stateStorageService = stateStorageService;
        this.loginModalService = loginModalService;
        this.router = router;
    }
    AuthService.prototype.authorize = function (force) {
        var authReturn = this.principal.identity(force).then(authThen.bind(this));
        return authReturn;
        function authThen() {
            var _this = this;
            var isAuthenticated = this.principal.isAuthenticated();
            var toStateInfo = this.stateStorageService.getDestinationState().destination;
            // an authenticated user can't access to login and register pages
            if (isAuthenticated && (toStateInfo.name === 'register' || toStateInfo.name === 'social-auth')) {
                this.router.navigate(['']);
                return false;
            }
            // recover and clear previousState after external login redirect (e.g. oauth2)
            var fromStateInfo = this.stateStorageService.getDestinationState().from;
            var previousState = this.stateStorageService.getPreviousState();
            if (isAuthenticated && !fromStateInfo.name && previousState) {
                this.stateStorageService.resetPreviousState();
                this.router.navigate([previousState.name], { queryParams: previousState.params });
                return false;
            }
            if (toStateInfo.data.authorities && toStateInfo.data.authorities.length > 0) {
                return this.principal.hasAnyAuthority(toStateInfo.data.authorities).then(function (hasAnyAuthority) {
                    if (!hasAnyAuthority) {
                        if (isAuthenticated) {
                            // user is signed in but not authorized for desired state
                            _this.router.navigate(['accessdenied']);
                        }
                        else {
                            // user is not authenticated. Show the state they wanted before you
                            // send them to the login service, so you can return them when you're done
                            var toStateParamsInfo = _this.stateStorageService.getDestinationState().params;
                            _this.stateStorageService.storePreviousState(toStateInfo.name, toStateParamsInfo);
                            // now, send them to the signin state so they can log in
                            _this.router.navigate(['accessdenied']).then(function () {
                                _this.loginModalService.open();
                            });
                        }
                    }
                    return hasAnyAuthority;
                });
            }
            return true;
        }
    };
    return AuthService;
}());
AuthService = __decorate([
    core_1.Injectable()
], AuthService);
exports.AuthService = AuthService;
