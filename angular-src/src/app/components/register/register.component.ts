import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../../services/validation.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;

  constructor(private validationService: ValidationService, 
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router) {
  }

  ngOnInit() {
  }

  OnRegisterSubmit() {
    let user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password,
      confirmPassword: this.confirmPassword,
    };

    if (!this.validationService.validateUser(user)) {
      console.log('user validation failed');
      this.flashMessage.show('user validation failed!', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    if (!this.validationService.validateEmail(user.email)) {
      console.log('email validation failed');
      this.flashMessage.show('email validation failed!', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    if (!this.validationService.validateConfirmPassword(user.password, user.confirmPassword)) {
      console.log('password validation failed');
      this.flashMessage.show('password validation failed!', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    this.authService.registerUser(user).subscribe(data => {
      if(data.success) {
        this.flashMessage.show('You are now registered and can log in!', { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show('Something went wrong, try again!', { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/register']);
      }
    })
  }
}
