import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { IUser } from '@app/models/user';
import { AuthService } from '@app/services/auth.service';
import { I18nService } from '@app/services/i18n.service';
import { SettingsService } from '@app/services/settings.service';
import { Observable, Subject, tap } from 'rxjs';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

    private _destroy = new Subject<void>();
    ischecked!: boolean;

    form!: FormGroup;
    user$!: Observable<IUser>;
    user!: IUser;


    constructor(
        private _i18n: I18nService,
        private _settingsService: SettingsService,
        private _auth: AuthService,
    ) { }

    ngOnInit(): void {
        this.form = this._settingsService.form;

        this.user$ = this._auth.loggedInUser$.pipe(tap(user => {
            this.form.patchValue(user.settings);
            this.user = user;

            this._i18n.language = this.form.get('language')?.value;
        }));
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
