import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {Users} from '../interfaces/users';

@Injectable()
export class UsersService {
  private loggedIn: Observable<firebase.User>;
  private loggedInUser;
  public uid: string;
  public currentUser: Observable<Users>;
  private test;
  public userDoc: Observable<any>;

  constructor(public auth: AuthService, public db: AngularFirestore) {
    this.loggedIn = this.auth.user;
    this.loggedIn.subscribe(data => {
    this.loggedInUser = data.toJSON();
    this.uid = data.uid;
    this.userDoc = this.db.collection('users').doc(this.uid).valueChanges();
    });
  }

  // getInfo () {
  //   this.loggedIn.subscribe(data => {
  //     this.userDoc = this.db.collection('users').doc(data.uid)
  //       .valueChanges().subscribe(info => {
  //        console.log(info);
  //sdsd
  //       });
  //     console.log(this.userDoc);
  //   });
  // }
  testing () {
    this.loggedIn.subscribe(info => {
      return firebase.firestore().collection('users').doc(info.uid);
    });

  }
  // setInfo() {
  //   this.getInfo().subscribe(data => {
  //     this.test = datsda;
  //   });
    // this.currentUser.first = this.test.first;
  // }

}
