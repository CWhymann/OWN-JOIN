import { AbstractControl, ValidationErrors } from '@angular/forms';

export function notOnlySpecialCharsValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value?.trim() ?? '';

    if (!value) {
        return null;
    }

    const hasLetterOrDigit = /[\p{L}\p{N}]/u.test(value);

    return hasLetterOrDigit ? null : { onlySpecialChars: true };
}
