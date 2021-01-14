import {Injectable} from '@angular/core';
import {MainService} from "./main.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService extends MainService {

  constructor(private http: HttpClient, private cookieService: CookieService) {
    super();
    this.CONTEXT_URL = "";
  }

  getUserById(id: any): Observable<any> {
    return this.http.get(this.PREFIX_URL + this.CONTEXT_URL + '/user/get-by-id',
      {params: new HttpParams().set('id', id)});
  }

  getAll(): Observable<any> {
    return this.http.get(this.PREFIX_URL + this.CONTEXT_URL + '/user/get-all');
  }

  changePassword(userId: any, newPassword: any): Observable<any> {
    return this.http.post(
      this.PREFIX_URL + this.CONTEXT_URL + '/user/change-password', null,
      {params: {id: userId, password: newPassword}});
  }

  checkCurrentPassword(currentPassword: any): Observable<any> {
    return this.http.post(
      this.PREFIX_URL + this.CONTEXT_URL + '/user/check-current-password', null,
      {params: {currentPassword: currentPassword}});
  }

  delete(userId: any): Observable<any> {
    return this.http.post(
      this.PREFIX_URL + this.CONTEXT_URL + '/user/delete', null,
      {params: {id: userId}});
  }

  updateUser(formData: FormData): Observable<any> {
    return this.http.post(this.PREFIX_URL + this.CONTEXT_URL + '/user/update', formData);
  }
}
