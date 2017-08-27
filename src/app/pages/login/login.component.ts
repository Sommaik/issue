import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Login } from '../../shared/user/login';
import { LoginService } from '../../shared/user/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  login: Login;

  constructor(
    private router: Router,
    private loginService: LoginService
  ) {
    this.login = new Login();
  }

  @ViewChild('loginForm') loginForm: NgForm;



  ngOnInit() {
    setTimeout(() => {
      Materialize.updateTextFields();
    }, 1000);
  }

  doLogin() {
    if ($('.invalid').length > 0) {
      Materialize.toast('Invalid', 1000);
    } else {
      // localStorage.setItem('token', 'login');
      this.loginService.doLogin(this.login).subscribe((res)=>{
        if(res.success){
          localStorage.setItem('token', res.token)
          this.router.navigate(['support', 'issue-list']);
        }else{
          Materialize.toast('Login Fail', 1000);
        }
      });
    }
  }

  get isLogin() {
    return localStorage.getItem('token') ? true : false;
  }

}
