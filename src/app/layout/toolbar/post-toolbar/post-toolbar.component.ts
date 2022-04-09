import { Component, Input, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
    selector: 'app-post-toolbar',
    templateUrl: './post-toolbar.component.html',
    styleUrls: ['./post-toolbar.component.scss']
})
export class PostToolbarComponent implements OnInit {
    @Input('drawer') public drawer!: MatDrawer;

    constructor() { }

    ngOnInit(): void {
    }

}
