import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  OnLoginSubmit() {
    let user = {
      username: this.username,
      password: this.password
    };

    this.authService.authenticateUser(user).subscribe(data => {
      if (data.success) {
        this.authService.storeUserData(data.token, data.user);
        this.flashMessage.show("You are logged in now!", { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['dashboard']);
      } else {
        this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 5000 });
        this.router.navigate(['/login']);
      }
    });
  }
}
