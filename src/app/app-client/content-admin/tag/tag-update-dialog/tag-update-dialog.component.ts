import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TagService} from "../../../../service/tag.service";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {Tag} from "../../../../model/tag";

@Component({
  selector: 'app-tag-update-dialog',
  templateUrl: './tag-update-dialog.component.html',
  styleUrls: ['./tag-update-dialog.component.css']
})
export class TagUpdateDialogComponent implements OnInit {

  submitted = false;
  tagForm: FormGroup;
  tag: Tag;

  constructor(public dialogRef: MatDialogRef<TagUpdateDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder,
              private tagService: TagService) {
    this.tagForm = this.formBuilder.group(
      {
        name: [data.name, Validators.required],
        description: [data.description, Validators.required]
      });
    this.tag = data;
  }

  ngOnInit(): void {
  }

  updateTag() {
    this.submitted = true;

    if (this.tagForm.invalid) {
      return;
    }

    this.tag.name = this.tagForm.controls.name.value;
    this.tag.description = this.tagForm.controls.description.value;

    this.tagService.update(this.tag).subscribe(resp => {
      this.dialogRef.close(resp.success);
    });
  }

  get validator() {
    return this.tagForm.controls;
  }

  close() {
    this.dialogRef.close("none");
  }

  faTimes = faTimes;
}
