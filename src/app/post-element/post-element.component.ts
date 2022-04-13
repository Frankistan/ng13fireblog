import { Component, Input, OnInit } from '@angular/core';
import { IPost } from '@app/models/post';

@Component({
    selector: 'app-post-element',
    templateUrl: './post-element.component.html',
    styleUrls: ['./post-element.component.scss']
})
export class PostElementComponent implements OnInit {
    @Input('post') public post!: IPost;

    constructor() { }

    ngOnInit(): void {
    }

}
