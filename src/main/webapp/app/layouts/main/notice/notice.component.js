"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var NoticeComponent = (function () {
    function NoticeComponent() {
        this.alerts = [];
        this.alerts.push({
            id: 1,
            type: 'info',
            message: '欢迎来到JHipster中文社区。See More, Work Together, Then Success!',
        });
        this.backup = this.alerts.map(function (alert) { return Object.assign({}, alert); });
    }
    NoticeComponent.prototype.closeAlert = function (alert) {
        var index = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    };
    NoticeComponent.prototype.reset = function () {
        this.alerts = this.backup.map(function (alert) { return Object.assign({}, alert); });
    };
    return NoticeComponent;
}());
__decorate([
    core_1.Input()
], NoticeComponent.prototype, "alerts", void 0);
NoticeComponent = __decorate([
    core_1.Component({
        selector: 'jhi-notice',
        templateUrl: './notice.component.html'
    })
], NoticeComponent);
exports.NoticeComponent = NoticeComponent;
