"use client";

import {
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
import { Menu, User, X, LogOut, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "./Logo";
import { MenuItem, NavbarProps } from "@/types/navbar.interface";
import { useState, useEffect } from "react";
import { axiosInstance } from "@/app/utils/axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useAuth } from "@/provider/AuthProvider";

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
  const { user: currentUser, logout: clearAuth } = useAuth();

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  const handleLogout = async () => {
    try {
      const result = await axiosInstance.get("/auth/logout");
      if (result.data.success) {
        toast.success(<h1 className="text-center">{result.data.message}</h1>);
        clearAuth();
        router.push("/");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(<>{error.response.data.message}</> || "Failed to logout");
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
              {menu.map((item) => renderMenuItem(item, pathname))}
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
                    className="text-black flex items-center gap-2 hover:bg-accent transition-colors"
                  >
                    <User className="size-4" />
                    <span className="max-w-[150px] truncate">
                      {currentUser.name}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium leading-none">
                      {currentUser.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 truncate">
                      {currentUser.email}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link
                      href="/dashboard/profile"
                      className="flex items-center gap-2"
                    >
                      <LayoutDashboard className="size-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10 flex items-center gap-2"
                  >
                    <LogOut className="size-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Button asChild className="hover:scale-105 transition-transform">
              <Link href={auth.login.url}>{auth.login.title}</Link>
            </Button>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className="block lg:hidden">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className={`flex items-center gap-2 transition-opacity duration-300 ${
              isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <Logo />
          </Link>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="relative z-[60] hover:bg-accent transition-all duration-300 hover:scale-110 shadow-sm"
              >
                <Menu
                  className={`size-4 absolute transition-all duration-300 ${
                    isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                  }`}
                />
                <X
                  className={`size-4 absolute transition-all duration-300 ${
                    isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                  }`}
                />
              </Button>
            </SheetTrigger>
            <SheetContent
              className="overflow-y-auto w-full sm:w-[400px] p-0 border-l-0"
              side="right"
            >
              {/* Header with gradient */}
              <div className="sticky top-0 z-10 bg-gradient-to-b from-background to-background/95 backdrop-blur-sm border-b">
                <SheetHeader className="p-6 pb-4">
                  <SheetTitle className="text-left">
                    <Link
                      href="/"
                      className="flex items-center gap-2 text-2xl hover:opacity-80 transition-opacity"
                      onClick={() => setIsOpen(false)}
                    >
                      <Logo />
                    </Link>
                  </SheetTitle>
                </SheetHeader>
              </div>

              {/* Content */}
              <div className="flex flex-col h-[calc(100vh-100px)] p-6">
                {/* Navigation Menu */}
                <nav className="flex-1 overflow-y-auto -mx-2 px-2">
                  <div className="space-y-1">
                    {menu.map((item, index) => (
                      <div
                        key={item.title}
                        className="animate-in fade-in slide-in-from-right-4"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        {renderMobileMenuItem(item, setIsOpen, pathname)}
                      </div>
                    ))}
                  </div>
                </nav>

                {/* User/Auth Section at Bottom */}
                <div className="pt-6 border-t mt-6 space-y-3">
                  {currentUser ? (
                    <>
                      <Link
                        href="/dashboard/profile"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors group"
                      >
                        <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <User className="size-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {currentUser.name}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            View Profile
                          </p>
                        </div>
                        <LayoutDashboard className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                        <span>Dashboard</span>
                      </Link>

                      <Button
                        onClick={() => {
                          handleLogout();
                          setIsOpen(false);
                        }}
                        variant="outline"
                        className="w-full justify-center gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive border-destructive/20"
                      >
                        <LogOut className="size-4" />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <Button
                      asChild
                      className="w-full h-12 text-base shadow-md hover:shadow-lg transition-all"
                      onClick={() => setIsOpen(false)}
                    >
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

const renderMenuItem = (item: MenuItem, pathname: string) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger className="hover:bg-accent transition-colors data-[state=open]:bg-accent">
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className="w-80">
              <SubMenuLink item={subItem} pathname={pathname} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  const isActive = pathname === item.url;

  return (
    <NavigationMenuItem key={item.title}>
      <Link
        href={item.url}
        className={`bg-background hover:bg-accent hover:text-accent-foreground group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all relative ${
          isActive ? "text-primary bg-primary/5 font-semibold" : ""
        }`}
      >
        {item.title}
        {isActive && (
          <span className="absolute bottom-0 left-0 right-0 h-0.1 bg-primary rounded-full" />
        )}
      </Link>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (
  item: MenuItem,
  setIsOpen: (open: boolean) => void,
  pathname: string
) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-0">
        <AccordionTrigger className="text-base py-4 px-4 font-semibold hover:no-underline hover:bg-accent rounded-lg transition-all">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="pb-2 pt-1">
          <div className="flex flex-col gap-1 ml-2">
            {item.items.map((subItem) => (
              <div key={subItem.title} onClick={() => setIsOpen(false)}>
                <SubMenuLink item={subItem} mobile pathname={pathname} />
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  }

  const isActive = pathname === item.url;

  return (
    <Link
      key={item.title}
      href={item.url}
      className={`text-base font-semibold py-4 px-4 rounded-lg transition-all block group relative ${
        isActive ? "bg-primary/10 text-primary" : "hover:bg-accent"
      }`}
      onClick={() => setIsOpen(false)}
    >
      <span
        className={`inline-block transition-transform ${
          isActive ? "" : "group-hover:translate-x-1"
        }`}
      >
        {item.title}
      </span>
      {isActive && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full" />
      )}
    </Link>
  );
};

const SubMenuLink = ({
  item,
  mobile = false,
  pathname,
}: {
  item: MenuItem;
  mobile?: boolean;
  pathname: string;
}) => {
  const isActive = pathname === item.url;

  return (
    <Link
      href={item.url}
      className={`flex select-none gap-3 rounded-lg p-3 leading-none no-underline outline-none transition-all group ${
        mobile ? "min-w-0" : "min-w-80"
      } ${
        isActive
          ? "bg-primary/10 border-l-2 border-primary"
          : "hover:bg-accent/80 hover:translate-x-1"
      }`}
    >
      {item.icon && (
        <div
          className={`flex-shrink-0 transition-all ${
            isActive
              ? "text-primary scale-110"
              : "text-primary group-hover:scale-110"
          }`}
        >
          {item.icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div
          className={`text-sm font-semibold mb-1 transition-colors ${
            isActive ? "text-primary" : "group-hover:text-primary"
          }`}
        >
          {item.title}
        </div>
        {item.description && (
          <p className="text-muted-foreground text-xs leading-snug line-clamp-2">
            {item.description}
          </p>
        )}
      </div>
    </Link>
  );
};
