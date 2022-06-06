import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FileUploadService } from '@app/services/file-upload.service';
import { NotificationService } from '@app/services/notification.service';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

/*
https://stackblitz.com/edit/github-g8zkqy
https://medium.com/@coolchoudharyvijay/use-webcam-in-angular-simplified-c1ee012e875f
https://stackblitz.com/edit/ngx-webcam-demo
https://edupala.com/how-capture-image-using-angular-camera/
https://www.npmjs.com/package/ngx-webcam
https://github.com/basst314/ngx-webcam
*/

@Component({
    selector: 'camera',
    templateUrl: './camera.component.html',
    styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit {

    loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    @Output()
    pictureTaken = new EventEmitter<WebcamImage>();
    // toggle webcam on/off
    showWebcam = true;
    allowCameraSwitch = true;
    multipleWebcamsAvailable = false;
    isCameraExist = false;
    deviceId: string;
    videoOptions: MediaTrackConstraints = {
        // width: {ideal: 1024},
        // height: {ideal: 576}
    };
    errors: WebcamInitError[] = [];
    // webcam snapshot trigger
    private trigger: Subject<void> = new Subject<void>();

    // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
    private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();
    private errors$: Subject<WebcamInitError[]> = new Subject<WebcamInitError[]>();

    constructor(private _ntf: NotificationService, public fus: FileUploadService) { }

    ngOnInit(): void {
        WebcamUtil.getAvailableVideoInputs()
            .then((mediaDevices: MediaDeviceInfo[]) => {
                this.isCameraExist = mediaDevices && mediaDevices.length > 0;
                this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
            });
    }

    back() { }


    reset() {
        this.pictureTaken.emit(null);
        this.onOffWebCame();
    }

    takeSnapshot(): void {
        this.trigger.next();
    }

    onOffWebCame() {
        this.showWebcam = !this.showWebcam;
    }

    handleInitError(error: WebcamInitError): void {
        this.errors.push(error);

        if (error.mediaStreamError && error.mediaStreamError.name === "NotAllowedError") {
            console.warn("Camera access was not allowed by user!");
            error.message = 'toast.upload.camera_access_denied';
            this.errors$.next(this.errors);
        }
    }

    showNextWebcam(directionOrDeviceId: boolean | string) {
        this.nextWebcam.next(directionOrDeviceId);
    }

    handleImage(webcamImage: WebcamImage) {
        this.pictureTaken.emit(webcamImage);
        this.fus.file$.next(webcamImage.imageAsDataUrl);
        console.log("PHOTO: ", webcamImage.imageAsDataUrl);
        this.showWebcam = false;
    }

    cameraWasSwitched(deviceId: string): void {
        console.log('active device: ' + deviceId);
        this.deviceId = deviceId;
    }

    get triggerObservable(): Observable<void> {
        return this.trigger.asObservable();
    }

    get nextWebcamObservable(): Observable<boolean | string> {
        return this.nextWebcam.asObservable();
    }


    ngAfterViewInit(): void {
        this.errors$.subscribe(errors => {
            this._ntf.open(errors[0].message, 'toast.close', 2000);
        });
    }

}
