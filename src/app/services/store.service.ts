import { Injectable } from '@angular/core';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject } from 'rxjs';


/*
https://stackoverflow.com/questions/48073057/open-close-sidenav-from-another-component#:~:text=had%20the%20same%20problem%20using.%20I%20resolved
*/

@Injectable({
    providedIn: 'root'
})
export class StoreService {
    private sidenav!: MatSidenav;


    public setSidenav(sidenav: MatSidenav) {
        this.sidenav = sidenav;
    }

    public open() {
        return this.sidenav.open();
    }


    public close() {
        return this.sidenav.close();
    }

    public toggle(): void {
        this.sidenav.toggle();
    }


}
