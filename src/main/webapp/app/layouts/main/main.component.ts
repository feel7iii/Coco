import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';

import { JhiLanguageHelper, MissionService } from '../../shared';

@Component({
    selector: 'jhi-main',
    template: `
    <div class="IndexPage">
        <jhi-notice></jhi-notice>
        <div class="container" (scroll)="onScroll()">
            <jhi-tags></jhi-tags>
            <div class="IndexPage-results sideNavOffset">
                <jhi-sort></jhi-sort>
                <router-outlet></router-outlet>
            </div>
        </div>
    </div>
    `
})
export class JhiMainComponent implements OnInit {

    scrollScreen: string = 'scrolled';

    constructor(
        private jhiLanguageHelper: JhiLanguageHelper,
        private router: Router,
        private missionService: MissionService
    ) {
        missionService.missionConfirmed$.subscribe();
    }

    private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
        let title: string = (routeSnapshot.data && routeSnapshot.data['pageTitle']) ? routeSnapshot.data['pageTitle'] : 'cocoApp';
        if (routeSnapshot.firstChild) {
            title = this.getPageTitle(routeSnapshot.firstChild) || title;
        }
        return title;
    }

    ngOnInit() {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.jhiLanguageHelper.updateTitle(this.getPageTitle(this.router.routerState.snapshot.root));
            }
        });
    }

    onScroll() {
        alert(1122222222);
        let scrolled = this.scrollScreen;
        this.missionService.announceMission(scrolled);
    }
}
