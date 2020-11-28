import {User} from "./user";
import {Post} from "./post";

export class Favorite {
  id: number;
  createTime: string;
  user: User;
  post: Post;
}
