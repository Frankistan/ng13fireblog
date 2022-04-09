import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';

@Component({
    selector: 'app-sidenav-content',
    templateUrl: './sidenav-content.component.html',
    styleUrls: ['./sidenav-content.component.scss']
})
export class SidenavContentComponent implements OnInit {

    constructor(
        private auth: AuthService,
        private _rtr: Router,
    ) { }

    ngOnInit(): void {
    }

    logout() {
        this.auth.logout().then(_ => this._rtr.navigate(['/auth/login']));
    }

}
