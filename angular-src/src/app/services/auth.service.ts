import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: Http) {
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //return this.http.post('http://localhost:3000/users/register', user, { headers: headers })
    return this.http.post('users/register', user, { headers: headers })
      .map(res => res.json());
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //return this.http.post('http://localhost:3000/users/authenticate', user, { headers: headers })
    return this.http.post('users/authenticate', user, { headers: headers })
      .map(res => res.json());
  }

  getProfile() {
    this.loadToken();
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authToken);
    //return this.http.get('http://localhost:3000/users/profile', { headers: headers })
    return this.http.get('users/profile', { headers: headers })
      .map(res => res.json());
  }

  loadToken() {
    this.authToken = localStorage.getItem('id_token');
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  removeUserData() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
