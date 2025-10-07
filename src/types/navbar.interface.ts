import { IUser } from "./user.interface";

export interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

export interface NavbarPropsWithUser {
  menu: MenuItem[];
  auth: {
    login: { title: string; url: string };
  };
  currentUser?: Partial<IUser> | null;
}
