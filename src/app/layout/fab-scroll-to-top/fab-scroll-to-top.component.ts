import { CdkScrollable, CdkVirtualScrollViewport, ScrollDispatcher } from '@angular/cdk/scrolling';
import { AfterViewInit, Component, Input, NgZone, OnDestroy } from '@angular/core';
import { MatSidenavContent } from '@angular/material/sidenav';
import { StoreService } from '@app/services/store.service';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';


@Component({
    selector: 'fab-scroll-to-top',
    templateUrl: './fab-scroll-to-top.component.html',
    styleUrls: ['./fab-scroll-to-top.component.scss'],
})
export class FabScrollToTopComponent implements OnDestroy {

    private destroy = new Subject<void>();

    @Input("viewport") viewport!: CdkVirtualScrollViewport;




    constructor(


    ) {

    }

    onScrollToTop(): void {

        this.viewport.getElementRef().nativeElement
            .scroll({
                top: 0,
                left: 0,
                behavior: "smooth"
            });

    }

    ngOnDestroy(): void {
        this.destroy.next();
    }



}
