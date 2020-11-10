import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {MarkerInfo} from "../dashboard-client/dashboard-client.component";
import {
  faAlignRight, faHandPointRight,
  faHeart,
  faImages,
  faMapMarkedAlt,
  faMapMarkerAlt, faPhone,
  faShare
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  id: number;
  markerInfo: MarkerInfo;
  faShare = faShare;
  faHeart = faHeart;
  faImages = faImages;
  faAlignRight = faAlignRight;
  faHandPointRight = faHandPointRight;
  faPhone = faPhone;
  faMapMarkedAlt = faMapMarkedAlt;
  faMapMarkerAlt = faMapMarkerAlt;
  markerInfoList: Array<MarkerInfo> = new Array<MarkerInfo>();

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    this.markerInfo = new MarkerInfo(20.981149, 105.787480, "./assets/images/marker3.png", "Nhà 74, ngõ 159 Phùng Khoang, Nam Từ Liêm, Hà Nội");
    let marker = new MarkerInfo(20.981149, 105.787480, "./assets/images/marker3.png", "Nhà 74, ngõ 159 Phùng Khoang, Nam Từ Liêm, Hà Nội");
    let marker1 = new MarkerInfo(21.23452, 106, "./assets/images/marker3.png", "Số 122 Hoàng Quốc Việt, Cầu Giấy, Hà Nội");
    this.markerInfoList.push(marker);
    this.markerInfoList.push(marker1);
  }

  scrollToElement($element): void {
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }
}


