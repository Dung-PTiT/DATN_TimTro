import { Component, OnInit } from '@angular/core';
import {faHeart, faUpload} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  constructor() { }

  faUpload = faUpload;

  ngOnInit(): void {
  }

}
