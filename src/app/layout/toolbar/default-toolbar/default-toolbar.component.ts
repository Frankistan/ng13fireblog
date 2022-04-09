import { Component, Input, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
    selector: 'app-default-toolbar',
    templateUrl: './default-toolbar.component.html',
    styleUrls: ['./default-toolbar.component.scss']
})
export class DefaultToolbarComponent implements OnInit {
    @Input('drawer') public drawer!: MatDrawer;

    constructor() { }

    ngOnInit(): void {
    }

}
