import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {PostVip} from "../../../model/postVip";
import {MatDialog} from "@angular/material/dialog";
import {ToastService} from "../../../service/toast.service";
import {PostVipService} from "../../../service/post-vip.service";
import {faEllipsisV, faPencilAlt, faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import {faTrashAlt} from "@fortawesome/free-regular-svg-icons";
import {PostVipUpdateDialogComponent} from "./post-vip-update-dialog/post-vip-update-dialog.component";

@Component({
  selector: 'app-post-vip',
  templateUrl: './post-vip.component.html',
  styleUrls: ['./post-vip.component.css']
})
export class PostVipComponent implements OnInit {

  postVips: PostVip[] = [];
  displayedPostVip: string[] = [];
  dataSource: MatTableDataSource<PostVip>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private postVipService: PostVipService,
              private matDialog: MatDialog,
              private toastService: ToastService) {
    this.displayedPostVip = ['number', 'name', 'dayPrice', 'weekPrice', 'monthPrice', 'description', 'action'];

    this.postVipService.getAll().subscribe(resp => {
      this.postVips = resp.data;
      this.dataSource = new MatTableDataSource(resp.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnInit(): void {
  }

  openUpdatePostVipDialog(postVip : any) {
    const dialogRef = this.matDialog.open(PostVipUpdateDialogComponent, {
      width: '600px',
      height: 'auto',
      data: postVip,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(resp => {
      if (resp == true) {
        this.postVipService.getAll().subscribe(resp => {
          this.postVips = resp.data;
          this.dataSource = new MatTableDataSource(resp.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
        this.toastService.showSuccess("Đã cập nhật");
      } else if (resp == false) {
        this.toastService.showError("Không cập nhật được");
      } else if (resp == "none") {
      }
    });
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
