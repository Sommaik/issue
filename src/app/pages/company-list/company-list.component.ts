import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from '../../shared/company/company.service';
import { Company } from '../../shared/company/company';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css'],
  providers: [CompanyService]
})
export class CompanyListComponent implements OnInit {

  constructor(
    private router: Router,
    private companyService: CompanyService
  ) { }
  companyData: Array<Company>;
  searchText = '';
  numPage = 0;
  rowPerPage = 10;
  total = 0;
  paging = [];

  ngOnInit() {
    this.search();
  }

  loadItem() {
    this.companyService.loadItem().subscribe(
      datas => {
        this.companyData = datas;
      },
      err => {
        console.log(err);
      });
  }

  onAddButtonClick() {
    this.router.navigate(['support', 'company']);
  }

  onDeleteButtonClick(id) {
    this.companyService.deleteItem(id).subscribe(
      datas => {
        this.loadItem();
      },
      err => {
        console.log(err);
      });
  }

  onEditButtonClick(id) {
    this.router.navigate(['support', 'company', id]);
  }

  search() {
    const searchBody = {
      searchText: this.searchText,
      rowPerPage: this.rowPerPage,
      numPage: this.numPage
    };
    this.companyService.search(searchBody).subscribe(data => {
      this.companyData = data.rows;
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
