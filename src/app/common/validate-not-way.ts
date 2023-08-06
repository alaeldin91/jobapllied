import { FormControl, ValidationErrors } from "@angular/forms"

export class ValidateNotWay {

    static notOnlyWhiteSpace(control: FormControl): ValidationErrors {
        if ((control.value != null) && ((control.value.trim().length === 0))) {
            return { 'not Only white Space': true }
        }
        return {}

    }
}
