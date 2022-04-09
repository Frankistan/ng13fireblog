import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, FormGroupName } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { IPost } from '@app/models/post';
import { I18nService } from '@app/services/i18n.service';
import { PostService } from '@app/services/post.service';

@Component({
    selector: 'app-post-form',
    templateUrl: './post-form.component.html',
    styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {

    postForm!: FormGroup;
    private _post!: IPost;

    options: any = {
        'language': this.i18n.language.slice(0, 2)
    };

    //chips
    visible: boolean = true;
    selectable: boolean = true;
    removable: boolean = true;
    addOnBlur: boolean = true;

    constructor(
        public postService: PostService,
        public i18n: I18nService,
    ) { }

    ngOnInit(): void {
        this.createForm();
    }

    private createForm() {
        this.postForm = this.postService.form;
        this.postForm.controls['featured_image'].setValue("");
        this._post = this.postForm.value;
    }

    private randomIntFromInterval(min: any, max: any) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    get tags(): FormArray {
        return <FormArray>this.postForm.get('tags');
    }



    addTag(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        // Add our requirement
        if ((value || '').trim()) {
            this.tags.push(new FormControl({ id: this.randomIntFromInterval(1000, 9999), text: value.trim() }));
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }
    }

    removeTag(index: number): void {

        if (index >= 0) {
            this.tags.removeAt(index);
        }
    }


    save() { }
}
