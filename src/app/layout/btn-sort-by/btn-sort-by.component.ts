import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-btn-sort-by',
    templateUrl: './btn-sort-by.component.html',
    styleUrls: ['./btn-sort-by.component.scss']
})
export class BtnSortByComponent {
    reverse: boolean = true;
    field: string = "created_at";

    constructor(

    ) { }

    orderBy(field: string) {
        this.field = field;
        this.reverse = !this.reverse;

    }

}
