import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {ToastService} from "../../../service/toast.service";
import {CommentService} from "../../../service/comment.service";
import {faEllipsisV, faPencilAlt, faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import {faTrashAlt} from "@fortawesome/free-regular-svg-icons";
import {AppConfig} from "../../../util/app-config";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  comments: Comment[] = [];
  displayedComment: string[] = [];
  dataSource: MatTableDataSource<Comment>;

  PREFIX_URL = AppConfig.PREFIX_URL;
  CONTEXT_URL: string = "";
  DEFAULT_IMAGE_USER = "./assets/images/avatar.png";

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private commentSerivce: CommentService,
              private matDialog: MatDialog,
              private toastService: ToastService) {

    this.PREFIX_URL = this.PREFIX_URL + this.CONTEXT_URL + "/image/get?imageUrl=";

    this.displayedComment = [
      'number', 'content', 'user', 'createTime', 'action'
    ];

    this.commentSerivce.getAll().subscribe(resp => {
      this.comments = resp.data;
      this.dataSource = new MatTableDataSource(resp.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnInit(): void {
  }

  deleteComment(comment: any) {
    console.log(comment);
  }

  searchTag(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  faEllipsisV = faEllipsisV;
  faTrashAlt = faTrashAlt;
  faPlusCircle = faPlusCircle;
  faPencilAlt = faPencilAlt;
}
