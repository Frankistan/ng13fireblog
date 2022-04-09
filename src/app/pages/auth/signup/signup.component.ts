import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { PasswordValidator } from '@app/validators/match-password.validator';
import { CustomValidators } from '@app/validators/custom.validator';
import { NotificationService } from '@app/services/notification.service';
;


@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    hide: boolean = true;

    form!: FormGroup;

    constructor(
        private auth: AuthService,
        private _rtr: Router,
        private _fb: FormBuilder,
        private _ntf: NotificationService,
    ) { }

    ngOnInit(): void {
        this.createForm();
    }

    private createForm() {

        const urlPattern: string = "^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$";
        const emailRegex = "^[_a-z0-9-]+(.[a-z0-9-]+)@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$";

        // this.form = new FormGroup(
        //     {
        //         displayName: new FormControl('', [Validators.required]),
        //         email: new FormControl('', [Validators.required, Validators.email]),
        //         photoURL: new FormControl('', [Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]),
        //         password: new FormControl('123456', [
        //             Validators.required,
        //             Validators.minLength(6)
        //         ]),
        //         password_confirm: new FormControl('123456', [Validators.required])
        //     },

        //     this.passwordMatchValidator
        // );

        this.form = this._fb.group({
            displayName: ['test', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            email: ['fffernandez84@gmail.com', [Validators.required, Validators.pattern(emailRegex)]],
            photoURL: ['', [Validators.pattern(urlPattern)]],
            password: ['123456', Validators.required],
            password_confirm: ['123456', Validators.required]
        }, {
            validator: PasswordValidator.MatchPassword // your custom validation method
        });

    }



    errorHandling = (control: string, error: string) => {
        return this.form.controls[control].hasError(error);
    }

    save() {
        this.auth.signup(this.form.value)
            .then(_ => {
                this._ntf.open("toast.signup");
                this._rtr.navigate(["/posts"]);
            });;
    }

}
