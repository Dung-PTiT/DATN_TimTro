import {Injectable} from '@angular/core';
import {MainService} from "./main.service";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StripePaymentService extends MainService {

  constructor(private http: HttpClient, private cookieService: CookieService) {
    super();
    this.CONTEXT_URL = "";
  }

  createCharge(token: any, amount: any): Observable<any> {
    return this.http.post(this.PREFIX_URL + this.CONTEXT_URL + '/stripe/create-charge',
      null, {params: {token: token, amount: amount}});
  }
}
