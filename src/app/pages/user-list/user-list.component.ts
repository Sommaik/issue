import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../shared/user/user.service';
import { User } from '../../shared/user/user';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [UserService]
})
export class UserListComponent implements OnInit {
  userData: Array<User>;
  searchText = '';
  numPage = 0;
  rowPerPage = 10;
  total = 0;
  paging = [];
  imgUrl: string;

  constructor(
    private router: Router,
    private userService: UserService
  ) { 
    this.imgUrl = environment.apiUrl+"/image/profile/";
  }


  ngOnInit() {
    this.search();
  }

  loadItem() {
    this.userService.loadItem().subscribe(
      datas => {
        this.userData = datas;
      },
      err => {
        console.log(err);
      });
  }

  onAddButtonClick() {
    this.router.navigate(['support', 'user']);
  }

  onDeleteButtonClick(id) {
    this.userService.deleteItem(id).subscribe(
      datas => {
        this.loadItem();
      },
      err => {
        console.log(err);
      });
  }

  onEditButtonClick(id) {
    this.router.navigate(['support', 'user', id]);
  }

  search() {
    const searchBody = {
      searchText: this.searchText,
      rowPerPage: this.rowPerPage,
      numPage: this.numPage
    };
    this.userService.search(searchBody).subscribe(data => {
      this.userData = data.rows;
      this.total = data.total;
      this.renderPaging();
    }, error => {
      console.log(error);
    });
  }

  renderPaging() {
    const allPage = Math.ceil(this.total / this.rowPerPage);
    this.paging = [];
    for (let i = 0; i < allPage; i++) {
      this.paging.push(i + 1);
    }
  }

  gotoPage(pId) {
    this.numPage = pId;
    this.search();
  }

}
