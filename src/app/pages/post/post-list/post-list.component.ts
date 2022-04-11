import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { PaginatorService } from '@app/services/paginator.service';
import { Observable } from 'rxjs';
import { IPost } from '@app/models/post';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

    @ViewChild(CdkVirtualScrollViewport, { static: false })
    viewport!: CdkVirtualScrollViewport;

    theEnd: boolean = false;
    data$!: Observable<IPost[]>;

    constructor(
        private page: PaginatorService
    ) { }

    ngOnInit(): void {

        this.page.init();
        this.data$ = this.page.data;

    }

    nextBatch() {
        if (this.theEnd) {
            return;
        }

        const end = this.viewport.getRenderedRange().end;
        const total = this.viewport.getDataLength();

        // console.log(`${end}, '>=', ${total}`);

        if (end === total && end != 0) {
            this.page.more();

        }
    }

    trackByIdx(i: any) {
        return i;
    }
}
