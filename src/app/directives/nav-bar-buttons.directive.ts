import { Directive, OnInit, ViewContainerRef } from '@angular/core';
import { BtnLanguageSelectorComponent } from '@app/layout/btn-language-selector/btn-language-selector.component';

// FUENTE:
// https://youtu.be/BFsSijog7kY

// ver este: https://youtu.be/m3-SAO91ODc

@Directive({
    selector: '[loadToolbarButtons]'
})
export class NavBarButtonsDirective implements OnInit {

    constructor(
        public vcr: ViewContainerRef,
    ) { }

    private generateComponent(): void {

        this.vcr.clear();

        const compRef = this.vcr.createComponent<any>(BtnLanguageSelectorComponent);
    }

    ngOnInit(): void {
        this.generateComponent();
    }

}
