import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subject, Observable, map, shareReplay, takeUntil } from 'rxjs';
import { AuthService } from './services/auth.service';
import { StoreService } from './services/store.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
    title = 'Angular 13 Material Scaffolding';

    @ViewChild('drawer', { static: true }) public drawer!: MatSidenav;

    private destroy = new Subject<void>();

    user$!: Observable<any>;

    isMobile$: Observable<boolean> = this._bpo.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches),
            shareReplay()
        );

    isAuthenticated$!: Observable<boolean>;

    constructor(
        private _bpo: BreakpointObserver,
        private auth: AuthService,
        private storeService: StoreService,
    ) { }

    ngOnInit() {

        this.user$ = this.auth.loggedInUser$;

        this.isAuthenticated$ = this.auth.isAuthenticated$;

    }

    close() {
        this.isMobile$
            .pipe(takeUntil(this.destroy))
            .subscribe(result => {
                if (result) this.drawer.close();
            });
    }

    ngAfterViewInit(): void {
        this.storeService.setSidenav(this.drawer);
    }

}
