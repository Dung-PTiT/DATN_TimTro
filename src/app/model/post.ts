import {Image} from "./image";
import {Category} from "./category";
import {Tag} from "./tag";
import {User} from "./user";
import {Favorite} from "./favorite";
import {Ward} from "./address/Ward";
import {District} from "./address/District";
import {Provinces} from "./address/Provinces";

export class Post {
  id: number;
  title: string;
  content: string;
  price: number;
  acreage: number;
  view: number;
  address: string;
  status: string;
  latitude: number;
  longitude: number;
  createTime: string;
  phoneNumber: string;
  images: Array<Image>;
  category: Category;
  tags: Array<Tag>;
  user: User;
  comments: Array<Comment>;
  favorites: Array<Favorite>;
  ward: Ward;
  district: District;
  province: Provinces;
  // private PostVip postVip;
}
