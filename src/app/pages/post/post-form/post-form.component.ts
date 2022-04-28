import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormGroupName } from '@angular/forms';
import { MatChipInputEvent, MatChipList } from '@angular/material/chips';
import { IPost } from '@app/models/post';
import { I18nService } from '@app/services/i18n.service';
import { PostService } from '@app/services/post.service';
import { ENTER, COMMA } from "@angular/cdk/keycodes";
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

/*
https://www.angularfix.com/2022/01/angular-2-material-mat-chip-list.html
https://stackblitz.com/edit/angular-4d5vfj-gywxjz?file=app%2Fchip-list-validation-example.ts
https://www.lindseybroos.be/2020/06/angular-material-chiplist-with-autocomplete-and-validation/
*/

@Component({
    selector: 'app-post-form',
    templateUrl: './post-form.component.html',
    styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit, OnDestroy {

    @ViewChild('chipList', { static: true }) chipList!: MatChipList;

    private destroy = new Subject<void>();
    private _post!: IPost;

    form!: FormGroup;
    isAddMode: boolean = false;
    id: string;

    options: any = {
        'language': this.i18n.language.slice(0, 2)
    };

    // CHIPS
    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;



    constructor(
        public postService: PostService,
        public i18n: I18nService,
        private _route: ActivatedRoute,
        private _fb: FormBuilder,
    ) { }

    ngOnInit(): void {
        this.createForm();

        this.id = this._route.snapshot.params['id'];
        this.isAddMode = !this.id;

        if (!this.isAddMode) {
            this.postService.read(this.id)
                .pipe(takeUntil(this.destroy))
                .subscribe(post => {
                    this.form.patchValue(post);
                    // this.form.controls['featured_image'].setValue("");
                    this.form.setControl('tags', this._fb.array(post.tags || []));
                });
        }

        this.form.get('tags')?.statusChanges
            .pipe(takeUntil(this.destroy))
            .subscribe(
                status => this.chipList.errorState = status === 'INVALID'
            );
    }

    private createForm() {
        this.form = this.postService.form;
    }

    get tags(): FormArray {
        return <FormArray>this.form.get('tags');
    }

    add(event: MatChipInputEvent): void {
        const input = event.chipInput?.inputElement;

        const value = event.value;

        // Add tag
        if ((value || '').trim()) {

            this.tags.push(new FormControl(value.trim()));
            console.log(this.tags);
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }
    }

    remove(index: any) {

        this.tags.removeAt(index);
    }


    save() {

        if (!this.isAddMode) {
            this.postService.update(this.id, this.form.value);
        } else {
            this.postService.create(this.form.value);
        }
    }

    ngOnDestroy(): void {
        this.destroy.next();
    }
}
