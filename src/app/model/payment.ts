import {Post} from "./post";
import {User} from "./user";
import {PostVip} from "./postVip";

export class Payment {
  id: number;
  price: number;
  startDate: Date;
  endDate: Date;
  description: string;
  status: boolean;
  post: Post;
  user: User;
  postVip: PostVip;
}
