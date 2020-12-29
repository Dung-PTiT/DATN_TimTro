import {Injectable} from '@angular/core';
import {MainService} from "./main.service";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WalletService extends MainService {

  constructor(private http: HttpClient, private cookieService: CookieService) {
    super();
    this.CONTEXT_URL = "";
  }

  update(balance: any, walletId: any): Observable<any> {
    return this.http.post(
      this.PREFIX_URL + this.CONTEXT_URL + '/wallet/update', null,
      {params: {balance: balance, walletId: walletId}});
  }

  getTopUpHistory(walletId: any): Observable<any> {
    return this.http.get(
      this.PREFIX_URL + this.CONTEXT_URL + '/wallet/get-by-wallet-id',
      {params: {walletId: walletId}});
  }

  getAll(): Observable<any> {
    return this.http.get(this.PREFIX_URL + this.CONTEXT_URL + '/wallet/get-all');
  }
}
