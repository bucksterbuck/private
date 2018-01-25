import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loggedIn$ = this.auth.auth;
  constructor(public auth: AuthService, public af: AngularFireAuth ) {
  }

  ngOnInit() {
    console.log(this.loggedIn$)
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
