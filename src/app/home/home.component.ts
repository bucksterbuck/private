import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Users } from '../interfaces/users';
import {AuthService} from '../services/auth.service';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  usersCollection: AngularFirestoreCollection<Users>;
  users: Observable<Users[]>;

  private uid = this.afAuth.auth.currentUser;
  private email;
  constructor(private db: AngularFirestore,
              private auth: AuthService,
              private afAuth: AngularFireAuth) {

  }
  ngOnInit() {
    this.usersCollection = this.db.collection('users');
    this.users = this.usersCollection.valueChanges();
    console.log(this.users);
    console.log(this.afAuth.authState.subscribe(function (user) {
      this.uid = user.uid;
      this.email = user.email;
    }));
    console.log(this.uid);
    console.log(this.email);
  }

}
