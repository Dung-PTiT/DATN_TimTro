import {Injectable} from '@angular/core';
import {MainService} from "./main.service";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PaymentService extends MainService {

  constructor(private http: HttpClient, private cookieService: CookieService) {
    super();
    this.CONTEXT_URL = "";
  }

  pushPost(payment: any): Observable<any> {
    return this.http.post(this.PREFIX_URL + this.CONTEXT_URL + '/post/push', null,
      {
        params: {
          payment: JSON.stringify(payment)
        }
      });
  }

  fetchEnablePost(provinceId: any, districtId: any, wardId: any,
                  minPrice: any, maxPrice: any,
                  minAcreage: any, maxAcreage: any,
                  categoryId: any): Observable<any> {
    return this.http.post(this.PREFIX_URL + this.CONTEXT_URL + '/payment/get-all-enable-post', null,
      {params: {
          provinceId: provinceId,  districtId: districtId,  wardId: wardId,
          minPrice: minPrice,  maxPrice: maxPrice,
          minAcreage: minAcreage,  maxAcreage: maxAcreage,
          categoryId: categoryId,
        }
      });
  }
}
