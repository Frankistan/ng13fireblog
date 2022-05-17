import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { PaginatorService } from '@app/services/paginator.service';
import { Observable } from 'rxjs';
import { IPost } from '@app/models/post';

/*
https://stackblitz.com/edit/angular-cdk-demo-virtual-scroll?file=app%2Fvirtual-scroll%2Fvirtual-scroll.component.ts
*/

@Component({
    selector: 'app-post-virtual-list',
    templateUrl: './post-virtual-list.component.html',
    styleUrls: ['./post-virtual-list.component.scss']
})
export class PostVirtualListComponent implements OnInit {

    // DUMMY DATA
    items = Array.from({ length: 100 }).map((value, i) => {
        return {
            img: "https://www.smashbros.com/wiiu-3ds/sp/images/character/toon_link/main.png",
            title: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of `,
            id: `${i + 1}`,
            content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of `,
            author: "Frantxu"
        }
    });


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

        this.page.data.subscribe(data => console.log("posts: ", data)
        )

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
