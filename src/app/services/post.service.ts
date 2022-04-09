import { Injectable } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import {
    collection,
    doc,
    docData,
    DocumentReference,
    CollectionReference,
    Firestore,
    onSnapshot,
    query,
    where,
    Unsubscribe,
    Query,
    DocumentData,
    collectionData,
    collectionChanges,
    docSnapshots,
    getFirestore,
} from '@angular/fire/firestore';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IPost } from '@app/models/post';
import { environment } from '@env/environment';
import { getApp } from 'firebase/app';
import { map, Observable } from 'rxjs';

/*
https://youtu.be/CC0GuG2uVwQ
https://firebase.google.com/docs/firestore/query-data/listen?hl=es-419
https://www.codegrepper.com/code-examples/javascript/firestore+v9+addDoc+and+setDoc+collection%28%29+doc%28%29

VER CÓMO RECUPERA/OBTIENE LOS TWEETS DEL USUARIO LOGEADO ASI COMO LOS EVENTOS ADD, UPDATE..ETC
https://youtu.be/DKe3oAt2_KE?t=1737
MATERAIL CHIPS 
https://www.positronx.io/angular-material-reactive-forms-validation-tutorial/
*/

export interface Subject {
    name: string;
}

@Injectable({
    providedIn: 'root'
})
export class PostService {
    // data
    data = {
        names: ['name1', 'name2']
    }

    constructor(
        private afs: Firestore,
        private _fb: FormBuilder,
    ) { }

    get form(): FormGroup {

        const regex = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

        const postForm = this._fb.group({
            id: [""],
            title: ["", [Validators.required]],
            content: ["", Validators.required],
            featured_image: ["", Validators.pattern(regex)],

            names: this._fb.array(this.data.names, this.validateArrayNotEmpty)
        });

        return postForm;
    }

    validateArrayNotEmpty(c: AbstractControl
    ) {
        if (c.value && c.value.length === 0) {
            return {
                validateArrayNotEmpty: { valid: false }
            };
        }
        return null;
    }

    list(): Observable<any> {
        return collectionChanges<IPost>(
            query<IPost>(
                collection(this.afs, 'posts') as CollectionReference<IPost>,
                // where('published', '==', true)
            )).pipe(
                map(changes => {
                    return changes.map(a => {
                        const data = a.doc.data() as IPost;
                        data.id = a.doc.id;
                        return data ? data : null;
                    });
                }),
                // TODO: ERROR HANDLING
                // catchError(this.errorHandler)
            )
    }

    create() {
        const id = doc(collection(this.afs, 'id')).id;

        try {
            docSnapshots<IPost>(doc(this.afs, `posts/${id}`));
        } catch (error) {
            // TODO: ERROR HANDLING
        }
    }


    read(id: string): Observable<IPost | null> {

        let ref = doc(this.afs, 'posts', id) as DocumentReference<IPost>

        return docSnapshots<IPost>(ref).pipe(map(changes => {
            const data = changes.data() as IPost;
            console.log("data: ", data);

            return data ? data : null;

        }));
    }

    // update(id: string): Observable<IPost | null> {

    // }

    // delete(id: string): Observable<IPost | null> {

    // }
}
