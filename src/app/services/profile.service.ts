import { Injectable } from '@angular/core';
import { doc } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    constructor() { }

    // async bookmarks() {
    //     const ref = doc(this.db, 'posts', id);

    //     try {
    //         await updateDoc(ref, { bookmarks: });
    //         this._ntf.open("toast.post.updated", "toast.close");
    //     } catch (error) {
    //         this.errorHandler(error);
    //     }
    // }
}
