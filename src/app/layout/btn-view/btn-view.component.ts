import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-btn-view',
    templateUrl: './btn-view.component.html',
    styleUrls: ['./btn-view.component.scss']
})
export class BtnViewComponent implements OnInit {

    mode$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    mode: boolean = true;

    constructor() { }

    ngOnInit() {


    }

    changeView() {
        this.mode$.next(this.mode ? false : true);
    }
}
