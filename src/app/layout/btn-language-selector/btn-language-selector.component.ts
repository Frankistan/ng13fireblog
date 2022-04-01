import { Component, Input, OnInit } from '@angular/core';
import { I18nService } from '@app/services/i18n.service';

@Component({
    selector: 'app-btn-language-selector',
    templateUrl: './btn-language-selector.component.html',
    styleUrls: ['./btn-language-selector.component.scss']
})
export class BtnLanguageSelectorComponent implements OnInit {

    @Input() icon = false;

    constructor(private i18nService: I18nService) { }

    ngOnInit() { }

    setLanguage(language: string) {
        this.i18nService.language = language;
    }

    get currentLanguage(): string {
        return this.i18nService.language;
    }

    get languages(): string[] {
        return this.i18nService.supportedLanguages;
    }
}
