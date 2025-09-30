"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Menu, User } from "lucide-react";
import Link from "next/link";
import { Logo } from "./Logo";
import { MenuItem, NavbarProps } from "@/types/navbar.interface";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/app/utils/axios";
import { IUser } from "@/types/user.interface";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export default function Navbar({
  menu = [
    { title: "Home", url: "/" },
    {
      title: "About Me",
      url: "/about",
    },
    {
      title: "My Projects",
      url: "/projects",
    },
    {
      title: "Blogs",
      url: "/blogs",
    },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
  },
}: NavbarProps) {
  const [currentUser, setCurrentUser] = useState<Partial<IUser | null>>(null);

  useEffect(() => {
    const userInfo = localStorage.getItem("currentUser");
    if (userInfo) {
      setCurrentUser(JSON.parse(userInfo));
    }
  }, []);

  const handleLogout = async () => {
    const result = await axiosInstance.get("/auth/logout");
    if (result.data.success) {
      toast.success("Logged out successfully");
      setCurrentUser(null);
      localStorage.removeItem("currentUser");
    }
  };

  return (
    <section className="w-full mx-auto container p-4">
      {/* Desktop Menu */}
      <nav className="hidden justify-between lg:flex">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
        </Link>
        <div className="flex items-center">
          <NavigationMenu>
            <NavigationMenuList>
              {menu.map((item) => renderMenuItem(item))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div>
          {currentUser ? (
            <div className="flex items-center gap-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="text-black flex items-center gap-2"
                  >
                    <User />
                    {currentUser.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm text-muted-foreground">
                      {currentUser.email}
                    </p>
                  </div>
                  <DropdownMenuItem asChild>
                    <Button onClick={handleLogout} className="w-full text-left">
                      Logout
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Button asChild>
              <Link href={auth.login.url}>{auth.login.title}</Link>
            </Button>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className="block lg:hidden">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Logo />
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>
                  <Link href="/" className="flex items-center gap-2 text-3xl">
                    <Logo />
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 p-4">
                <Accordion
                  type="single"
                  collapsible
                  className="flex w-full flex-col gap-4"
                >
                  {menu.map((item) => renderMobileMenuItem(item))}
                </Accordion>

                <div className="flex flex-col gap-3">
                  {currentUser ? (
                    <div>
                      <p className="text-black">{currentUser.name}</p>
                      <Button onClick={handleLogout} className="mt-3 w-full">
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <Button asChild>
                      <Link href={auth.login.url}>{auth.login.title}</Link>
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </section>
  );
}

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className="w-80">
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <Link
        href={item.url}
        className="bg-background hover:bg-muted hover:text-accent-foreground group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors"
      >
        {item.title}
      </Link>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Link key={item.title} href={item.url} className="text-md font-semibold">
      {item.title}
    </Link>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <Link
      href={item.url}
      className="hover:bg-muted hover:text-accent-foreground flex min-w-80 select-none flex-row gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors"
    >
      <div className="text-foreground">{item.icon}</div>
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-muted-foreground text-sm leading-snug">
            {item.description}
          </p>
        )}
      </div>
    </Link>
  );
};
