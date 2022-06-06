import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
    Storage,
    ref,
    uploadBytesResumable,
    percentage,
    getDownloadURL,
    UploadTaskSnapshot,
} from '@angular/fire/storage';
import { environment } from '@env/environment';


@Injectable({
    providedIn: 'root'
})
export class FileUploadService {

    file$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    // file: Observable<any> = this.file$.asObservable();

    uploadPercent: Observable<{
        progress: number;
        snapshot: UploadTaskSnapshot;
    }>;

    constructor(private storage: Storage) { }

    async upload(name: string, file: File | null): Promise<string> {

        const ext = file!.name.split('.').pop();
        const path = `${environment.uploadFolder}/${name}.${ext}`;
        let url = "";

        if (file) {
            try {
                const storageRef = ref(this.storage, path);
                const task = uploadBytesResumable(storageRef, file);
                this.uploadPercent = percentage(task);
                await task;
                url = await getDownloadURL(storageRef);
            } catch (error: any) {
                console.error(error);
            }
        } else {
            // handle invalid file
        }
        return url;

    }
}
