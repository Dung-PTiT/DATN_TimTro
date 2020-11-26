import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs";
import {MainService} from "./main.service";

@Injectable({
  providedIn: 'root'
})
export class PostService extends MainService {

  constructor(private http: HttpClient, private cookieService: CookieService) {
    super();
    this.CONTEXT_URL = "";
  }

  createPost(formData: FormData): Observable<any> {
    return this.http.post(this.PREFIX_URL + this.CONTEXT_URL + '/post/create', formData);
  }

  getPostById(id: any): Observable<any> {
    return this.http.get(this.PREFIX_URL + this.CONTEXT_URL + '/post/get-by-id',
      {params: new HttpParams().set('id', id)});
  }

  getAll(): Observable<any> {
    return this.http.get(this.PREFIX_URL + this.CONTEXT_URL + '/post/get-all');
  }
}
