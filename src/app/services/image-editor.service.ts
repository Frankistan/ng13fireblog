import { Injectable } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import {
    base64ToFile,
    ImageTransform,
    ImageCroppedEvent,
    Dimensions,
    ImageCropperComponent
} from 'ngx-image-cropper';

@Injectable({
    providedIn: 'root'
})
export class ImageEditorService {


    cropper!: any;
    fileName!: any;

    imageChangedEvent: any = '';
    croppedImage: any = '';
    canvasRotation = 0;
    rotation = 0;
    scale = 1;
    showCropper = false;
    containWithinAspectRatio = false;
    transform: ImageTransform = {};
    croppedImageFile: File;
    format: any = "jpg";


    constructor() { }


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
