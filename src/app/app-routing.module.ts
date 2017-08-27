import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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

const routes: Routes = [
  {
    path: '',
    component: PublicZoneComponent,
    children: [{
      path: '',
      component: HomeComponent
    }, {
      path: 'home',
      component: HomeComponent
    }, {
      path: 'login',
      component: LoginComponent
    }]
  },
  {
    path: 'support',
    component: SupportZoneComponent,
    canActivate: [LoginGuard],
    children: [{
      path: '',
      component: IssueListComponent
    }, {
      path: 'company',
      component: CompanyComponent
    }, {
      path: 'company/:id',
      component: CompanyComponent
    }, {
      path: 'company-list',
      component: CompanyListComponent
    }, {
      path: 'customer',
      component: CustomerComponent
    }, {
      path: 'customer-list',
      component: CustomerListComponent
    }, {
      path: 'user',
      component: UserComponent
    }, {
      path: 'user-list',
      component: UserListComponent
    }, {
      path: 'issue',
      component: IssueComponent
    }, {
      path: 'issue-list',
      component: IssueListComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
