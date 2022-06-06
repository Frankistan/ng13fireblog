import { Component, OnInit } from '@angular/core';

/*

********* IMPORTANTE como luego lo agrega al formulario original para añadir la URL de la imagen  al post
https://laratutorials.com/angular-12-image-file-upload-example/
https://www.positronx.io/angular-show-image-preview-with-reactive-forms-tutorial/

*/

@Component({
    selector: 'upload-selector',
    templateUrl: './upload-selector.component.html',
    styleUrls: ['./upload-selector.component.scss']
})
export class UploadSelectorComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

}
