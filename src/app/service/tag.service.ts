import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs";
import {MainService} from "./main.service";
import {Tag} from "../model/tag";

@Injectable({
  providedIn: 'root'
})
export class TagService extends MainService {

  constructor(private http: HttpClient, private cookieService: CookieService) {
    super();
    this.CONTEXT_URL = "";
  }

  create(name: string, description: string): Observable<any> {
    return this.http.post(this.PREFIX_URL + this.CONTEXT_URL + '/tag/create', {name: name, description: description});
  }

  update(tag: Tag): Observable<any> {
    return this.http.post(
      this.PREFIX_URL + this.CONTEXT_URL + '/tag/update', {id: tag.id, name: tag.name, description: tag.description});
  }

  delete(tagId: any): Observable<any> {
    return this.http.post(
      this.PREFIX_URL + this.CONTEXT_URL + '/tag/delete', null,
      {params: {tagId: tagId}});
  }

  getAll(): Observable<any> {
    return this.http.get(this.PREFIX_URL + this.CONTEXT_URL + '/tag/get-all');
  }
}
