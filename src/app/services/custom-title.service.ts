import { Injectable, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, merge, map, switchMap, takeUntil, Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class CustomTitleService implements OnDestroy {

    private destroy = new Subject<void>();

    constructor(
        private titleService: Title,
        private router: Router,
        private translateService: TranslateService,
        private activatedRoute: ActivatedRoute,
    ) { }

    init() {
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
