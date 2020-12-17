import {Component, OnInit, ViewChild} from '@angular/core';
import {TagService} from "../../../service/tag.service";
import {Tag} from "../../../model/tag";
import {faEllipsisV, faPencilAlt, faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import {faTrashAlt} from "@fortawesome/free-regular-svg-icons";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {TagCreateDialogComponent} from "./tag-create-dialog/tag-create-dialog.component";
import {ToastService} from "../../../service/toast.service";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {TagUpdateDialogComponent} from "./tag-update-dialog/tag-update-dialog.component";

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {

  tags: Tag[] = [];
  displayedTag: string[] = [];
  dataSource: MatTableDataSource<Tag>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private tagService: TagService,
              private matDialog: MatDialog,
              private toastService: ToastService) {
    this.displayedTag = ['number', 'name', 'description', 'action'];

    this.tagService.getAll().subscribe(resp => {
      this.tags = resp.data;
      this.dataSource = new MatTableDataSource(resp.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnInit(): void {
  }

  openCreateTagDialog() {
    const dialogRef = this.matDialog.open(TagCreateDialogComponent, {
      width: '400px',
      height: 'auto',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(resp => {
      if (resp == true) {
        this.tagService.getAll().subscribe(resp => {
          this.tags = resp.data;
          this.dataSource = new MatTableDataSource(resp.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
        this.toastService.showSuccess("Đã thêm");
      } else if (resp == false) {
        this.toastService.showError("Không thêm được");
      } else if (resp == "none") {
      }
    });
  }


  openUpdateTagDialog(tag: any) {
    const dialogRef = this.matDialog.open(TagUpdateDialogComponent, {
      width: '400px',
      height: 'auto',
      disableClose: true,
      data: tag
    });

    dialogRef.afterClosed().subscribe(resp => {
      if (resp == true) {
        this.tagService.getAll().subscribe(resp => {
          this.tags = resp.data;
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

  deleteTag(tag: any) {
    Swal.fire({
      title: 'Bạn muốn xóa tiện ích?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Hủy',
      confirmButtonText: 'Xóa',
      customClass: 'swal-confirm-style',
    }).then((result) => {
      if (result.value) {
        this.tagService.delete(tag.id).subscribe(resp => {
          if (resp.success == true) {
            this.tagService.getAll().subscribe(resp => {
              this.tags = resp.data;
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

