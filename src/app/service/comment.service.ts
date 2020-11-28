import {Injectable} from '@angular/core';
import {MainService} from "./main.service";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommentService extends MainService {

  constructor(private http: HttpClient, private cookieService: CookieService) {
    super();
    this.CONTEXT_URL = "";
  }

  createComment(content: any, postId: any): Observable<any> {
    return this.http.post(
      this.PREFIX_URL + this.CONTEXT_URL + '/comment/create', null,
      {params: {content: content, postId: postId}});
  }

  deleteComment(commentId: any): Observable<any> {
    return this.http.post(
      this.PREFIX_URL + this.CONTEXT_URL + '/comment/delete', null,
      {params: {commentId: commentId}});
  }

  getCommentByPostId(id: any): Observable<any> {
    return this.http.get(this.PREFIX_URL + this.CONTEXT_URL + '/comment/get-by-post-id',
      {params: new HttpParams().set('id', id)});
  }

}
