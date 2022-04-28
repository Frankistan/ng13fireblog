import { Injectable } from '@angular/core';
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
    addDoc,
    orderBy,
    limit,
} from '@angular/fire/firestore';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IPost } from '@app/models/post';
import { map, Observable } from 'rxjs';

/*
https://youtu.be/cUNmtRNc-8s
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
        tags: ['tag1', 'tag2']
    }

    constructor(
        private db: Firestore,
        private _fb: FormBuilder,
    ) { }

    get form(): FormGroup {

        const regex = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

        /* 
        ejemplo con DATOS de inicio

        return this._fb.group({
            id: [""],
            title: ["", [Validators.required]],
            content: ["", Validators.required],
            featured_image: ["", Validators.pattern(regex)],

            names: this._fb.array(this.data.names, this.validateArrayNotEmpty)
        });
        */
        return new FormGroup({
            id: new FormControl(""),
            title: new FormControl("", [Validators.required]),
            content: new FormControl("", Validators.required),
            featured_image: new FormControl("", Validators.pattern(regex)),
            tags: new FormArray([])
        });

    }

    validateArrayNotEmpty(c: AbstractControl) {
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
                collection(this.db, 'posts') as CollectionReference<IPost>,
                // where('published', '==', true)
                orderBy("created_at", "desc"),
                limit(10)
            )).pipe(
                map(changes => {
                    return changes.map(a => {

                        let data = { ...a.doc.data() as IPost, id: a.doc.id };

                        return data ? data : null;
                    });
                }),
                // TODO: ERROR HANDLING
                // catchError(this.errorHandler)
            )
    }

    async create(data: IPost) {
        // const id = doc(collection(this.db, 'posts')).id;

        // let ref = doc(this.db, 'posts', id) as DocumentReference<IPost>;



        try {
            await addDoc(collection(this.db, 'posts'), data);
        } catch (error) {
            // TODO: ERROR HANDLING
        }
    }


    read(id: string): Observable<IPost | null> {

        let ref = doc(this.db, 'posts', id) as DocumentReference<IPost>;

        return docSnapshots<IPost>(ref).pipe(map(changes => {

            let data = { ...changes.data() as IPost, id: changes.id };

            return data ? data : null;

        }));
    }



    // update(id: string): Observable<IPost | null> {

    // }

    // delete(id: string): Observable<IPost | null> {

    // }

    /* PROMISES VERSION
    addData(value: any) {
        const ref = collection(this.db, 'users');
        addDoc(ref, value)
            .then(() => {
                alert('Data Sent')
            })
            .catch((err) => {
                alert(err.message)
            })
    }

    getData() {
        const ref = collection(this.db, 'posts');
        getDocs(ref)
            .then((response) => {
                let data = [...response.docs.map((item) => {
                    return { ...item.data(), id: item.id }
                })]
            })
    }

    updateData(id: string) {
        const ref = doc(this.db, 'posts', id);
        updateDoc(ref, {
            name: 'Nishant',
            email: 'Nishant123@gmail.com'
        })
            .then(() => {
                alert('Data updated');
                this.getData()
            })
            .catch((err) => {
                alert(err.message)
            })
    }

    deleteData(id: string) {
        const ref = doc(this.db, 'posts', id);
        deleteDoc(ref)
            .then(() => {
                alert('Data Deleted');
                this.getData()
            })
            .catch((err) => {
                alert(err.message)
            })
    }
    */
}
