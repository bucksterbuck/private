import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {Users} from '../interfaces/users';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private settings: Observable<any>;

  constructor(private afs: AngularFirestore ) { }

  ngOnInit() {
    const document: AngularFirestoreDocument<any> = this.afs.doc('globals/sitesettings')
    this.settings = document.valueChanges();
  }

}
