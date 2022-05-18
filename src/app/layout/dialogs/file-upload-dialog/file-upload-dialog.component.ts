import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

/*
https://stackblitz.com/edit/mat-dialog-full-width?file=app%2Fapp.module.ts
https://www.freakyjolly.com/angular-material-dialog-example-fullscreen-confirm-paleness/
*/

@Component({
    selector: 'app-file-upload-dialog',
    templateUrl: './file-upload-dialog.component.html',
    styleUrls: ['./file-upload-dialog.component.scss']
})
export class FileUploadDialogComponent {

    message: string = 'Adjust window width to 400px to see the effect.';

    constructor(
        @Inject(MAT_DIALOG_DATA) private data: any,
        private dialogRef: MatDialogRef<FileUploadDialogComponent>
    ) { }

    onClose(): void {
        this.dialogRef.close(true);
    }

}
