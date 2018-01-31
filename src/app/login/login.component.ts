import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import {AuthService} from '../services/auth.service';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';

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
  constructor(public auth: AuthService, public router: Router ) {
  }

  ngOnInit() {

  }


  login(email: HTMLInputElement, password: HTMLInputElement) {
    console.log(email.value);
    console.log(password.value);

    firebase.auth().signInWithEmailAndPassword(email.value, password.value).then(succ => {
      this.router.navigate(['members']); // Navigate to Members Area
    })
      .catch(err => { console.log(err); }); // Login

  }
  logout() {
    this.auth.logout();

  }

  clickMe() {
    // console.log(this.lsdsdoggedIn$);
    console.log(this.user$);
  }
}
