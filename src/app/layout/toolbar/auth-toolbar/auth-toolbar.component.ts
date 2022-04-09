import { Component, Input, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
    selector: 'app-auth-toolbar',
    templateUrl: './auth-toolbar.component.html',
    styleUrls: ['./auth-toolbar.component.scss']
})
export class AuthToolbarComponent implements OnInit {
    @Input('drawer') public drawer!: MatDrawer;

    constructor() { }

    ngOnInit(): void {
    }

}
