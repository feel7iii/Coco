import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { JhiLanguageHelper, MissionService } from './shared';

import * as $ from 'jquery';

@Component({
    selector: 'jhi-index',
    template: `
    <div id='app' #app class='App App--index affix'>
        <router-outlet name='navbar'></router-outlet>
        <main class='App-content'>
            <div id='content'>
                <router-outlet></router-outlet>
            </div>
        </main>
        <router-outlet name='popup'></router-outlet>
    </div>
    `
})
export class JhiLayoutComponent implements OnInit, OnDestroy {
    appStyle: string;
    subscription: Subscription;

    @ViewChild('app') app: ElementRef;

    constructor(
        private jhiLanguageHelper: JhiLanguageHelper,
        private router: Router,
        private renderer2: Renderer2,
        private missionService: MissionService
    ) {
        this.subscription = missionService.missionAnnounced$.subscribe(
            (changeAppStyle) => {
                this.appStyle = changeAppStyle;
                this.renderer2.setAttribute(this.app.nativeElement, 'class', 'App affix ' + this.appStyle + ' App--discussion' );
            }
        );

        window.addEventListener('scroll', function () {
            $('#app').addClass('scrolled');
        });

        $(window).bind('scroll', function(){
            if ($(document).scrollTop() == 0) {
                $('#app').removeClass('scrolled');
            }
        });
    }


    ngOnInit() {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.jhiLanguageHelper.updateTitle(this.getPageTitle(this.router.routerState.snapshot.root));
            }
        });
    }

    private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
        let title: string = (routeSnapshot.data && routeSnapshot.data['pageTitle']) ? routeSnapshot.data['pageTitle'] : 'cocoApp';
        if (routeSnapshot.firstChild) {
            title = this.getPageTitle(routeSnapshot.firstChild) || title;
        }
        return title;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
