import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map, Subject, takeUntil } from 'rxjs';
import { FileUploadDialogComponent } from '../dialogs/file-upload-dialog/file-upload-dialog.component';

@Component({
    selector: 'app-featured-image',
    templateUrl: './featured-image.component.html',
    styleUrls: ['./featured-image.component.scss']
})
export class FeaturedImageComponent implements OnInit, OnDestroy {
    private destroy = new Subject<void>();

    constructor(private dialog: MatDialog) { }

    ngOnInit(): void {
    }

    openDialog() {
        const dialogRef = this.dialog.open(FileUploadDialogComponent, {
            panelClass: ['full-screen-modal']
        });

        dialogRef.afterClosed().pipe(
            map(result => {
                if (!result) return false;
                return result.answer;
            }),
            takeUntil(this.destroy))
            .subscribe(res => { if (res) return; });
    }

    ngOnDestroy(): void {
        this.destroy.next();
    }

}
