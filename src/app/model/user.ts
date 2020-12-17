import {Role} from "../util/role";
import {Wallet} from "./wallet";

export class User {
  id: number;
  username: string;
  name: string;
  imageUrl: string;
  email: string;
  isActived: boolean;
  phoneNumber: string;
  authProvider: string;
  role: Role;
  createTime: string;
  wallet: Wallet;
}

