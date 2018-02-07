import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from './services/auth.service';
import {AuthGuardService} from './services/auth-guard.service';
import { MembersComponent } from './members/members.component';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogModule, MatExpansionModule, MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatSidenavModule, MatSliderModule, MatSortModule, MatTableModule,
  MatToolbarModule, MatTooltipModule
} from '@angular/material';
import { RegisterComponent } from './register/register.component';
import {UsersService} from './services/users.service';
import { EditprofileComponent } from './editprofile/editprofile.component';
import {HttpClientModule} from '@angular/common/http';
import {AngularFireStorageModule} from "angularfire2/storage";
import { OwnerDashboardComponent } from './owner_area/owner-dashboard/owner-dashboard.component';
import { OwnerDashboardHeaderComponent } from './owner_area/owner-dashboard-header/owner-dashboard-header.component';
import { OwnerDashboardSidebarComponent } from './owner_area/owner-dashboard-sidebar/owner-dashboard-sidebar.component';
import { OwnerDashboardFooterComponent } from './owner_area/owner-dashboard-footer/owner-dashboard-footer.component';
import { ContactsComponent } from './contacts/contacts.component';
import {ContactsService} from "./services/contacts.service";
import { ContactDetailsComponent } from './contacts/contact-details/contact-details.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'members', component: MembersComponent, canActivate: [AuthGuardService]},
  { path: 'profile/edit', component: EditprofileComponent, canActivate: [AuthGuardService]},
  { path: 'owner', component: OwnerDashboardComponent, canActivate: [AuthGuardService]},
  { path: 'contacts', component: ContactsComponent, canActivate: [AuthGuardService]},
  { path: 'contacts/:id', component: ContactDetailsComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    MembersComponent,
    RegisterComponent,
    EditprofileComponent,
    OwnerDashboardComponent,
    OwnerDashboardHeaderComponent,
    OwnerDashboardSidebarComponent,
    OwnerDashboardFooterComponent,
    ContactsComponent,
    ContactDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase ),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    MatCheckboxModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatListModule,
    MatSliderModule,
    MatProgressBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MatTooltipModule,
    MatDialogModule,
    MatExpansionModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    UsersService,
    ContactsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
