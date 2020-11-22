import {Injectable} from '@angular/core';
import {AppConfig} from "../util/app-config";
import {HttpClient, HttpParams} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ImageService {
  PREFIX_URL = AppConfig.PREFIX_URL;
  CONTEXT_URL: string;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.CONTEXT_URL = "";
  }

  getImage(imageUrl: any): Observable<any> {
    return this.http.get(this.PREFIX_URL + this.CONTEXT_URL + '/image/get',
      {params: new HttpParams().set('imageUrl', imageUrl)});
  }

}
