import { Directive, forwardRef, provide, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
    selector: '[validateURL][ngModel]',
    providers: [{
            provide: NG_VALIDATORS,
            //useExisting: forwardRef(() => URLValidator ),
            useExisting: URLValidator,
            //useValue: URLValidator,
            //useFactory
            multi: true
        }]

})
export class URLValidator implements Validator {
    validateUrl(){
        console.warn("running VE");
    }

    constructor(
        // @Attribute('validateEqual') public validateEqual: string,
        // @Attribute('reverse') public reverse: string
        //@Attribute('validateURL') public validateURL: boolean
    ) {
        console.warn("constructing validate")
        //this.validateURL = false;
    }

    validate(c: AbstractControl):{[key: string]: any } {
        console.warn('validating ' + c.value);
        console.warn(c);
        console.warn(this);

        if(c.pristine){
            c.setErrors({validURL: false})
            // this.validateURL = true;

            return {validURL: false};
        }

        else if(c.value == "") {
            c.setErrors({validURL: false})
            // this.validateURL = false;
            return {validURL: false};
        }

        //c.setErrors({validURL: true});
        //if(!Object.keys(c.errors).length) {
            //delete c.errors['validURL'];
            // this.validateURL = true;
            c.setErrors({});
        //return {validURL: true};
            return {};
        //}

    }
}