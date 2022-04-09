import { Component, Input, OnInit } from '@angular/core';
import { PostService } from '@app/services/post.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {


    data$!: Observable<any>;

    constructor(public postService: PostService) { }

    ngOnInit(): void {
        this.data$ = this.postService.list()
    }


}
