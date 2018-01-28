import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private uid;
  private yo: AngularFirestoreCollection<any>;
  private date = new Date();
  private day = this.date.getDate();
  private month = this.date.getMonth() + 1;
  private year = this.date.getFullYear();
  private fullCurrentDate = this.month + '/' + this.day + '/' + this.year; // Full Date
  constructor(public auth: AngularFireAuth, public dbC: AngularFirestore, public router: Router) { }

  log(x) { console.log(x.value); }

  ngOnInit() {
    console.log(this.month + '/' + this.day + '/' + this.year);
  }

  register (first, last, password1, password2, company, email, address, addressTwo, city, state, zip) {
    const firstName = first.value;
    const lastName = last.value;
    const password = password1.value;
    const confirm = password2.value;
    const companyInput = company.value;
    const emailInput = email.value;
    const addressInput = address.value;
    const addressTwoInput = addressTwo.value;
    const cityInput = city.value;
    const stateInput = state.value;
    const zipInput = zip.value;
    if (password === confirm) {
      this.auth.auth.createUserWithEmailAndPassword(emailInput, password)
        .then(user => {
          this.uid = user.uid;
          console.log(user.uid);
          this.dbC.collection('users').doc(this.uid).set({
            first: firstName,
            last: lastName,
            company: companyInput,
            email: emailInput,
            address_line1: addressInput,
            address_line2: addressTwoInput,
            city: cityInput,
            state: stateInput,
            zip: zipInput,
            role: 'member',
            date_joined: this.fullCurrentDate,
            profile_pic: '../assets/images/generic_profile_pic.png'
          })
            .then(function () {
              // console.log('Success');
              this.router.navigate(['/members']);
            }).catch(err => { console.log(err); });
        })
        .catch(err => { console.log(err); } );
    }

  }

  test() {
    console.log('Submitted');
  }

}
