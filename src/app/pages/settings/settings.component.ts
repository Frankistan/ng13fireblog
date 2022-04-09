import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { AuthService } from '@app/services/auth.service';
import { I18nService } from '@app/services/i18n.service';
import { SettingsService } from '@app/services/settings.service';
import { Subject, tap } from 'rxjs';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

    private _destroy = new Subject<void>();
    ischecked!: boolean;

    form!: FormGroup;
    user$: any;
    user: any;

    constructor(
        private _i18n: I18nService,
        private _settingsService: SettingsService,
        private _auth: AuthService,
    ) { }

    ngOnInit(): void {
        this.createForm();

        this.user$ = this._auth.loggedInUser$.pipe(tap(user => this.user = user))
    }

    createForm() {
        this.form = this._settingsService.form;
    }

    onChange(value: MatSlideToggleChange) {
        this.ischecked = value.checked;
    }

    save() {
        const NUser = {
            ...this.user,
            settings: this.form.value
        };

        this._settingsService.save(NUser);
    }

    get language(): string {
        return this._i18n.language;
    }

    get languages(): any {
        return this._i18n.supportedLanguages;
    }

    ngOnDestroy(): void {
        this._destroy.next();
    }

}
