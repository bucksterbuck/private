import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {IContact} from '../interfaces/i-contact';
import * as firebase from 'firebase/app';
import {stripGeneratedFileSuffix} from '@angular/compiler/src/aot/util';


@Injectable()
export class ContactsService {
  private userInfo;
  public contacts: any;
  constructor(private auth: AuthService, private db: AngularFirestore) {
    this.userInfo = this.auth.user;
  }

  createContact(contact) {
    this.auth.user.subscribe(data => {
      const uid = data.uid;
      this.db.collection('contacts').doc(uid).collection('contacts').add(contact)
        .then(succ => {
          console.log(succ);
          const id = succ.id;
          this.db.collection('contacts').doc(uid).collection('contacts').doc(id).update({id: id}).then(done => {console.log('done'); } );
        })
        .catch (err => { console.log(err); } );

    });

  }

  // Get All Contacts as an Array
  getContacts (uid): Observable<any[]> {
      const docRef = this.db.collection('contacts').doc(uid).collection('contacts').valueChanges();
      return docRef;
  }

  getSingleContact (uid, docId): Observable<any> {
    const docRef = this.db.collection('contacts').doc(uid).collection('contacts').doc(docId).valueChanges();
    return docRef;
  }

  updateContact (uid, docId, object) {
    this.db.collection('contacts').doc(uid).collection('contacts').doc(docId).update(object)
      .then(succ => console.log(succ)).catch(err => console.log(err) );
  }

  deleteContact(uid, docId): Promise<any> {
     const docRef = this.db.collection('contacts').doc(uid).collection('contacts').doc(docId).delete();
    return docRef;

  }

  getNotesForContact (uid, docId) {
    const docRef = this.db.collection('contacts').doc(uid).collection('notes', ref => ref.where('cid', '==', docId)
    ).valueChanges();
    return docRef;
  }

  createNote(uid, data) {
    this.db.collection('contacts').doc(uid).collection('notes').add(data).then(succ => {
      const id = succ.id;
      this.db.collection('contacts').doc(uid).collection('notes').doc(id).update({nid: id} ).then().catch(err => console.log(err));
    }).catch(err => console.log(err));
  }

  editNote(uid, noteId, note) {
    this.db.collection('contacts').doc(uid).collection('notes').doc(noteId).update(note);
  }

  deleteNote(uid, noteId) {
    this.db.collection('contacts').doc(uid).collection('notes').doc(noteId).delete();
  }

  // test(uid): any {
  //   firebase.firestore().collesddsssction('contacts').doc(uid).collection('contacts')
  //     .onSnapshot(data => console.log(data.))
  //     });




  // dds

}
