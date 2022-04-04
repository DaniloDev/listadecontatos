import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }


  static phoneValidator = (control: FormControl): any => {
    if (control.value) {
      if (control.value.replace(/\D/g, "").match(/^[0-9]{10,11}$/)) {
        return null;
      } else {
        return { invalidPhone: true };
      }
    } else {
      return null;
    }
  }
}
