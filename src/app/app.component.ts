import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer, MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { Subject, Observable, map, shareReplay, takeUntil } from 'rxjs';
import { IUser } from './models/user';
import { AuthService } from './services/auth.service';
import { PostService } from './services/post.service';
import { StoreService } from './services/store.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
    title = 'Angular 13 Material Scaffolding';

    @ViewChild('drawer', { static: true }) public drawer!: MatSidenav;
    // @ViewChild(MatSidenavContent) sidenavContent: MatSidenavContent;

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
        private postService: PostService
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
        // this.storeService.setSidenavContent(this.sidenavContent);
    }

}
