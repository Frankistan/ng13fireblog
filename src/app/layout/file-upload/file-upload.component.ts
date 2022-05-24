import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ImageValidator } from '@app/validators/image.validator';
import { FileInput } from 'ngx-material-file-input';
import { Observable, Subject, takeUntil } from 'rxjs';
import {
    Storage,
    ref,
    uploadBytesResumable,
    percentage,
    getDownloadURL,
    UploadTaskSnapshot,
} from '@angular/fire/storage';
import { FileUploadService } from '@app/services/file-upload.service';


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
export class FileUploadComponent implements OnInit, OnDestroy {
    form!: FormGroup;
    file!: FileInput;
    url: string = "";

    private destroy = new Subject<void>();

    constructor(public fus: FileUploadService) { }

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

        const url = await this.fus.upload(this.file.files[0].name, this.file.files[0]);
        console.log("URL:", url);

    }

    ngOnDestroy(): void {
        this.destroy.next();
    }

}
