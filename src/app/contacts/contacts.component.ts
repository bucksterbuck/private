import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ContactsService} from '../services/contacts.service';
import {AuthService} from '../services/auth.service';
import * as firebase from 'firebase/app';
import {IContact} from '../interfaces/i-contact';
import {Observable} from 'rxjs/Observable';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DataSource} from '@angular/cdk/collections';

export interface IContactId extends IContact {id: string; }
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit, AfterViewInit, OnDestroy {
  // Table Stuff
  displayedColumns = [
                      'first',
                      'last',
                      'company',
                      'phone',
                      'fax',
                      'email',
                      'options',
                      'delete'
                      ];
  public dataSource;
  paginate: MatPaginator;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private contacts: Observable<IContact[]>;
  private test: IContact[];
  private uid;
  private authSub;

  constructor(public cs: ContactsService, public auth: AuthService) {
    this.authSub = this.auth.user.subscribe(data => {
      this.uid = data.uid;
      this.contacts = this.cs.getContacts(this.uid);
      // console.log(this.contacts);
      this.cs.getContacts(this.uid).subscribe(info => {
        this.test = info;
        this.dataSource = new MatTableDataSource(this.test);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
        });
    console.log(this.test);


  }

  ngOnInit() {

  }
  ngAfterViewInit() {

  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }




  // Create Conta
  create(contactForm) {
    // console.log(contactForm);
    const first = contactForm.value.first;
    const last = contactForm.value.last;
    const phone = contactForm.value.phone;
    const fax = contactForm.value.fax;
    const address1 = contactForm.value.address1;
    const address2 = contactForm.value.address2;
    const city = contactForm.value.city;
    const state = contactForm.value.state;
    const zip = contactForm.value.zip;
    const email = contactForm.value.email;
    const company = contactForm.value.company;

    const newContact = {
      first: first,
      last: last,
      phone: phone,
      fax: fax,
      address_line_1: address1,
      address_line_2: address2,
      city: city,
      state: state,
      zip: zip,
      company: company,
      email: email
    };
    console.log('submitted');
    this.cs.createContact(newContact);
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}

// TODO(me): Fix form to Angular Material!!




