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
import {PostService} from "../../../service/post.service";
import {AppConfig} from "../../../util/app-config";
import {Post} from "../../../model/post";
import {Image} from "../../../model/image";

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

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
  post: Post;
  images: Array<Image>;
  markerAddress: string = "./assets/images/marker3.png";

  PREFIX_URL = AppConfig.PREFIX_URL;
  CONTEXT_URL: string;
  DEFAULT_IMAGE: string = "logo3.png";

  constructor(private router: Router,
              private route: ActivatedRoute,
              private postService: PostService) {
    this.CONTEXT_URL = "";
    this.PREFIX_URL = this.PREFIX_URL + this.CONTEXT_URL + "/image/get?imageUrl=";
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.postService.getPostById(this.id).subscribe(resp => {
        this.post = resp.data;
        this.images = this.post.images;
      });
    });
  }

  scrollToElement($element): void {
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }
}


