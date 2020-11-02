import {Injectable} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {AppConfig} from "../util/app-config";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  PREFIX_URL = AppConfig.PREFIX_URL;
  CONTEXT_URL: string;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.CONTEXT_URL = "/auth";
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.PREFIX_URL + this.CONTEXT_URL + '/login', {username: username, password: password});
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(this.PREFIX_URL + this.CONTEXT_URL + '/get-current-user');
  }
}
