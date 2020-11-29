import {Component, NgZone, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {MarkerInfo} from "../dashboard-client/dashboard-client.component";
import {
  faAlignRight, faBuilding, faCalendarAlt, faComment, faEnvelope,
  faHandPointRight, faImages, faMapMarkedAlt, faMapMarkerAlt,
  faPaperPlane, faPencilAlt, faPhone, faReply, faShare, faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import {faHeart as faHeartRegular} from "@fortawesome/free-regular-svg-icons";
import {faHeart as faHeartSolid} from "@fortawesome/free-solid-svg-icons";
import {PostService} from "../../../service/post.service";
import {AppConfig} from "../../../util/app-config";
import {Post} from "../../../model/post";
import {Image} from "../../../model/image";
import {MapsAPILoader} from "@agm/core";
import {AuthenticationService} from "../../../service/authentication.service";
import {FormControl} from "@angular/forms";
import {CommentService} from "../../../service/comment.service";
import * as moment from 'moment';
import {User} from "../../../model/user";
import {FavoriteService} from "../../../service/favorite.service";
import {Favorite} from "../../../model/favorite";

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  id: number;
  markerInfo: MarkerInfo;
  post: Post;
  images: Array<Image>;
  comments: Array<Comment>;
  favotites: Array<Favorite>;
  markerAddress: string = "./assets/images/marker3.png";
  zoom: number;
  latitude: number;
  longitude: number;
  address: string;
  user: User;
  favoriteStatus: boolean = false;
  favoriteCreateTime: string;

  private geoCoder;
  public origin: any;
  public destination: any;

  PREFIX_URL = AppConfig.PREFIX_URL;
  CONTEXT_URL: string = "";
  DEFAULT_IMAGE: string = "./assets/images/logo3.png";

  commentCtrl: FormControl = new FormControl();

  // @ViewChild('search')
  // public searchElementRef: ElementRef;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private postService: PostService,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone,
              private authenticationService: AuthenticationService,
              private commentService: CommentService,
              private favoriteService: FavoriteService) {
    this.PREFIX_URL = this.PREFIX_URL + this.CONTEXT_URL + "/image/get?imageUrl=";
  }

  ngOnInit(): void {
    if (this.authenticationService.checkLogin()) {
      this.authenticationService.getCurrentUser().subscribe(resp => {
        this.user = resp.data;
      });
    }
    this.zoom = 13;
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.postService.getPostById(this.id).subscribe(resp => {
        this.post = resp.data;
        this.images = this.post.images;
        this.favotites = this.post.favorites;
        this.checkStatusFavorite(this.favotites);
        this.getCommentByPostId(this.post.id);
        this.setCurrentLocation(this.post);
      });
      // this.setCurrentLocation(this.post);
    });
  }

  public renderOptions = {
    suppressMarkers: true,
  };

  public markerOptions = {
    origin: {
      icon: './assets/images/location1.png',
    }
  };

  scrollToElement($element): void {
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  // Get Current Location Coordinates
  private setCurrentLocation(post) {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
        this.origin = {lat: this.latitude, lng: this.longitude};
        this.destination = {lat: post.latitude, lng: post.longitude};
        // this.getAddress(this.latitude, this.longitude);
      });
    }
  }

  // getAddress(latitude, longitude) {
  //   this.geoCoder.geocode({'location': {lat: latitude, lng: longitude}}, (results, status) => {
  //     console.log(results);
  //     if (status === 'OK') {
  //       if (results[0]) {
  //         this.zoom = 12;
  //         this.address = results[0].formatted_address;
  //       } else {
  //         window.alert('No results found');
  //       }
  //     } else {
  //       window.alert('Geocoder failed due to: ' + status);
  //     }
  //
  //   });
  // }

  createComment() {
    if (this.authenticationService.checkLogin()) {
      this.commentService.createComment(this.commentCtrl.value, this.post.id).subscribe(resp => {
        this.commentService.getCommentByPostId(this.post.id).subscribe(resp => {
          this.comments = resp.data;
          this.commentCtrl.setValue('');
        });
      });
    }
  }

  deleteComment(commentId) {
    if (this.authenticationService.checkLogin()) {
      this.commentService.deleteComment(commentId).subscribe(resp => {
        this.commentService.getCommentByPostId(this.post.id).subscribe(resp => {
          this.comments = resp.data;
        });
      });
    }
  }

  getCommentByPostId(postId) {
    this.commentService.getCommentByPostId(postId).subscribe(resp => {
      this.comments = resp.data;
    });
  }

  createFavorite() {
    if (this.authenticationService.checkLogin()) {
      this.favoriteService.createFavorite(this.post.id).subscribe(resp => {
        if (resp.data == true) {
          this.favoriteStatus = true;
        } else if (resp.data == false) {
          this.favoriteStatus = false;
        }
      });
    } else {
      location.replace('/login');
    }
  }

  checkStatusFavorite(thisFavotites) {
    if (thisFavotites.length == 0) {
      this.favoriteStatus = false;
    }
    for (let i = 0; i < thisFavotites.length; i++) {
      if (thisFavotites[i].user.id == this.user.id) {
        this.favoriteStatus = true;
        this.favoriteCreateTime = thisFavotites[i].createTime;
      }
    }
  }

  timespan(time: Date) {
    return moment(time).startOf("second").fromNow();
  }

  checkLogin() {
    return this.authenticationService.checkLogin();
  }

  faShare = faShare;
  faHeartRegular = faHeartRegular;
  faHeartSolid = faHeartSolid;
  faImages = faImages;
  faAlignRight = faAlignRight;
  faHandPointRight = faHandPointRight;
  faPhone = faPhone;
  faMapMarkedAlt = faMapMarkedAlt;
  faMapMarkerAlt = faMapMarkerAlt;
  faEnvelope = faEnvelope;
  faBuilding = faBuilding;
  faComment = faComment;
  faPaperPlane = faPaperPlane;
  faCalenderAlt = faCalendarAlt;
  faReply = faReply;
  faPencilAlt = faPencilAlt;
  faTrashAlt = faTrashAlt;
}


