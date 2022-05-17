import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';

/* SOURCE: 
https://viblo.asia/p/image-validation-on-angular-24-V3m5WOzb5O7
https://dzone.com/articles/how-to-create-custom-validators-in-angular
*/

export class ImageValidator {
    static imageSizeValidator(maxSize: number) {
        return function (input: FormControl) {
            if (input.value) {
                return input.value.size > maxSize ? { maxSize: true } : null;
            }
            return null;
        };
    }

    static imageExtensionValidator(whiteListImageExtension: Array<string>) {
        return function (input: FormControl) {
            if (input.value) {


                const type = input.value.type || input.value[0].type;
                return whiteListImageExtension.includes(type) ? null : { extension: true };
            }
            return null;
        };
    }


    static extensionValidator(whiteListImageExtension: Array<string>): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            if (control.value) {

                const type = control.value._files[0].type;
                return whiteListImageExtension.includes(type) ? null : { extension: true };
            }
            return null;
        };
    }


    static imageDimensionValidator(imageMinHeight: number, imageMinWidth: number) {
        return function (input: FormControl): any {
            // return new Promise(resolve => {
            if (input.value[0]) {
                const fr = new FileReader;
                fr.onload = function () {
                    const image: any = new Image;
                    image.onload = function () {
                        if (image.width < imageMinWidth || image.height < imageMinHeight) {
                            return { dimension: true };
                        }
                        return null;
                    };
                    image.src = fr.result;
                };
                fr.readAsDataURL(input.value[0]);
            } else {
                return null;
            }
            // });
        };
    }
}
