import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TagService} from "../../../../service/tag.service";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-tag-create-dialog',
  templateUrl: './tag-create-dialog.component.html',
  styleUrls: ['./tag-create-dialog.component.css']
})
export class TagCreateDialogComponent implements OnInit {

  submitted = false;
  tagForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<TagCreateDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder,
              private tagService: TagService) {
  }

  ngOnInit(): void {
    this.tagForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        description: ['', Validators.required]
      });
  }

  createTag() {
    this.submitted = true;

    if (this.tagForm.invalid) {
      return;
    }

    this.tagService.create(this.tagForm.controls.name.value, this.tagForm.controls.description.value).subscribe(
      resp => {
        this.dialogRef.close(resp.success);
      }
    );
  }

  get validator() {
    return this.tagForm.controls;
  }

  close() {
    this.dialogRef.close("none");
  }

  faTimes = faTimes;
}
