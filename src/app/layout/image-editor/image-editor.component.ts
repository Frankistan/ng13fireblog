import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';

/*  image cropper imports ****/
import {
    base64ToFile,
    ImageTransform,
    ImageCroppedEvent,
    Dimensions,
    ImageCropperComponent,
    OutputFormat,
    LoadedImage
} from 'ngx-image-cropper';
import { BehaviorSubject } from 'rxjs';

/*

STYLE a CSS variable on HMTL
https://stackoverflow.com/questions/63101535/change-css-variables-dynamically-in-angular#:~:text=%3Capp%2Dcomponent%2Dname%20%5Bstyle.%2D%2Dtheme%2Dcolor%2D1%3D%22%27%23CCC%27%22%3E%3C/app%2Dcomponent%2Dname%3E


https://www.positronx.io/angular-image-upload-preview-crop-zoom-and-scale-example/
https://openbase.com/js/ngx-img-cropper
https://www.freakyjolly.com/ngx-image-cropper-tutorial/
https://stackblitz.com/edit/image-cropper
https://stackblitz.com/edit/resizing-cropping-image
https://alyle.io/components/image-cropper
https://codepen.io/enlcxx/pen/vmadQz
https://stackblitz.com/edit/resizing-cropping-image
ver como lo gestiona: https://stackblitz.com/edit/image-cropper-f2ltmr
get form URL http://www.programmersought.com/article/52582038406/

*/

@Component({
    selector: 'app-image-editor',
    templateUrl: './image-editor.component.html',
    styleUrls: ['./image-editor.component.scss']
})
export class ImageEditorComponent implements OnInit {

    loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


    fileName: string = "";

    /***** image cropper vars */
    @ViewChild(ImageCropperComponent, { static: false }) cropper: ImageCropperComponent;

    imageChangedEvent: any = '';
    croppedImage: any = '';
    canvasRotation = 0;
    rotation = 0;
    scale = 1;
    showCropper = false;
    containWithinAspectRatio = false;
    transform: ImageTransform = {};
    croppedImageFile: File;
    format: OutputFormat = "jpeg";

    constructor() { }

    ngOnInit(): void {
    }

    back() {
        console.log("go back");

    }

    /************ image cropper fns *************/
    fileChangeEvent(e: any): void {
        this.loading$.next(true);
        this.fileName = e.target.files[0].name;
        this.imageChangedEvent = e;
        this.croppedImage = null;
    }

    // automatic cropping on mousemove -- 
    // lo desabilito porque puse un boton para recortar
    // hay que añadir (imageCropped)="imageCropped($event)"  al html
    // imageCropped(event: ImageCroppedEvent) {
    // 	this.croppedImage = event.base64;
    // 	console.log(event, base64ToFile(event.base64));
    // }

    // manual cropping on button click
    crop() {
        let e: ImageCroppedEvent = this.cropper.crop();
        this.croppedImage = e.base64;
        this.croppedImageFile = new File([base64ToFile(e.base64)], this.fileName);
        console.log(this.croppedImageFile);

    }

    imageLoaded(image: LoadedImage) {
        this.loading$.next(false);
        this.showCropper = true;
        console.log('Image loaded');
    }


    cropperReady(sourceImageDimensions: Dimensions) {
        console.log('Cropper ready', sourceImageDimensions);
    }

    loadImageFailed() {
        this.loading$.next(false);
        console.log('Load failed');
    }

    rotateLeft() {
        this.canvasRotation--;
        this.flipAfterRotate();
    }

    rotateRight() {
        this.canvasRotation++;
        this.flipAfterRotate();
    }

    private flipAfterRotate() {
        const flippedH = this.transform.flipH;
        const flippedV = this.transform.flipV;
        this.transform = {
            ...this.transform,
            flipH: flippedV,
            flipV: flippedH
        };
    }

    flipHorizontal() {
        this.transform = {
            ...this.transform,
            flipV: !this.transform.flipV
        };
    }

    flipVertical() {
        this.transform = {
            ...this.transform,
            flipH: !this.transform.flipH
        };
    }

    resetImage() {
        this.scale = 1;
        this.rotation = 0;
        this.canvasRotation = 0;
        this.transform = {};
    }

    toggleContainWithinAspectRatio() {
        this.containWithinAspectRatio = !this.containWithinAspectRatio;
    }

    updateRotation() {
        this.transform = {
            ...this.transform,
            rotate: this.rotation
        };
    }

    zoom(event: MatSliderChange) {
        this.scale = event.value;
        this.transform = {
            ...this.transform,
            scale: this.scale
        };
    }
}
