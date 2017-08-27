import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../../../environments/environment';
import { Company } from './company';
import { PageResult } from '../global/page-result';

@Injectable()
export class CompanyService {
  options;

  constructor(private http: Http) {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + localStorage.getItem('token')
    });
    this.options = new RequestOptions({ headers: headers });
  }

  loadItem(): Observable<Company[]> {
    return this.http.get(`${environment.apiUrl}/company`, this.options)
      .map((res: Response) => {
        return res.json();
      })
      .catch((error: any) => Observable.throw(error));
  } ß

  addItem(body: Company): Observable<Company> {
    const bodyString = JSON.stringify(body);
    return this.http.post(
      `${environment.apiUrl}/company`, bodyString, this.options)
      .map((res: Response) => {
        return res.json();
      })
      .catch((error: any) => Observable.throw(error));
  }

  deleteItem(id): Observable<Company[]> {
    return this.http.delete(`${environment.apiUrl}/company/${id}`, this.options)
      .map((res: Response) => {
        return res.json();
      })
      .catch((error: any) => Observable.throw(error));
  }

  findById(id): Observable<Company> {
    return this.http.get(
      `${environment.apiUrl}/company/findById/${id}`, this.options
    ).map((res: Response) => {
      return res.json();
    })
      .catch((error: any) => Observable.throw(error));
  }

  updateItem(id, body: Company): Observable<Company> {
    const bodyString = JSON.stringify(body);
    return this.http.put(
      `${environment.apiUrl}/company/${id}`, bodyString, this.options)
      .map((res: Response) => {
        return res.json();
      })
      .catch((error: any) => Observable.throw(error));
  }

  search(body: any): Observable<PageResult> {
    const bodyString = JSON.stringify(body);
    return this.http.post(
      `${environment.apiUrl}/company/search`, bodyString, this.options)
      .map((res: Response) => {
        return res.json();
      })
      .catch((error: any) => Observable.throw(error));
  }
}
