import { Component, Input, OnInit } from '@angular/core';
import { PostService } from '@app/services/post.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-post-list-element',
    templateUrl: './post-list-element.component.html',
    styleUrls: ['./post-list-element.component.scss']
})
export class PostListElementComponent implements OnInit {

    @Input() post!: any;
    @Input() index!: any;
    mode$!: Observable<boolean>;

    constructor() { }

    ngOnInit() {

    }

}
