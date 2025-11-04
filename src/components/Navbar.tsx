// import { SignoutButton } from "@/components/auth/signout-button";
// import { ThemeToggle } from "@/components/theme-toggle";
// import { buttonVariants } from "@/components/ui/button";
// import { auth } from "@/lib/auth";
import { Link } from "@tanstack/react-router";
import { GalleryVerticalEndIcon, LogOutIcon } from "lucide-react";

export default function Navbar() {

  const navItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Admin", href: "/admin" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex min-h-14 items-center px-4 py-4 gap-10">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <GalleryVerticalEndIcon className="size-5" />
          </div>
          <span className="text-sm font-bold">Forba Systems</span>
        </Link>
        <nav className="flex flex-1 items-center justify-between">
          {/* {session && session.user ? ( */}
            <div className="flex items-center space-x-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  {item.name}
                </Link>
              ))}
            </div>

          {/* <div className="flex items-center gap-4">
            <ThemeToggle />
            {session && session.user ? (
              <SignoutButton>
                <LogOutIcon className="size-4" />
                <p className="text-sm">Logga ut</p>
              </SignoutButton>
            )
              : (

                   <Link href="/sign-in" className={buttonVariants()} >
              Logga in
            </Link>

              )}
          </div> */}
        </nav>
      </div>
    </header>
  );
}
