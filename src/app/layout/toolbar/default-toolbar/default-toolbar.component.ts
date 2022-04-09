import { Component, Input, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { StoreService } from '@app/services/store.service';

@Component({
    selector: 'app-default-toolbar',
    templateUrl: './default-toolbar.component.html',
    styleUrls: ['./default-toolbar.component.scss']
})
export class DefaultToolbarComponent implements OnInit {
    @Input('drawer') public drawer!: MatDrawer;

    constructor(
        private storeService: StoreService
    ) { }

    ngOnInit(): void {
        this.drawer
    }

}
