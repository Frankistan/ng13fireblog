import { Injectable } from '@angular/core';
import {
    collection,
    DocumentData,
    Firestore,
    getDocs,
    limit,
    orderBy,
    query,
    QueryDocumentSnapshot,
    startAfter
} from '@angular/fire/firestore';
import { IPost } from '@app/models/post';
import { BehaviorSubject, Observable, scan } from 'rxjs';

/* fuente:
https://fireship.io/lessons/infinite-virtual-scroll-angular-cdk/
https://stackoverflow.com/questions/50922417/how-to-paginate-or-infinite-scroll-by-number-of-items-in-firestore
*/

@Injectable({
    providedIn: 'root'
})
export class PaginatorService {

    // Source data
    private _done = new BehaviorSubject<boolean>(false);
    private _last: QueryDocumentSnapshot<DocumentData> | null = null;
    private _data = new BehaviorSubject<IPost[]>([]);
    private _loading = new BehaviorSubject<boolean>(false);

    // Observable data
    done: Observable<boolean> = this._done.asObservable();
    loading: Observable<boolean> = this._loading.asObservable();
    data: Observable<IPost[]> = this._data.asObservable().pipe(
        scan((acc, val) => {
            return acc.concat(val);
        }));

    constructor(
        private db: Firestore
    ) { }

    async init() {

        const first = query(collection(this.db, "posts"), orderBy("created_at", "desc"), limit(10));

        const documentSnapshots = await getDocs(first);

        this._last = documentSnapshots.docs[documentSnapshots.docs.length - 1];

        let posts = documentSnapshots.docs.map(items => {
            let data = { ...items.data() as IPost, id: items.id };

            return data;
        });

        this._data.next(posts);

    }

    async more() {

        const next = query(
            collection(this.db, "posts"),
            orderBy("created_at", "desc"),
            startAfter(this._last),
            limit(10));

        let documentSnapshots = await getDocs(next);

        this._last = documentSnapshots.docs[documentSnapshots.docs.length - 1];

        let posts = documentSnapshots.docs.map(items => {
            let data = { ...items.data() as IPost, id: items.id };

            return data;
        });

        this._data.next(posts);

    }

    // Reset the page
    reset() {
        this._data.next([]);
        this._done.next(false);
    }
}
