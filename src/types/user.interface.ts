import { IBlog } from "./blog.interface";

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  blog: IBlog[];
  createdAt: Date;
  updatedAt: Date;
}
