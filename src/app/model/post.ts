import {Image} from "./image";
import {Category} from "./category";
import {Tag} from "./tag";
import {User} from "./user";

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
  images: Array<Image>;
  category: Category;
  tags: Array<Tag>;
  user: User;
  comments: Array<Comment>;
  // private Integer wardId;
  // private PostVip postVip;
}
