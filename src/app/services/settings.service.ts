import { Injectable } from '@angular/core';
import { Auth, updateCurrentUser } from '@angular/fire/auth';
import { addDoc, doc, Firestore } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { IUser } from '@app/models/user';
import { updateDoc } from 'firebase/firestore';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {

    constructor(
        private afs: Firestore,
        private auth: Auth,
    ) { }

    get form(): FormGroup {

        return new FormGroup({
            darkTheme: new FormControl(false),
            language: new FormControl('es-ES')
        });

    }

    async save(user: any) {

        let docRef = doc(this.afs, `users/${user.uid}`) // create this document newDoc at this path
        await updateDoc(docRef, user);


        // let u = {
        //     ... this.auth.currentUser, ...this.form.value
        // }
        // debugger

        // updateCurrentUser(this.auth, user)

        // const _ = await updateDoc<IUser>(`users/${user.uid}`).set(user, { merge: true });
        // return user.settings;

    }
}
