import { Link, useRouter } from "@tanstack/react-router";
import { GalleryVerticalEndIcon, LogOutIcon } from "lucide-react";
import { SignedIn } from "src/features/auth/client/components/signed-in";
import { SignedOut } from "src/features/auth/client/components/signed-out";
import UserMenu from "src/features/auth/client/components/user-menu";
import { ButtonLink } from "./button-link";
import { authClient } from "~/features/auth/lib/auth-client";
import { useQueryClient } from "@tanstack/react-query"
import { Button } from "./ui/button";

export const Header = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const handleLogout = async () => {
    await authClient.signOut()
    await queryClient.invalidateQueries()
    router.invalidate()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 w-full items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <GalleryVerticalEndIcon className="h-6 w-6 text-primary" />
          <span className="text-sm font-bold">Forba Systems</span>
        </Link>
        <nav className="hidden items-center justify-center md:flex">
          <div className="flex items-center">
            <SignedIn>
              <Button
                onClick={handleLogout}
              >
                Logga ut
              </Button>
            </SignedIn>
            <SignedOut>
              <ButtonLink
                to="/sign-in"
                search={{ redirectTo: router.state.location.href }}
              >
                Logga in
              </ButtonLink>
            </SignedOut>
          </div>
        </nav>
      </div>
    </header>
  );
}
