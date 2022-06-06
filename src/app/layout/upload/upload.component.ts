import { Component, OnInit } from '@angular/core';
import { slideInRight } from '@app/animations/animations';
import { FileUploadService } from '@app/services/file-upload.service';

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {

    constructor(public fus: FileUploadService) { }

    ngOnInit(): void {
    }

}
