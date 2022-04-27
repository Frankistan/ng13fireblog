import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { IPost } from '@app/models/post';
import { IUser } from '@app/models/user';
import { AuthService } from '@app/services/auth.service';
import { I18nService } from '@app/services/i18n.service';
import { PostService } from '@app/services/post.service';
import { map, Observable } from 'rxjs';


@Component({
    selector: 'app-post-show',
    templateUrl: './post-show.component.html',
    styleUrls: ['./post-show.component.scss']
})
export class PostShowComponent implements OnInit {
    post$: Observable<IPost>;
    locale: string;
    isBookMarked$: Observable<boolean>;
    user$: Observable<any>;


    constructor(
        private _postService: PostService,
        private _activatedRoute: ActivatedRoute,
        public sanitizer: DomSanitizer,
        private _i18n: I18nService,
        private _auth: AuthService,
    ) { }

    ngOnInit(): void {
        this.locale = this._i18n.language;
        const id = this._activatedRoute.snapshot.params['id'];
        this.post$ = this._postService.read(id);
        this.isBookMarked$ = this._auth.loggedInUser$.pipe(map((user: IUser) => !!user.bookmarks.find(x => x == id)));
    }

}
