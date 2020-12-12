import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs";
import {MainService} from "./main.service";
import {Tag} from "../model/tag";
import {Category} from "../model/category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends MainService {

  constructor(private http: HttpClient, private cookieService: CookieService) {
    super();
    this.CONTEXT_URL = "";
  }

  create(name: string, description: string): Observable<any> {
    return this.http.post(this.PREFIX_URL + this.CONTEXT_URL + '/category/create', {
      name: name,
      description: description
    });
  }

  update(category: Category): Observable<any> {
    return this.http.post(
      this.PREFIX_URL + this.CONTEXT_URL + '/category/update', {
        id: category.id,
        name: category.name,
        description: category.description
      });
  }

  delete(categoryId: any): Observable<any> {
    return this.http.post(
      this.PREFIX_URL + this.CONTEXT_URL + '/category/delete', null,
      {params: {categoryId: categoryId}});
  }

  getAll(): Observable<any> {
    return this.http.get(this.PREFIX_URL + this.CONTEXT_URL + '/category/get-all');
  }
}
