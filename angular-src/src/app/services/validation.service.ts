import { Injectable } from '@angular/core';

@Injectable()
export class ValidationService {

  constructor() { }

  validateUser(user) {
    if (user.name == undefined || user.email == undefined || user.username == undefined
      || user.password == undefined || user.cnfirmPassword) {
      return false;
    } else {
      return true;
    }
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
   }

   validateConfirmPassword(password, confirmPassword) {
    if (password == confirmPassword) {
      return true;
    } else {
      return false;
    }
  }
}
