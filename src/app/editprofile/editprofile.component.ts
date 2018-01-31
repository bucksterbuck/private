import { Component, OnInit } from '@angular/core';
import {UsersService} from '../services/users.service';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../services/auth.service';
import * as firebase from 'firebase/app';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
  public info: any;
  public user$: Observable<firebase.User> = this.auth.user;
  private users;
  private states;
  private email;
  private currentlyUploading = false;
  private progress;
  private profilePicLink: Observable<boolean>;

  constructor(public userInfo: UsersService, public auth: AuthService, public http: HttpClient) {
    this.user$.subscribe(data => {
      this.info = data.toJSON();
      this.users = data.toJSON();
      console.log(this.users);
      const storage = firebase.storage();
      const pathReference = storage.ref();
      pathReference.child('/user_uploads/profile_pics/' + data.uid + 'profile_pic.jpg').getDownloadURL()
        .then(url => {
          this.profilePicLink = url;
        }).catch(err => {
        console.log(err);
      });
    });
  }

  ngOnInit() {
    this.userInfo.userDoc.subscribe(data => {
      this.info = data;
      console.log(data.email);
      this.email = data.email;
    });
    this.http.get('../assets/data/states.json').subscribe(data => {
      this.states = data;
    });
    console.log(this.profilePicLink);
  }

// sdf
  log(x) {
    if (x.value !== '') {
      console.log(x);
    }
  }

  logs(x) {
    console.log(x);
  }

  upload(picture) {

    const file = <HTMLInputElement>document.getElementById('profile_pic');
    const metaData = {
      name: 'profile_pic.jpg',
      contentType: 'image/jpeg'
    };

    console.log(file.files[0]);

    const storageRef = firebase.storage().ref('user_uploads/profile_pics/' + this.users.uid + 'profile_pic.jpg')
      .put(file.files[0], metaData).on('state_changed', upload => {
        console.log(upload);
        this.currentlyUploading = true;
        // this.progress = (upload.bytesTransferred / upload.totalBytes) * 100;
      }, function (err) {
        console.log(err);
      }, function () {
        console.log('Complete');
        this.currentlyUploading = false;
        console.log(this.currentlyUploading);
      });
  }

  update(first, last, password1, password2, company, email, address, addressTwo, city, state, zip, profile_pic) {
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


// sdfsdfsds
  }
}

