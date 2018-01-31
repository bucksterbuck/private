import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-owner-dashboard-sidebar',
  templateUrl: './owner-dashboard-sidebar.component.html',
  styleUrls: ['./owner-dashboard-sidebar.component.css']
})
export class OwnerDashboardSidebarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  openNav() {
    document.getElementById('mySidenav').style.width = '200px';
    document.getElementById('main').style.marginLeft = '250px';
  }

  closeNav() {
    document.getElementById('mySidenav').style.width = '0';
    document.getElementById('main').style.marginLeft = '0';
  }

}
