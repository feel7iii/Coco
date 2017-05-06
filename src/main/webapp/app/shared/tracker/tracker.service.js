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
var Rx_1 = require("rxjs/Rx");
var SockJS = require("sockjs-client");
var Stomp = require("webstomp-client");
var JhiTrackerService = (function () {
    function JhiTrackerService(router, authServerProvider, $window, csrfService) {
        this.router = router;
        this.authServerProvider = authServerProvider;
        this.$window = $window;
        this.csrfService = csrfService;
        this.stompClient = null;
        this.subscriber = null;
        this.alreadyConnectedOnce = false;
        this.connection = this.createConnection();
        this.listener = this.createListener();
    }
    JhiTrackerService.prototype.connect = function () {
        var _this = this;
        if (this.connectedPromise === null) {
            this.connection = this.createConnection();
        }
        // building absolute path so that websocket doesn't fail when deploying with a context path
        var loc = this.$window.nativeWindow.location;
        var url;
        url = '//' + loc.host + loc.pathname + 'websocket/tracker';
        var authToken = this.authServerProvider.getToken();
        if (authToken) {
            url += '?access_token=' + authToken;
        }
        var socket = new SockJS(url);
        this.stompClient = Stomp.over(socket);
        var headers = {};
        this.stompClient.connect(headers, function () {
            _this.connectedPromise('success');
            _this.connectedPromise = null;
            _this.sendActivity();
            if (!_this.alreadyConnectedOnce) {
                _this.subscription = _this.router.events.subscribe(function (event) {
                    if (event instanceof router_1.NavigationEnd) {
                        _this.sendActivity();
                    }
                });
                _this.alreadyConnectedOnce = true;
            }
        });
    };
    JhiTrackerService.prototype.disconnect = function () {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
            this.stompClient = null;
        }
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
        this.alreadyConnectedOnce = false;
    };
    JhiTrackerService.prototype.receive = function () {
        return this.listener;
    };
    JhiTrackerService.prototype.sendActivity = function () {
        if (this.stompClient !== null && this.stompClient.connected) {
            this.stompClient.send('/topic/activity', // destination
            JSON.stringify({ 'page': this.router.routerState.snapshot.url }), // body
            {} // header
            );
        }
    };
    JhiTrackerService.prototype.subscribe = function () {
        var _this = this;
        this.connection.then(function () {
            _this.subscriber = _this.stompClient.subscribe('/topic/tracker', function (data) {
                _this.listenerObserver.next(JSON.parse(data.body));
            });
        });
    };
    JhiTrackerService.prototype.unsubscribe = function () {
        if (this.subscriber !== null) {
            this.subscriber.unsubscribe();
        }
        this.listener = this.createListener();
    };
    JhiTrackerService.prototype.createListener = function () {
        var _this = this;
        return new Rx_1.Observable(function (observer) {
            _this.listenerObserver = observer;
        });
    };
    JhiTrackerService.prototype.createConnection = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return _this.connectedPromise = resolve; });
    };
    return JhiTrackerService;
}());
JhiTrackerService = __decorate([
    core_1.Injectable()
], JhiTrackerService);
exports.JhiTrackerService = JhiTrackerService;
