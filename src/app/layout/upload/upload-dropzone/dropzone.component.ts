import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { FileUploadService } from '@app/services/file-upload.service';
import { ImageCropperComponent, ImageTransform, ImageCroppedEvent, base64ToFile, Dimensions } from 'ngx-image-cropper';

/*
https://www.procodeprogramming.com/blogs/file-drag-and-drop-in-angular-10

*/

@Component({
    selector: 'upload-dropzone',
    templateUrl: './dropzone.component.html',
    styleUrls: ['./dropzone.component.scss']
})
export class DropzoneComponent implements OnInit {

    isHovering: boolean; // State for dropzone CSS toggling

    readonly maxSize = 5242880;  // 5 MB
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
    format: string = "jpg";

    constructor(private fus: FileUploadService) { }

    ngOnInit(): void {
    }

    toggleHover(event: boolean) {
        this.isHovering = event;
    }

    droppedEvent(event: any) {
        console.log("FILENAME SELECTED by DROPPING: ", event[0]);
    }

    async startUpload(event: any) {
        const url = await this.fus.upload(event[0].name, event[0]);
        console.log("UPLOADED FILE URL:", url);
    }


    /************ image cropper fns *************/
    fileChangeEvent(event: any): void {
        this.fileName = event.target.files[0].name;
        this.imageChangedEvent = event;
        this.croppedImage = null;

        console.log("FILENAME SELECTED by BUTTON: ", event.target.files[0]);

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
    }

    imageLoaded() {
        this.showCropper = true;
        console.log('Image loaded');
    }

    cropperReady(sourceImageDimensions: Dimensions) {
        console.log('Cropper ready', sourceImageDimensions);
    }

    loadImageFailed() {
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
            flipH: !this.transform.flipH
        };
    }

    flipVertical() {
        this.transform = {
            ...this.transform,
            flipV: !this.transform.flipV
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
