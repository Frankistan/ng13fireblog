import { Component, Input, OnInit } from '@angular/core';
import { IPost } from '@app/models/post';

@Component({
    selector: 'app-post-virtual-element',
    templateUrl: './post-virtual-element.component.html',
    styleUrls: ['./post-virtual-element.component.scss']
})
export class PostVirtualElementComponent implements OnInit {
    @Input() item!: IPost;

    constructor() { }

    ngOnInit(): void {
    }

}
