import {Injectable} from '@angular/core';
import {MainService} from "./main.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FavoriteService extends MainService {

  constructor(private http: HttpClient, private cookieService: CookieService) {
    super();
    this.CONTEXT_URL = "";
  }

  createFavorite(postId: any): Observable<any> {
    return this.http.post(
      this.PREFIX_URL + this.CONTEXT_URL + '/favorite/create',
      null,
      {params: {postId: postId}});
  }

  getFavoriteByUserId(userId: any): Observable<any> {
    return this.http.get(
      this.PREFIX_URL + this.CONTEXT_URL + '/favorite/get-by-user-id',
      {params: new HttpParams().set('userId', userId)});
  }

  getAll(): Observable<any> {
    return this.http.get(this.PREFIX_URL + this.CONTEXT_URL + '/favorite/get-all');
  }
}
