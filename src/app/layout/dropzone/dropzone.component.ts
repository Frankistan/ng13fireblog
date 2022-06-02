import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '@app/services/file-upload.service';

@Component({
    selector: 'app-dropzone',
    templateUrl: './dropzone.component.html',
    styleUrls: ['./dropzone.component.scss']
})
export class DropzoneComponent implements OnInit {

    isHovering: boolean; // State for dropzone CSS toggling

    constructor(private fus: FileUploadService) { }

    ngOnInit(): void {
    }


    toggleHover(event: boolean) {
        this.isHovering = event;
    }

    async startUpload(event: any) {
        const url = await this.fus.upload(event[0].name, event[0]);
        console.log("URL:", url);
    }
}
