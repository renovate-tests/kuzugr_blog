import { FormGroup } from '@angular/forms';

export function ValidateForm(form: FormGroup, checkDirty = false, validationMessages = {}) {
  const formErrors = {};
  validateFormGroup(formErrors, form, checkDirty, validationMessages);
  return formErrors;
}

function validateFormGroup(formErrors = {}, form: FormGroup, checkDirty = false, validationMessages = {}) {
  Object.keys(form.controls).forEach((field) => {
    formErrors[field] = null;
    const control = form.get(field);
    let controlIsInvalid = !control.valid;
    const controlValue = control.value;
    const isRequired = (validationMessages[field] || {}).hasOwnProperty('required');
    const isStringControl = typeof controlValue === 'string' || controlValue instanceof String;
    if (isRequired && isStringControl && controlValue.trim() === '') {
      controlIsInvalid = true;
      control.setErrors(Object.assign({required: true}, control.errors));
    }
    if (checkDirty) {
      controlIsInvalid = controlIsInvalid && control.dirty;
    }
    if (controlIsInvalid) {
      const messages = validationMessages[field];
      for (const key of Object.keys(control.errors)) {
        formErrors[field] = formErrors[field] || [];
        formErrors[field].push(messages[key]);
      }
    }
  });
}
