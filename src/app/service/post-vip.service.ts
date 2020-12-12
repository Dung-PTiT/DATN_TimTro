import {Injectable} from '@angular/core';
import {MainService} from "./main.service";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs";
import {PostVip} from "../model/postVip";

@Injectable({
  providedIn: 'root'
})
export class PostVipService extends MainService {

  constructor(private http: HttpClient, private cookieService: CookieService) {
    super();
    this.CONTEXT_URL = "";
  }

  update(postVip: PostVip): Observable<any> {
    return this.http.post(
      this.PREFIX_URL + this.CONTEXT_URL + '/post-vip/update',
      {
        id: postVip.id, name: postVip.name, dayPrice: postVip.dayPrice,
        weekPrice: postVip.weekPrice, monthPrice: postVip.monthPrice, description: postVip.description
      });
  }

  getAll(): Observable<any> {
    return this.http.get(this.PREFIX_URL + this.CONTEXT_URL + '/post-vip/get-all');
  }
}
