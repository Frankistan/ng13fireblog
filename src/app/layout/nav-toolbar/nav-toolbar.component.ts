import { Component, Input, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
    selector: 'app-nav-toolbar',
    templateUrl: './nav-toolbar.component.html',
    styleUrls: ['./nav-toolbar.component.scss']
})
export class NavToolbarComponent implements OnInit {
    @Input('drawer') public drawer!: MatDrawer;

    constructor() { }

    ngOnInit(): void {
    }

}


