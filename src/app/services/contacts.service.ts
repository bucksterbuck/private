import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";

@Injectable()
export class ContactsService {
  private userInfo;
  constructor(private auth: AuthService) {
    this.userInfo = this.auth.user;
  }

}
