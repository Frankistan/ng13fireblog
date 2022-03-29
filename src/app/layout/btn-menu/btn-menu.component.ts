import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable, map, shareReplay } from 'rxjs';

@Component({
    selector: 'app-btn-menu',
    templateUrl: './btn-menu.component.html',
    styleUrls: ['./btn-menu.component.scss']
})
export class BtnMenuComponent {

    @Input('drawer') public drawer!: MatDrawer;

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches),
            shareReplay()
        );

    constructor(
        private breakpointObserver: BreakpointObserver
    ) { }

}
