import {Injectable} from '@angular/core';
import {AppConfig} from "../util/app-config";
import {HttpClient, HttpParams} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  PREFIX_URL = AppConfig.PREFIX_URL;
  CONTEXT_URL: string;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.CONTEXT_URL = "";
  }

  getAllProvinces(): Observable<any> {
    return this.http.get(this.PREFIX_URL + this.CONTEXT_URL + '/address/province/get-all');
  }

  getProvinceById(id: any): Observable<any> {
    return this.http.get(this.PREFIX_URL + this.CONTEXT_URL + '/address/province/get-by-id',
      {params: new HttpParams().set('id', id)});
  }

  getDistrictById(id: any): Observable<any> {
    return this.http.get(this.PREFIX_URL + this.CONTEXT_URL + '/address/district/get-by-id',
      {params: new HttpParams().set('id', id)});
  }
}
