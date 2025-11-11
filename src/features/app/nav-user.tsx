import { useRouter } from "@tanstack/react-router";
import { BadgeCheckIcon, ChevronsUpDown, LogOutIcon, ShieldIcon, User2Icon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "src/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "src/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "src/components/ui/sidebar";
import { authClient, useAuthenticatedUser, useAuthentication } from "src/features/auth/lib/auth-client";
import { useQueryClient } from "@tanstack/react-query";
import { canManageUsers, type UserRole } from 'src/features/auth/lib/permissions';

export function NavUser() {
  const {userSession} = useAuthentication()
  if (!userSession) return null;
  const queryClient = useQueryClient()
  const router = useRouter();
  const isAdmin = (userSession.user.role as UserRole) && canManageUsers(userSession.user.role as UserRole);

  const handleLogout = async () => {
    await authClient.signOut()
    await queryClient.invalidateQueries()
    router.invalidate()
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                {userSession.user.image && <AvatarImage src={userSession.user.image} alt={userSession.user.name} />}
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{userSession.user.name}</span>
                <span className="truncate text-xs">{userSession.user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  {userSession.user.image && <AvatarImage src={userSession.user.image} alt={userSession.user.name} />}
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{userSession.user.name}</span>
                  <span className="truncate text-xs">{userSession.user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => router.navigate({ to: "/dashboard/settings" })}>
                <BadgeCheckIcon />
                Inställningar
              </DropdownMenuItem>
              {isAdmin && (
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => router.navigate({ to: "/admin" })}>
                    <ShieldIcon />
                    Admin
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.navigate({ to: "/admin/users" })}>
                    <User2Icon />
                    Användare
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              )}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleLogout()}>
              <LogOutIcon />
              Logga ut
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
