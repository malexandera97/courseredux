import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

// Requisito 8: Validador personalizado usando directiva
@Directive({
  selector: '[minLength]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: MinLengthValidatorDirective,
    multi: true
  }]
})
export class MinLengthValidatorDirective implements Validator {
  @Input('minLength') minLength: number = 3;

  validate(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    if (control.value.length < this.minLength) {
      return {
        'minLength': {
          requiredLength: this.minLength,
          actualLength: control.value.length
        }
      };
    }

    return null;
  }
}
