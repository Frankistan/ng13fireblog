import { Component, OnInit } from '@angular/core';

/*

********* IMPORTANTE como luego lo agrega al formulario original para añadir la URL de la imagen  al post
https://laratutorials.com/angular-12-image-file-upload-example/
https://www.positronx.io/angular-show-image-preview-with-reactive-forms-tutorial/

*/

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

}
