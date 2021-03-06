import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from '../../shared/company/company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
  providers: [CompanyService]
})
export class CompanyComponent implements OnInit {

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private companyService: CompanyService
  ) { }

  mode = 'ADD';
  id = 0;
  compCode: string;
  compName: string;

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      if (params['id']) {
        const id = params['id'];
        // let companyData = JSON.parse(localStorage.getItem('company'));
        // let company = companyData[id];
        this.companyService.findById(id).subscribe(
          company => {
            this.compCode = company.compCode;
            this.compName = company.compName;
            setTimeout(() => {
              Materialize.updateTextFields();
            }, 100);
          }, error => {
            console.log(error);
          });
        this.mode = 'EDIT';
        this.id = id;
      }
    });
  }

  onSave() {
    const comp = {
      compCode: this.compCode,
      compName: this.compName
    };
    const company: Array<any> = [];

    if (this.mode === 'EDIT') {
      this.companyService.updateItem(this.id, comp).subscribe(
        data => {
          Materialize.toast('Update item complete', 1000);
          this.router.navigate(['support', 'company-list']);
        },
        err => {
          console.log(err);
        }
      );
    } else {
      this.companyService.addItem(comp).subscribe(
        datas => {
          Materialize.toast('Add new item complete', 1000);
          this.router.navigate(['support', 'company-list']);
        },
        err => {
          console.log(err);
        }
      );
    }
  }

}
