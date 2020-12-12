import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Category} from "../../../../model/category";
import {CategoryService} from "../../../../service/category.service";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-category-update-dialog',
  templateUrl: './category-update-dialog.component.html',
  styleUrls: ['./category-update-dialog.component.css']
})
export class CategoryUpdateDialogComponent implements OnInit {

  submitted = false;
  categoryForm: FormGroup;
  category: Category;

  constructor(public dialogRef: MatDialogRef<CategoryUpdateDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder,
              private categoryService: CategoryService) {
    this.categoryForm = this.formBuilder.group(
      {
        name: [data.name, Validators.required],
        description: [data.description, Validators.required]
      });
    this.category = data;
  }

  ngOnInit(): void {
  }

  updateCategory() {
    this.submitted = true;

    if (this.categoryForm.invalid) {
      return;
    }

    this.category.name = this.categoryForm.controls.name.value;
    this.category.description = this.categoryForm.controls.description.value;

    this.categoryService.update(this.category).subscribe(resp => {
      this.dialogRef.close(resp.success);
    });
  }

  get validator() {
    return this.categoryForm.controls;
  }

  close() {
    this.dialogRef.close("none");
  }

  faTimes = faTimes;
}
