import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ContactsService} from '../../services/contacts.service';
import {IContact} from '../../interfaces/i-contact';
import {Observable} from 'rxjs/Observable';
import {MatDialog} from '@angular/material';
import {Location} from '@angular/common';
import {NgForm, NgModel} from '@angular/forms';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  public contact;
  public data;
  private docId: string;
  private test: IContact;
  private uid;
  private showDelete = false;
  private deleteConfirmed = false;
  private isEditing = false;
  private isNoteDelete = false;
  private isNoteEditing = false;
  private notes;

  constructor(public auth: AuthService, public route: ActivatedRoute, public contacts: ContactsService,
              public dialog: MatDialog, public location: Location, public router: Router) {
    this.auth.user.subscribe(user => {
      const uid = user.uid; this.uid = uid;
      this.route.params.subscribe(params => {
        this.docId = params['id'];
        // console.log(this.docId); // Development Purposes
        this.contact = this.contacts.getSingleContact(uid, this.docId).subscribe(info => this.data = info);
        // console.log(this.contacts);
        this.notes = this.contacts.getNotesForContact(uid, this.docId).subscribe(notes => this.notes = notes);
      });
    }); // ssss
  }
  goBack() {
    this.location.back();
  }
  ngOnInit() {

  }

  timeToEdit() {
    if (!this.isEditing) { this.isEditing = true; } else {
      this.isEditing = false;
    }
  }

  letsDelete() {
    this.deleteConfirmed = true;
    this.deleteShow();
  }

  dontDelete() {
    this.showDelete = false;
  }
  deleteShow() {
    this.showDelete = true;
    if (this.showDelete) {
      // console.log('Lets Delete!' + this.showDelete);
      if  (this.deleteConfirmed) {
        // console.log('Time to delete!' + this.uid);
        this.delete();
      }
    }
  }
  delete() {
    this.contacts.deleteContact(this.uid, this.docId)
      .then(succ => {
        // console.log(succ);
      this.location.back(); })
      .catch(err => {
        // console.log(err)sss;
      });
  }

  editContacts(editForm: NgForm) {
    console.log(editForm.valueChanges.subscribe(data => console.log(data)) );
    console.log(editForm.controls.first.value.length);
    const first = editForm.value.first;
    const last = editForm.value.last;
    const phone = editForm.value.phone;
    const fax = editForm.value.fax;
    const website = editForm.value.website;
    const address1 = editForm.value.address_line_1;
    const address2 = editForm.value.address_line_2;
    const city = editForm.value.city;
    const state = editForm.value.state;
    const zip = editForm.value.zip;
    const email = editForm.value.email;
    const company = editForm.value.company;

    this.updateFirst(first);
    this.updateLast(last);
    this.updateCompany(company);
    this.updatePhone(phone);
    this.updateFax(fax);
    this.updateWebsite(website);
    this.updateAddressLineOne(address1);
    this.updateAddressLineTwo(address2);
    this.updateCity(city);
    this.updateState(state);
    this.updateZip(zip);
    this.updateEmail(email);
  }

  updateFirst(value) {
    if (value.length > 0) {
      const object = {first: value};
      this.contacts.updateContact(this.uid, this.docId, object);
    }
  }
  updateLast(value) {
    if (value.length > 0) {
      const object = {last: value};
      this.contacts.updateContact(this.uid, this.docId, object);
    }
  }

  updateCompany(value) {
    if (value.length > 0) {
      const object = {company: value};
      this.contacts.updateContact(this.uid, this.docId, object);
    }
  }

  updatePhone(value) {
    if (value.length > 0) {
      const object = {phone: value};
      this.contacts.updateContact(this.uid, this.docId, object);
    }
  }

  updateFax(value) {
    if (value.length > 0) {
      const object = {fax: value};
      this.contacts.updateContact(this.uid, this.docId, object);
    }
  }

  updateEmail(value) {
    if (value.length > 0) {
      const object = {email: value};
      this.contacts.updateContact(this.uid, this.docId, object);
    }
  }

  updateWebsite(value) {
    if (value.length > 0) {
      const object = {website: value};
      this.contacts.updateContact(this.uid, this.docId, object);
    }
  }

  updateAddressLineOne(value) {
    if (value.length > 0) {
      const object = {address_line_1: value};
      this.contacts.updateContact(this.uid, this.docId, object);
    }
  }

  updateAddressLineTwo(value) {
    if (value.length > 0) {
      const object = {address_line_2: value};
      this.contacts.updateContact(this.uid, this.docId, object);
    }
  }

  updateCity(value) {
    if (value.length > 0) {
      const object = {city: value};
      this.contacts.updateContact(this.uid, this.docId, object);
    }
  }

  updateState(value) {
    if (value.length > 0) {
      const object = {state: value};
      this.contacts.updateContact(this.uid, this.docId, object);
    }
  }

  updateZip(value) {
    if (value.length > 0) {
      const object = {zip: value};
      this.contacts.updateContact(this.uid, this.docId, object);
    }
  }

  // HANDLES FORM FOR CREATING NOTE
  createNote(form: NgForm) {
    console.log(form.value.name);
    const date = new Date();
    const name = form.value.name;
    const description = form.value.description;
    const content = form.value.content;

    const note = {
      date_created: date,
      cid: this.docId,
      name: name,
      description: description,
      content: content
    };

    this.contacts.createNote(this.uid, note);
    form.resetForm();

  }

  // METHODS FOR MANAGING NOTE INTERACTION

  setDeleteNote(noteId: string) {
    this.isNoteDelete = true;
  }

  setEditNote(noteId: string) {
    this.isNoteEditing = true;
    console.log(noteId);
  }
  editNote (form: NgForm, noteId: string) {
    const name = form.value.name;
    const description = form.value.description;
    const contents = form.value.content;

    const updatedNote = {
      name: name,
      description: description,
      content: contents,
    };
    this.contacts.editNote(this.uid, noteId, updatedNote);
    this.isNoteEditing = false;
  }
  deleteNote (noteId: string) {
    this.contacts.deleteNote(this.uid, noteId);
    this.isNoteDelete = false;
  }


}
