import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicZoneComponent } from './pages/public-zone/public-zone.component';
import { SupportZoneComponent } from './pages/support-zone/support-zone.component';
import { UserComponent } from './pages/user/user.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { LoginComponent } from './pages/login/login.component';
import { IssueComponent } from './pages/issue/issue.component';
import { IssueListComponent } from './pages/issue-list/issue-list.component';
import { HomeComponent } from './pages/home/home.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { CustomerListComponent } from './pages/customer-list/customer-list.component';
import { CompanyComponent } from './pages/company/company.component';
import { CompanyListComponent } from './pages/company-list/company-list.component';
import { LoginGuard } from './shared/user/login.guard';

@NgModule({
  declarations: [
    AppComponent,
    PublicZoneComponent,
    SupportZoneComponent,
    UserComponent,
    UserListComponent,
    LoginComponent,
    IssueComponent,
    IssueListComponent,
    HomeComponent,
    CustomerComponent,
    CustomerListComponent,
    CompanyComponent,
    CompanyListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [ LoginGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
