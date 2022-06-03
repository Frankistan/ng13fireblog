import { Injectable } from '@angular/core';
import { MatSidenav, MatSidenavContent } from '@angular/material/sidenav';


/*
https://stackoverflow.com/questions/48073057/open-close-sidenav-from-another-component#:~:text=had%20the%20same%20problem%20using.%20I%20resolved
*/

@Injectable({
    providedIn: 'root'
})
export class StoreService {
    private sidenav!: MatSidenav;
    public sidenavContent!: MatSidenavContent;


    public setSidenav(sidenav: MatSidenav) {
        this.sidenav = sidenav;
    }

    // public setSidenavContent(sidenavContent: MatSidenavContent) {
    //     this.sidenavContent = sidenavContent;
    // }



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
