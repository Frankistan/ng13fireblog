import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    items = Array.from({ length: 100 }).map((value, i) => {
        return {
            img: "https://www.smashbros.com/wiiu-3ds/sp/images/character/toon_link/main.png",
            title: `${i} - title`,
            content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of `,
            author: "Frantxu"
        }
    });

    constructor() { }

    ngOnInit(): void {
    }


}
