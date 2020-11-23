import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {
  faCalendarMinus,
  faDollarSign,
  faHeart,
  faImage,
  faMapMarkerAlt,
  faSearch
} from "@fortawesome/free-solid-svg-icons";
import {FormControl, FormGroup} from "@angular/forms";
import {PostService} from "../../../service/post.service";
import {Post} from "../../../model/post";
import {ImageService} from "../../../service/image.service";
import {AppConfig} from "../../../util/app-config";

@Component({
  selector: 'app-dashboard-client',
  templateUrl: './dashboard-client.component.html',
  styleUrls: ['./dashboard-client.component.css']
})
export class DashboardClientComponent implements OnInit {

  filteredOptions: Observable<string[]>;
  faSearch = faSearch;
  faImage = faImage;
  faHeart = faHeart;
  faDollarSign = faDollarSign;
  faMapMarkerAlt = faMapMarkerAlt;
  faCalendarMinus = faCalendarMinus;
  searchForm: FormGroup;
  markerInfo: MarkerInfo;
  posts: Array<Post>;

  PREFIX_URL = AppConfig.PREFIX_URL;
  CONTEXT_URL: string = "";
  DEFAULT_IMAGE: string = "./assets/images/user.jpg";

  constructor(private postService: PostService, private imageService: ImageService) {
    this.searchForm = new FormGroup({
      searchInp: new FormControl()
    });
    this.postService.getAll().subscribe(resp => {
      this.posts = resp.data;
    });
    this.PREFIX_URL = this.PREFIX_URL + this.CONTEXT_URL + "/image/get?imageUrl=";
  }

  ngOnInit() {
    this.markerInfo = new MarkerInfo(20.981149, 105.787480, "./assets/images/marker3.png", "abc");
  }

}

export class MarkerInfo {
  constructor(
    public latitude: number,
    public longitude: number,
    public icon: string,
    public address: string) {
  }
}
