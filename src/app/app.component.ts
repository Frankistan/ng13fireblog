import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { environment } from '@env/environment';
import { TranslateService } from '@ngx-translate/core';
import { Subject, Observable, map, shareReplay, filter, merge, switchMap, takeUntil } from 'rxjs';
import { I18nService } from './services/i18n.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'Angular 13 Material Scaffolding';

    @ViewChild('drawer', { static: true }) public drawer!: MatDrawer;

    private destroy = new Subject<void>();

    isMobile$: Observable<boolean> = this._bpo.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches),
            shareReplay()
        );


    constructor(
        private _bpo: BreakpointObserver,
        private i18nService: I18nService,
        private translateService: TranslateService,
        private titleService: Title,
        private router: Router,
        private activatedRoute: ActivatedRoute,
    ) { }

    ngOnInit() {

        // Setup translations
        this.i18nService.init(environment.defaultLanguage, environment.supportedLanguages);

        const onNavigationEnd = this.router.events.pipe(filter((event) => event instanceof NavigationEnd));

        // Change page title on navigation or language change, based on route data
        merge(this.translateService.onLangChange, onNavigationEnd)
            .pipe(
                map(() => {
                    let route = this.activatedRoute;
                    while (route.firstChild) {
                        route = route.firstChild;
                    }
                    return route;
                }),
                filter((route) => route.outlet === 'primary'),
                switchMap((route) => route.data),
                takeUntil(this.destroy)
            )
            .subscribe((event) => {
                const title = event['title'];
                if (title) {
                    this.titleService.setTitle(this.translateService.instant(title));
                }
            });
    }

    ngOnDestroy(): void {
        console.log("paso por aki");

        this.destroy.next();
    }
}
