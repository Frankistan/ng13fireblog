import { AfterViewInit, Component, ComponentRef, ElementRef, Input, OnInit, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { NavBarButtonsDirective } from '@app/directives/nav-bar-buttons.directive';
import { AuthService } from '@app/services/auth.service';
import { Observable, tap } from 'rxjs';
import { BtnLanguageSelectorComponent } from '../../btn-language-selector/btn-language-selector.component';

@Component({
    selector: 'app-nav-toolbar',
    templateUrl: './nav-toolbar.component.html',
    styleUrls: ['./nav-toolbar.component.scss']
})
export class NavToolbarComponent implements OnInit {
    @Input('drawer') public drawer!: MatDrawer;
    isAuthenticated$!: Observable<boolean>;

    constructor(
        public auth: AuthService
    ) { }

    ngOnInit(): void {
        this.isAuthenticated$ = this.auth.isAuthenticated$;
    }

}


