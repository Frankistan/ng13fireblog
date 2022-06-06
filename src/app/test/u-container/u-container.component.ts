import { Component, OnInit } from '@angular/core';
import { slideInRight } from '@app/animations/animations';
import { FileUploadService } from '@app/services/file-upload.service';

@Component({
    selector: 'app-u-container',
    templateUrl: './u-container.component.html',
    styleUrls: ['./u-container.component.scss'],
    animations: [slideInRight]
})
export class UContainerComponent implements OnInit {

    constructor(public fus: FileUploadService) { }

    ngOnInit(): void {
    }

}
