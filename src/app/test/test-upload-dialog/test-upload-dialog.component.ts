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


@Component({
    selector: 'app-test-upload-dialog',
    templateUrl: './test-upload-dialog.component.html',
    styleUrls: ['./test-upload-dialog.component.scss']
})
export class TestUploadDialogComponent implements OnInit {


    form!: FormGroup;
    file!: FileInput;
    url: string = "";

    private destroy = new Subject<void>();
    // State for dropzone CSS toggling
    isHovering: boolean;

    uploadPercent: Observable<{
        progress: number;
        snapshot: UploadTaskSnapshot;
    }>;

    constructor(private fus: FileUploadService) { }

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

    toggleHover(event: boolean) {
        this.isHovering = event;
    }

    async startUpload(event: any) {

        const url = await this.fus.upload(event[0].name, event[0]);
        console.log("URL:", url);

    }

}
