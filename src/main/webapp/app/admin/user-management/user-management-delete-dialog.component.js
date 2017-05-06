"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var UserMgmtDeleteDialogComponent = (function () {
    function UserMgmtDeleteDialogComponent(jhiLanguageService, userService, activeModal, eventManager) {
        this.jhiLanguageService = jhiLanguageService;
        this.userService = userService;
        this.activeModal = activeModal;
        this.eventManager = eventManager;
        this.jhiLanguageService.setLocations(['user-management']);
    }
    UserMgmtDeleteDialogComponent.prototype.clear = function () {
        this.activeModal.dismiss('cancel');
    };
    UserMgmtDeleteDialogComponent.prototype.confirmDelete = function (login) {
        var _this = this;
        this.userService.delete(login).subscribe(function (response) {
            _this.eventManager.broadcast({ name: 'userListModification',
                content: 'Deleted a user' });
            _this.activeModal.dismiss(true);
        });
    };
    return UserMgmtDeleteDialogComponent;
}());
UserMgmtDeleteDialogComponent = __decorate([
    core_1.Component({
        selector: 'jhi-user-mgmt-delete-dialog',
        templateUrl: './user-management-delete-dialog.component.html'
    })
], UserMgmtDeleteDialogComponent);
exports.UserMgmtDeleteDialogComponent = UserMgmtDeleteDialogComponent;
var UserDeleteDialogComponent = (function () {
    function UserDeleteDialogComponent(route, userModalService) {
        this.route = route;
        this.userModalService = userModalService;
    }
    UserDeleteDialogComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.routeSub = this.route.params.subscribe(function (params) {
            _this.modalRef = _this.userModalService.open(UserMgmtDeleteDialogComponent, params['login']);
        });
    };
    UserDeleteDialogComponent.prototype.ngOnDestroy = function () {
        this.routeSub.unsubscribe();
    };
    return UserDeleteDialogComponent;
}());
UserDeleteDialogComponent = __decorate([
    core_1.Component({
        selector: 'jhi-user-delete-dialog',
        template: ''
    })
], UserDeleteDialogComponent);
exports.UserDeleteDialogComponent = UserDeleteDialogComponent;
