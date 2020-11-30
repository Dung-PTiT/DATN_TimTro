import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {
  faCalendarMinus, faDollarSign, faImage, faMapMarkerAlt, faSearch
} from "@fortawesome/free-solid-svg-icons";
import {faHeart as faHeartRegular} from "@fortawesome/free-regular-svg-icons";
import {faHeart as faHeartSolid} from "@fortawesome/free-solid-svg-icons";
import {FormControl, FormGroup} from "@angular/forms";
import {PostService} from "../../../service/post.service";
import {Post} from "../../../model/post";
import {ImageService} from "../../../service/image.service";
import {AppConfig} from "../../../util/app-config";
import {AuthenticationService} from "../../../service/authentication.service";
import {FavoriteService} from "../../../service/favorite.service";
import {User} from "../../../model/user";
import {Favorite} from "../../../model/favorite";
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard-client',
  templateUrl: './dashboard-client.component.html',
  styleUrls: ['./dashboard-client.component.css']
})
export class DashboardClientComponent implements OnInit {

  filteredOptions: Observable<string[]>;
  faSearch = faSearch;
  faImage = faImage;
  faHeartRegular = faHeartRegular;
  faHeartSolid = faHeartSolid;
  faDollarSign = faDollarSign;
  faMapMarkerAlt = faMapMarkerAlt;
  faCalendarMinus = faCalendarMinus;
  searchForm: FormGroup;
  markerInfo: MarkerInfo;
  posts: Array<Post>;
  user: User;
  favorites: Array<Favorite>;
  postIdFavorites: Number[] = [];

  PREFIX_URL = AppConfig.PREFIX_URL;
  CONTEXT_URL: string = "";
  DEFAULT_IMAGE: string = "./assets/images/logo3.png";

  constructor(private postService: PostService,
              private imageService: ImageService,
              private authenticationService: AuthenticationService,
              private favoriteService: FavoriteService) {
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

    if (this.authenticationService.checkLogin()) {
      this.authenticationService.getCurrentUser().subscribe(resp => {
        this.user = resp.data as User;
        this.favoriteService.getFavoriteByUserId(this.user.id).subscribe(resp => {
          this.favorites = resp.data;
          if (this.favorites.length != 0) {
            for (let i = 0; i < this.favorites.length; i++) {
              this.postIdFavorites.push(this.favorites[i].post.id);
            }
          }
        });
      });
    }
  }

  createFavorite(postId: any) {
    this.postIdFavorites = [];
    if (this.authenticationService.checkLogin()) {
      this.favoriteService.createFavorite(postId).subscribe(resp => {
        this.favoriteService.getFavoriteByUserId(this.user.id).subscribe(resp => {
          this.favorites = resp.data;
          if (this.favorites.length != 0) {
            for (let i = 0; i < this.favorites.length; i++) {
              this.postIdFavorites.push(this.favorites[i].post.id);
            }
          }
        });
      });
    } else {
      location.replace('/login');
    }
  }

  timespan(time: Date) {
    return moment(time).startOf("second").fromNow();
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
