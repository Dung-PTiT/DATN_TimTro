import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {MarkerInfo} from "../dashboard-client/dashboard-client.component";
import {
  faAlignRight, faBuilding, faComment, faEnvelope, faHandPointRight,
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
import {MapsAPILoader} from "@agm/core";

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  faShare = faShare;
  faHeart = faHeart;
  faImages = faImages;
  faAlignRight = faAlignRight;
  faHandPointRight = faHandPointRight;
  faPhone = faPhone;
  faMapMarkedAlt = faMapMarkedAlt;
  faMapMarkerAlt = faMapMarkerAlt;
  faEnvelope = faEnvelope;
  faBuilding = faBuilding;
  faComment = faComment;

  id: number;
  markerInfo: MarkerInfo;
  post: Post;
  images: Array<Image>;
  markerAddress: string = "./assets/images/marker3.png";
  zoom: number;
  latitude: number;
  longitude: number;
  address: string;
  private geoCoder;

  public origin: any;
  public destination: any;

  PREFIX_URL = AppConfig.PREFIX_URL;
  CONTEXT_URL: string = "";
  DEFAULT_IMAGE: string = "./assets/images/user.jpg";

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private postService: PostService,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone) {
    this.PREFIX_URL = this.PREFIX_URL + this.CONTEXT_URL + "/image/get?imageUrl=";
  }

  ngOnInit(): void {
    this.zoom = 13;

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.postService.getPostById(this.id).subscribe(resp => {
        this.post = resp.data;
        this.images = this.post.images;
        this.origin = {lat: 21.04680262648055, lng: 105.79224315416015};
        this.destination = {lat: this.post.latitude, lng: this.post.longitude};
      });
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
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }


  markerDragEnd(event) {
    console.log(event);
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({'location': {lat: latitude, lng: longitude}}, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }
}


