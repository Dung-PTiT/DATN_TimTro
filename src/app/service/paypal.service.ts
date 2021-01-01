import {Injectable} from '@angular/core';
import {MainService} from "./main.service";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PaypalService extends MainService {

  constructor(private http: HttpClient, private cookieService: CookieService) {
    super();
    this.CONTEXT_URL = "";
  }

  makePayment(sum): Observable<any> {
    return this.http.post(this.PREFIX_URL + this.CONTEXT_URL + '/paypal/make/payment?sum=' + sum, {});
  }

  completePayment(paymentId: any, payerId: any) : Observable<any> {
    return this.http.post(this.PREFIX_URL + this.CONTEXT_URL + '/paypal/complete/payment?paymentId=' + paymentId + '&payerId=' + payerId , {});
  }
}
