import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '@app/services/file-upload.service';
import { WebcamImage } from 'ngx-webcam';

/*

********* importante como luego lo agrega al formulario original para añadir la URL de la imagen  al post
https://laratutorials.com/angular-12-image-file-upload-example/
https://www.positronx.io/angular-show-image-preview-with-reactive-forms-tutorial/

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
