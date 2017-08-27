import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../../../environments/environment';
import { User } from './user';
import { PageResult } from '../global/page-result';

@Injectable()
export class UserService {

  options;
  
    constructor(private http: Http) {
      let headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + localStorage.getItem('token')
      });
      this.options = new RequestOptions({ headers: headers });
    }
  
    loadItem(): Observable<User[]> {
      return this.http.get(`${environment.apiUrl}/user`, this.options)
        .map((res: Response) => {
          return res.json();
        })
        .catch((error: any) => Observable.throw(error));
    } ß
  
    addItem(body: User): Observable<User> {
      const bodyString = JSON.stringify(body);
      return this.http.post(
        `${environment.apiUrl}/user`, bodyString, this.options)
        .map((res: Response) => {
          return res.json();
        })
        .catch((error: any) => Observable.throw(error));
    }
  
    deleteItem(id): Observable<User[]> {
      return this.http.delete(`${environment.apiUrl}/user/${id}`, this.options)
        .map((res: Response) => {
          return res.json();
        })
        .catch((error: any) => Observable.throw(error));
    }
  
    findById(id): Observable<User> {
      return this.http.get(
        `${environment.apiUrl}/user/findById/${id}`, this.options
      ).map((res: Response) => {
        return res.json();
      })
        .catch((error: any) => Observable.throw(error));
    }
  
    updateItem(id, body: User): Observable<User> {
      const bodyString = JSON.stringify(body);
      return this.http.put(
        `${environment.apiUrl}/user/${id}`, bodyString, this.options)
        .map((res: Response) => {
          return res.json();
        })
        .catch((error: any) => Observable.throw(error));
    }
  
    search(body: any): Observable<PageResult> {
      const bodyString = JSON.stringify(body);
      return this.http.post(
        `${environment.apiUrl}/user/search`, bodyString, this.options)
        .map((res: Response) => {
          return res.json();
        })
        .catch((error: any) => Observable.throw(error));
    }

}
