import {Image} from "./image";
import {Category} from "./Category";
import {Tag} from "./tag";

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
  // private User user;
  // private Integer wardId;
  // private List<Comment> comments;
  // private PostVip postVip;
  // private List<Tag> tags;
  // private MultipartFile[] files;
}
