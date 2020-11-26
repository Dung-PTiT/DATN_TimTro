import {User} from "./user";

export class Comment {
  id: number;
  content: string;
  createTime: string;
  user: User;
}
