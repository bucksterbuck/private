import { Injectable } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

  public auth: Observable<firebase.User>;


  constructor(private afAuth: AngularFireAuth,
              ) {
    this.auth = afAuth.authState;
  }
  login (email, password) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(function (user) {
        console.log('Logged in!');
        // this.setAuthState(user);

      })
      .catch(function (err) {
        // console.log(err)
      });
  }
  logout () {
    this.afAuth.auth.signOut().then((out) => {
      console.log('Signed Out');
    })
      .catch((err) => {
      console.log(err);
      });
  }

  isLoggedIn(): Observable<boolean> {
    return this.auth.map(auth => auth && auth.uid !== undefined);
  }

  getUserInfo() {
    return this.afAuth.auth.currentUser;
  }


}
