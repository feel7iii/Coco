"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var NavbarComponent = (function () {
    function NavbarComponent(loginService, languageHelper, languageService, principal, loginModalService, profileService, router, eventManager, elementRef, renderer) {
        this.loginService = loginService;
        this.languageHelper = languageHelper;
        this.languageService = languageService;
        this.principal = principal;
        this.loginModalService = loginModalService;
        this.profileService = profileService;
        this.router = router;
        this.eventManager = eventManager;
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.isNavbarCollapsed = true;
        this.languageService.addLocation('home');
    }
    NavbarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.languageHelper.getAll().then(function (languages) {
            _this.languages = languages;
        });
        this.profileService.getProfileInfo().subscribe(function (profileInfo) {
            _this.inProduction = profileInfo.inProduction;
            _this.swaggerEnabled = profileInfo.swaggerEnabled;
        });
        this.principal.identity().then(function (account) {
            _this.account = account;
        });
        this.registerAuthenticationSuccess();
    };
    NavbarComponent.prototype.registerAuthenticationSuccess = function () {
        var _this = this;
        this.eventManager.subscribe('authenticationSuccess', function (message) {
            _this.principal.identity().then(function (account) {
                _this.account = account;
            });
        });
    };
    NavbarComponent.prototype.changeLanguage = function (languageKey) {
        this.languageService.changeLanguage(languageKey);
    };
    NavbarComponent.prototype.collapseNavbar = function () {
        this.isNavbarCollapsed = true;
    };
    NavbarComponent.prototype.isAuthenticated = function () {
        return this.principal.isAuthenticated();
    };
    NavbarComponent.prototype.login = function () {
        this.modalRef = this.loginModalService.open();
    };
    NavbarComponent.prototype.logout = function () {
        this.collapseNavbar();
        this.loginService.logout();
        this.router.navigate(['']);
    };
    NavbarComponent.prototype.searchFocused = function () {
        this.renderer.setAttribute(this.search.nativeElement, "class", "Search open focused");
    };
    NavbarComponent.prototype.searchBlur = function () {
        this.renderer.setAttribute(this.search.nativeElement, "class", "Search");
    };
    NavbarComponent.prototype.showInfo = function () {
        this.renderer.setAttribute(this.info.nativeElement, "class", "ButtonGroup Dropdown NotificationsDropdown itemCount open");
    };
    NavbarComponent.prototype.hiddenInfo = function () {
        this.renderer.setAttribute(this.info.nativeElement, "class", "ButtonGroup Dropdown NotificationsDropdown itemCount");
    };
    return NavbarComponent;
}());
__decorate([
    core_1.ViewChild('search')
], NavbarComponent.prototype, "search", void 0);
__decorate([
    core_1.ViewChild('info')
], NavbarComponent.prototype, "info", void 0);
NavbarComponent = __decorate([
    core_1.Component({
        selector: 'jhi-navbar',
        templateUrl: './navbar.component.html',
        styles: ["\n        .img-height {\n            height: 27px;\n        }\n    "]
    })
], NavbarComponent);
exports.NavbarComponent = NavbarComponent;
