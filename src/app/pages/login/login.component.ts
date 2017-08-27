import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Login } from '../../shared/user/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: Login;

  constructor(private router: Router) {
    this.login = new Login();
  }

  @ViewChild('loginForm') loginForm: NgForm;



  ngOnInit() {
    setTimeout(()=>{
      Materialize.updateTextFields();
    }, 1000);
  }

  doLogin() {
    if ($(".invalid").length > 0) {
      Materialize.toast('Invalid', 1000);
    } else {
      localStorage.setItem('token', 'login');
      this.router.navigate(['support', 'issue-list']);
    }
  }

  get isLogin() {
    return localStorage.getItem('token') ? true : false;
  }

}
