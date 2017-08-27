import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/user/user';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../shared/user/user.service';
import { UploadService } from '../../shared/global/upload.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService, UploadService]
})
export class UserComponent implements OnInit {

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private userService: UserService,
    private uploadService: UploadService
  ) {
    this.user = new User();
  }

  mode = 'ADD';
  id = 0;
  user: User;
  repassword: string;
  filesToUpload: Array<File>;
  img: string = "logo.jpg";

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      if (params['id']) {
        const id = params['id'];
        this.userService.findById(id).subscribe(
          user => {
            this.user = user;
            this.repassword = user["password"];
            console.dir(this.user);
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

    setTimeout(() => {
      $('select').material_select();
      $('select').change((e) => {
        this.user[e.currentTarget["name"]] = e.currentTarget["value"];
      });
    }, 1000);
  }

  onSave() {

    const company: Array<any> = [];

    if (this.mode === 'EDIT') {
      this.userService.updateItem(this.id, this.user).subscribe(
        data => {
          Materialize.toast('Update item complete', 1000);
          this.router.navigate(['support', 'user-list']);
        },
        err => {
          console.log(err);
        }
      );
    } else {
      this.userService.addItem(this.user).subscribe(
        datas => {
          Materialize.toast('Add new item complete', 1000);
          this.router.navigate(['support', 'user-list']);
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  fileChangeEvent(fileInput) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  upload() {
    this.uploadService.makeFileRequest(environment.apiUrl + "/user/profile/"+this.id, [], this.filesToUpload).subscribe((res) => {
      Materialize.toast('Upload profile picture complete.', 1000);
      this.router.navigate(['support', 'user-list']);
    })
  }

}
