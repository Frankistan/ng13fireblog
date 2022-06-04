import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, Input } from '@angular/core';
import { slideUp } from '@app/animations/slide-up.animation';

@Component({
    selector: 'fab-scroll-to-top',
    templateUrl: './fab-scroll-to-top.component.html',
    styleUrls: ['./fab-scroll-to-top.component.scss'],
    animations: [slideUp]
})
export class FabScrollToTopComponent {

    @Input("viewport") viewport!: CdkVirtualScrollViewport;

    constructor() { }

    onScrollToTop(): void {

        this.viewport.getElementRef().nativeElement
            .scroll({
                top: 0,
                left: 0,
                behavior: "smooth"
            });

    }

}
