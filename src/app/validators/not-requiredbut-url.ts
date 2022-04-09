import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export function NotRequiredbutURL(): ValidatorFn {


    return (control: AbstractControl): ValidationErrors | null => {
        let password = control.get('password')?.value; // to get value in input tag
        let passwordConfirm = control.get('password_confirm')?.value; // to get value in input tag
        let hola = password != passwordConfirm ? { MatchPassword: false } : null;

        return hola;
    };
}