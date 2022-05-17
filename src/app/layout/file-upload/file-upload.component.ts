import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ImageValidator } from '@app/validators/image.validator';
import { Observable, Subject, takeUntil } from 'rxjs';
import {
    Storage,
    ref,
    deleteObject,
    uploadBytes,
    uploadString,
    uploadBytesResumable,
    percentage,
    getDownloadURL,
    UploadTaskSnapshot,
} from '@angular/fire/storage';
import { FileInput } from 'ngx-material-file-input';

/*
https://dev.to/jdgamble555/angular-12-with-firebase-9-49a0
https://merlosy.github.io/ngx-material-file-input/
https://github.com/merlosy/ngx-material-file-input
https://www.npmjs.com/package/angular-material-fileupload
https://stackblitz.com/edit/demo-ngx-mat-file-input
*/

@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
    form!: FormGroup;
    file!: FileInput;
    url: string = "";

    private destroy = new Subject<void>();

    uploadPercent: Observable<{
        progress: number;
        snapshot: UploadTaskSnapshot;
    }>;

    constructor(private storage: Storage) { }

    ngOnInit(): void {
        this.form = new FormGroup({
            image: new FormControl("", ImageValidator.extensionValidator(['image/jpg', 'image/jpeg', 'image/png']))

        });

        this.form.get('image').valueChanges
            .pipe(takeUntil(this.destroy))
            .subscribe((file: any) => {
                this.file = file;
            });
    }

    async startUpload() {

        const url = await this.upload("uploads", this.file.files[0].name, this.file.files[0]);
        console.log("URL:", url);

    }

    async upload(folder: string, name: string, file: File | null): Promise<string> {

        const ext = file!.name.split('.').pop();
        const path = `${folder}/${name}.${ext}`;
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
