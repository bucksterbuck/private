import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Users } from '../interfaces/users';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  usersCollection: AngularFirestoreCollection<Users>;
  users: Observable<Users[]>;
  constructor(private db: AngularFirestore) {

  }
  ngOnInit() {
    this.usersCollection = this.db.collection('users');
    this.users = this.usersCollection.valueChanges();
    console.log(this.users);
  }

}
