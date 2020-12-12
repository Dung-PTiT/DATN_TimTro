import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {ToastService} from "../../../service/toast.service";
import {CategoryService} from "../../../service/category.service";
import {Category} from "../../../model/category";
import {faEllipsisV, faPencilAlt, faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import {faTrashAlt} from "@fortawesome/free-regular-svg-icons";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {CategoryCreateDialogComponent} from "./category-create-dialog/category-create-dialog.component";
import {CategoryUpdateDialogComponent} from "./category-update-dialog/category-update-dialog.component";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: Category[] = [];
  displayedCategory: string[] = [];
  dataSource: MatTableDataSource<Category>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private categoryService: CategoryService,
              private matDialog: MatDialog,
              private toastService: ToastService) {
    this.displayedCategory = ['number', 'name', 'description', 'action'];

    this.categoryService.getAll().subscribe(resp => {
      this.categories = resp.data;
      this.dataSource = new MatTableDataSource(resp.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnInit(): void {
  }

  openCreateCategoryDialog() {
    const dialogRef = this.matDialog.open(CategoryCreateDialogComponent, {
      width: '400px',
      height: 'auto',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(resp => {
      if (resp == true) {
        this.categoryService.getAll().subscribe(resp => {
          this.categories = resp.data;
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


  openUpdateCategoryDialog(tag: any) {
    const dialogRef = this.matDialog.open(CategoryUpdateDialogComponent, {
      width: '400px',
      height: 'auto',
      disableClose: true,
      data: tag
    });

    dialogRef.afterClosed().subscribe(resp => {
      if (resp == true) {
        this.categoryService.getAll().subscribe(resp => {
          this.categories = resp.data;
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
      title: 'Bạn muốn xóa chuyên mục?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Hủy',
      confirmButtonText: 'Xóa',
      customClass: 'swal-confirm-style',
    }).then((result) => {
      if (result.value) {
        this.categoryService.delete(tag.id).subscribe(resp => {
          if (resp.success == true) {
            this.categoryService.getAll().subscribe(resp => {
              this.categories = resp.data;
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
