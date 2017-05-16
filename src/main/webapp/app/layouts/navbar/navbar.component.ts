import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { Subscription } from 'rxjs/Subscription';

import { ProfileService } from '../profiles/profile.service';
import { JhiLanguageHelper, Principal, LoginModalService, LoginService, MissionService } from '../../shared';

@Component({
    selector: 'jhi-navbar',
    templateUrl: './navbar.component.html',
    styles: [`
        .img-height {
            height: 27px;
        }
    `]
})
export class NavbarComponent implements OnInit {
    stickyFlag = true;
    hasPane = 'hasPane';
    showPane: boolean;
    paneShowingx = 'hasPane paneShowing';
    stickyPanex = 'hasPane paneShowing panePinned';
    subscription: Subscription;
    @ViewChild('search') search: ElementRef;
    @ViewChild('info') info: ElementRef;

    account: Account;
    inProduction: boolean;
    isNavbarCollapsed: boolean;
    languages: any[];
    swaggerEnabled: boolean;
    modalRef: NgbModalRef;
    version: string;

    constructor(
        private loginService: LoginService,
        private languageHelper: JhiLanguageHelper,
        private languageService: JhiLanguageService,
        private principal: Principal,
        private loginModalService: LoginModalService,
        private profileService: ProfileService,
        private router: Router,
        private eventManager: EventManager,
        private renderer: Renderer2,
        private missionService: MissionService
    ) {
        this.isNavbarCollapsed = true;
        this.languageService.addLocation('home');
        this.subscription = missionService.missionAnnounced$.subscribe(
            (showPane) => showPane ? this.showPane = true : this.showPane = false
        );
        missionService.missionConfirmed$.subscribe();
    }

    ngOnInit() {
        this.languageHelper.getAll().then((languages) => {
            this.languages = languages;
        });

        this.profileService.getProfileInfo().subscribe((profileInfo) => {
            this.inProduction = profileInfo.inProduction;
            this.swaggerEnabled = profileInfo.swaggerEnabled;
        });

        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });
    }

    changeLanguage(languageKey: string) {
      this.languageService.changeLanguage(languageKey);
    }

    collapseNavbar() {
        this.isNavbarCollapsed = true;
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    logout() {
        this.collapseNavbar();
        this.loginService.logout();
        this.router.navigate(['']);
    }

    register() {
        this.router.navigate(['/account/register']);
    }

    searchFocused() {
        this.renderer.setAttribute(this.search.nativeElement, 'class', 'Search open focused');
    }

    searchBlur() {
        this.renderer.setAttribute(this.search.nativeElement, 'class', 'Search');
    }

    showInfo() {
        this.renderer.setAttribute(this.info.nativeElement, 'class', 'ButtonGroup Dropdown NotificationsDropdown itemCount open');
    }

    hiddenInfo() {
        this.renderer.setAttribute(this.info.nativeElement, 'class', 'ButtonGroup Dropdown NotificationsDropdown itemCount');
    }

    paneShowing() {
        const appStyle = this.paneShowingx;
        const stickyFlag = this.stickyFlag;
        if (stickyFlag) {
            this.missionService.announceMission(appStyle);
        }
    }

    stickyPane() {
        const appStyle = this.stickyPanex;
        const hasPane = this.hasPane;
        const stickyFlag = this.stickyFlag;
        if (stickyFlag) {
            this.missionService.announceMission(appStyle);
            this.stickyFlag = false;
        } else {
            this.missionService.announceMission(hasPane);
            this.stickyFlag = true;
        }
    }

    hiddenPane() {
        const stickyFlag = this.stickyFlag;
        const hasPane = this.hasPane;
        if (stickyFlag) {
            this.missionService.announceMission(hasPane);
        }
    }
}
