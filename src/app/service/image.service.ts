import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs";
import {MainService} from "./main.service";

@Injectable({
  providedIn: 'root'
})

export class ImageService extends MainService {

  constructor(private http: HttpClient, private cookieService: CookieService) {
    super();
    this.CONTEXT_URL = "";
  }

  getImage(imageUrl: any): Observable<any> {
    return this.http.get(this.PREFIX_URL + this.CONTEXT_URL + '/image/get',
      {params: new HttpParams().set('imageUrl', imageUrl)});
  }

  deleteImagePost(image: any, post: any): Observable<any> {
    return this.http.post(
      this.PREFIX_URL + this.CONTEXT_URL + '/image/delete', null,
      {params: {image: JSON.stringify(image), post: JSON.stringify(post)}});
  }

}
