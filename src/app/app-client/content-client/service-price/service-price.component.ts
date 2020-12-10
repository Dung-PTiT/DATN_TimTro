import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PostVipService} from "../../../service/post-vip.service";
import {PostVip} from "../../../model/postVip";
import {faArrowAltCircleRight} from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: 'app-service-price',
  templateUrl: './service-price.component.html',
  styleUrls: ['./service-price.component.css']
})
export class ServicePriceComponent implements OnInit {

  postVips: Array<PostVip>;
  displayedColumn: string[] = [];

  constructor(private postVipService: PostVipService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.displayedColumn = [
      'number', 'name', 'dayPrice', 'weekPrice', 'monthPrice', 'action'
    ];

    this.postVipService.getAll().subscribe(resp => {
      this.postVips = resp.data;
    });
  }

  faArrowAltCircleRight = faArrowAltCircleRight;
}
