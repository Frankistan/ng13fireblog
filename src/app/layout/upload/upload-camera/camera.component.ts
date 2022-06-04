import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

/*
https://medium.com/@coolchoudharyvijay/use-webcam-in-angular-simplified-c1ee012e875f
https://stackblitz.com/edit/ngx-webcam-demo
https://edupala.com/how-capture-image-using-angular-camera/
https://www.npmjs.com/package/ngx-webcam
https://github.com/basst314/ngx-webcam


*/

@Component({
    selector: 'upload-camera',
    templateUrl: './camera.component.html',
    styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit {
    @Output() getPicture = new EventEmitter<WebcamImage>();
    showWebcam = true;
    isCameraExist = true;

    errors: WebcamInitError[] = [];

    // webcam snapshot trigger
    private trigger: Subject<void> = new Subject<void>();
    private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

    constructor() { }


    ngOnInit(): void {
        WebcamUtil.getAvailableVideoInputs()
            .then((mediaDevices: MediaDeviceInfo[]) => {
                this.isCameraExist = mediaDevices && mediaDevices.length > 0;
            });
    }

    takeSnapshot(): void {
        this.trigger.next();
    }

    onOffWebCame() {
        this.showWebcam = !this.showWebcam;
    }

    handleInitError(error: WebcamInitError) {
        this.errors.push(error);
    }

    changeWebCame(directionOrDeviceId: boolean | string) {
        this.nextWebcam.next(directionOrDeviceId);
    }

    handleImage(webcamImage: WebcamImage) {
        this.getPicture.emit(webcamImage);
        this.showWebcam = false;
    }

    get triggerObservable(): Observable<void> {
        return this.trigger.asObservable();
    }

    get nextWebcamObservable(): Observable<boolean | string> {
        return this.nextWebcam.asObservable();
    }

}
