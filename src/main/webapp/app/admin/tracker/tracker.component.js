"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var JhiTrackerComponent = (function () {
    function JhiTrackerComponent(jhiLanguageService, trackerService) {
        this.jhiLanguageService = jhiLanguageService;
        this.trackerService = trackerService;
        this.activities = [];
        this.jhiLanguageService.setLocations(['tracker']);
    }
    JhiTrackerComponent.prototype.showActivity = function (activity) {
        var existingActivity = false;
        for (var index = 0; index < this.activities.length; index++) {
            if (this.activities[index].sessionId === activity.sessionId) {
                existingActivity = true;
                if (activity.page === 'logout') {
                    this.activities.splice(index, 1);
                }
                else {
                    this.activities[index] = activity;
                }
            }
        }
        if (!existingActivity && (activity.page !== 'logout')) {
            this.activities.push(activity);
        }
    };
    JhiTrackerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.trackerService.subscribe();
        this.trackerService.receive().subscribe(function (activity) {
            _this.showActivity(activity);
        });
    };
    JhiTrackerComponent.prototype.ngOnDestroy = function () {
        this.trackerService.unsubscribe();
    };
    return JhiTrackerComponent;
}());
JhiTrackerComponent = __decorate([
    core_1.Component({
        selector: 'jhi-tracker',
        templateUrl: './tracker.component.html'
    })
], JhiTrackerComponent);
exports.JhiTrackerComponent = JhiTrackerComponent;
