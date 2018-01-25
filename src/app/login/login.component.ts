import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {AuthService} from '../services/auth.service';
import {isSuccess} from '@angular/http/src/http_utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loggedIn$ = this.auth.auth;
  public authenticated;
  public user = this.af.auth.currentUser.uid;
  public userTest = this.auth.getUserInfo();
  constructor(public auth: AuthService, public af: AngularFireAuth ) {
    this.auth.isLoggedIn()
      .subscribe((success) => this.authenticated = success);
  }

  ngOnInit() {
    console.log(this.auth.isLoggedIn());
    console.log(this.authenticated);
  }


  login(email: HTMLInputElement, password: HTMLInputElement) {
    console.log(email.value);
    console.log(password.value);

    this.auth.login(email.value, password.value);
  }
  logout() {
    this.auth.logout();

  }
}
