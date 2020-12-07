import {Injectable} from '@angular/core';
import {MainService} from "./main.service";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostVipService extends MainService {

  constructor(private http: HttpClient, private cookieService: CookieService) {
    super();
    this.CONTEXT_URL = "";
  }

  getAll(): Observable<any> {
    return this.http.get(this.PREFIX_URL + this.CONTEXT_URL + '/post-vip/get-all');
  }
}
