import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-public-zone',
  templateUrl: './public-zone.component.html',
  styleUrls: ['./public-zone.component.css']
})
export class PublicZoneComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  get isLogin() {
    return localStorage.getItem('token') ? true : false;
  }

  logOut() {
    localStorage.removeItem('token');
  }
}
