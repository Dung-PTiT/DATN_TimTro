import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-header-client',
  templateUrl: './header-client.component.html',
  styleUrls: ['./header-client.component.css']
})
export class HeaderClientComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }
}
