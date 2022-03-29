import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Subject, Observable, map, shareReplay } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'Angular 13 Material Scaffolding';

    @ViewChild('drawer', { static: true }) public drawer!: MatDrawer;

    private destroy = new Subject<void>();

    isMobile$: Observable<boolean> = this._bpo.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches),
            shareReplay()
        );


    constructor(private _bpo: BreakpointObserver) { }

    ngOnDestroy(): void {
        console.log("paso por aki");

        this.destroy.next();
    }
}
