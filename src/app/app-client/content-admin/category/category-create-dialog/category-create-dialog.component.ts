import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../../../service/category.service";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-category-create-dialog',
  templateUrl: './category-create-dialog.component.html',
  styleUrls: ['./category-create-dialog.component.css']
})
export class CategoryCreateDialogComponent implements OnInit {

  submitted = false;
  categoryForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<CategoryCreateDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder,
              private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        description: ['', Validators.required]
      });
  }

  createCategory() {
    this.submitted = true;

    if (this.categoryForm.invalid) {
      return;
    }

    this.categoryService.create(this.categoryForm.controls.name.value, this.categoryForm.controls.description.value).subscribe(
      resp => {
        this.dialogRef.close(resp.success);
      }
    );
  }

  get validator() {
    return this.categoryForm.controls;
  }

  close() {
    this.dialogRef.close("none");
  }

  faTimes = faTimes;
}
