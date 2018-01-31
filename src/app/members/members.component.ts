import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {UsersService} from '../services/users.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  public user$: Observable<firebase.User> = this.auth.user;
  private info: any;
  // public profile = firebase.storage();
  constructor(public auth: AuthService, public userData: UsersService) {
    this.user$.subscribe(data => {this.info = data.toJSON(); });
    // this.userData.setInfo();
  }
//
  ngOnInit() {
    this.userData.userDoc.subscribe(data => {
      console.log(data);
      this.info = data;
    });
    // console.log(firebase.storage());
  }
//
}
