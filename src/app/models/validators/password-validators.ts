import {FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";

const charsAllowed = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
const uppersLowersNumbers = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/;

export function matchPasswords(): ValidatorFn {
  return (group: FormGroup): ValidationErrors => {
    const newPassword = group.controls['newPassword'];
    const confirmPassword = group.controls['confirmPassword'];
    if (newPassword.value !== confirmPassword.value) {
      confirmPassword.setErrors({passwordsDontMatch: true});
    } else {
      confirmPassword.setErrors(null);
    }
    return;
  };
}

export function passwordComplexityCheck(): ValidatorFn {
  return (group: FormGroup): ValidationErrors => {
    const newPassword = group.controls['newPassword'];
    if (!charsAllowed.test(newPassword.value) || !uppersLowersNumbers.test(newPassword.value)) {
      newPassword.setErrors({missingOneRequirement: true});
    } else if (newPassword.value.length <= 7) {
      newPassword.setErrors({tooShortPassword: true});
    } else {
      newPassword.setErrors(null);
    }
    return;
  }
}
