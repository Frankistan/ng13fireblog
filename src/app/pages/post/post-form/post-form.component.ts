import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, FormGroupName } from '@angular/forms';
import { MatChipInputEvent, MatChipList } from '@angular/material/chips';
import { IPost } from '@app/models/post';
import { I18nService } from '@app/services/i18n.service';
import { PostService } from '@app/services/post.service';
import { ENTER, COMMA } from "@angular/cdk/keycodes";

/*
https://www.angularfix.com/2022/01/angular-2-material-mat-chip-list.html
https://stackblitz.com/edit/angular-4d5vfj-gywxjz?file=app%2Fchip-list-validation-example.ts
https://www.lindseybroos.be/2020/06/angular-material-chiplist-with-autocomplete-and-validation/
*/

export interface Subject {
    name: string;
}

@Component({
    selector: 'app-post-form',
    templateUrl: './post-form.component.html',
    styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {

    form!: FormGroup;
    private _post!: IPost;

    options: any = {
        'language': this.i18n.language.slice(0, 2)
    };

    //chips
    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;

    @ViewChild('chipList', { static: true }) chipList!: MatChipList;

    constructor(
        public postService: PostService,
        public i18n: I18nService,
    ) { }

    ngOnInit(): void {
        this.createForm();
        this.form.get('names')?.statusChanges.subscribe(
            status => this.chipList.errorState = status === 'INVALID'
        );
    }

    private createForm() {
        this.form = this.postService.form;
        this.form.controls['featured_image'].setValue("");
        this._post = this.form.value;
    }

    get names(): FormArray {
        return <FormArray>this.form.get('names');
    }

    add(event: MatChipInputEvent, form: FormGroup): void {
        const input = event.input;
        const value = event.value;

        // Add name
        if ((value || '').trim()) {

            this.names.push(new FormControl(value.trim()));
            console.log(this.names);
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }
    }

    remove(form: any, index: any) {
        console.log(form);
        form.get('names').removeAt(index);
    }

    save() { }
}
