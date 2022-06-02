import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '@app/services/file-upload.service';
import { WebcamImage } from 'ngx-webcam';

/*
https://edupala.com/how-capture-image-using-angular-camera/
https://www.npmjs.com/package/ngx-webcam
https://github.com/basst314/ngx-webcam
https://stackblitz.com/edit/ngx-webcam-demo?file=src%2Fapp%2Fapp.component.ts
https://medium.com/@coolchoudharyvijay/use-webcam-in-angular-simplified-c1ee012e875f

https://www.procodeprogramming.com/blogs/file-drag-and-drop-in-angular-10


*/


@Component({
    selector: 'app-test-upload-dialog',
    templateUrl: './test-upload-dialog.component.html',
    styleUrls: ['./test-upload-dialog.component.scss']
})
export class TestUploadDialogComponent implements OnInit {


    webcamImage: WebcamImage | undefined = null;


    constructor(private fus: FileUploadService) { }

    ngOnInit(): void { }



    handleImage(webcamImage: WebcamImage) {
        this.webcamImage = webcamImage;
    }

}
