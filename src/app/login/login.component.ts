import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import {AuthService} from '../services/auth.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loggedIn$ = this.auth.auth;
  public user$: Observable<firebase.User> = this.auth.user;
  private test = this.auth.user;
  public in: boolean;

  public userTest = this.auth.getUserInfo();
  constructor(public auth: AuthService ) {
  }

  ngOnInit() {

  }


  login(email: HTMLInputElement, password: HTMLInputElement) {
    console.log(email.value);
    console.log(password.value);

    this.auth.login(email.value, password.value);
  }
  logout() {
    this.auth.logout();

  }

  clickMe() {
    // console.log(this.loggedIn$);
    console.log(this.user$);
  }
}
