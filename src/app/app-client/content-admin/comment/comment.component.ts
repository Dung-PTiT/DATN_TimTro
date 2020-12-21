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
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  comments: Array<Comment>;
  displayedComment: string[] = [];
  dataSource: MatTableDataSource<Comment>;

  IMAGE_URL = AppConfig.IMAGE_URL;
  DEFAULT_IMAGE_USER = AppConfig.DEFAULT_IMAGE_USER;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private commentSerivce: CommentService,
              private matDialog: MatDialog,
              private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.displayedComment = [
      'number', 'content', 'user', 'createTime', 'action'
    ];

    this.commentSerivce.getAll().subscribe(resp => {
      this.comments = resp.data;
      if (this.comments != null) {
        for (let i = 0; i < this.comments.length; i++) {
          // @ts-ignore
          if (this.comments[i]?.user?.imageUrl == null) {
            // @ts-ignore
            this.comments[i]?.user?.imageUrl = this.DEFAULT_IMAGE_USER;
          } else { // @ts-ignore
            if ((this.comments[i]?.user?.imageUrl.indexOf("http") == -1)) {
              // @ts-ignore
              this.comments[i]?.user?.imageUrl = this.IMAGE_URL + '/user/' + this.comments[i]?.user.id + '/' + this.comments[i]?.user?.imageUrl;
            }
          }
        }
      }
      this.dataSource = new MatTableDataSource(resp.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  deleteComment(comment: any) {
    Swal.fire({
      title: 'Bạn muốn xóa bình luận?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Hủy',
      confirmButtonText: 'Xóa',
      customClass: 'swal-confirm-style',
    }).then((result) => {
      if (result.value) {
        this.commentSerivce.deleteComment(comment.id).subscribe(resp => {
          if (resp.success == true) {
            this.commentSerivce.getAll().subscribe(resp => {
              this.comments = resp.data;
              if (this.comments != null) {
                for (let i = 0; i < this.comments.length; i++) {
                  // @ts-ignore
                  if (this.comments[i]?.user?.imageUrl == null) {
                    // @ts-ignore
                    this.comments[i]?.user?.imageUrl = this.DEFAULT_IMAGE_USER;
                  } else { // @ts-ignore
                    if ((this.comments[i]?.user?.imageUrl.indexOf("http") == -1)) {
                      // @ts-ignore
                      this.comments[i]?.user?.imageUrl = this.IMAGE_URL + '/user/' + this.comments[i]?.user.id + '/' + this.comments[i]?.user?.imageUrl;
                    }
                  }
                }
              }
              this.dataSource = new MatTableDataSource(resp.data);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            });
            this.toastService.showSuccess(resp.data);
          } else {
            this.toastService.showError(resp.data);
          }
        });
      }
    })
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
