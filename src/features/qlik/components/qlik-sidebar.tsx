import { Sidebar, SidebarContent, SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from 'src/components/ui/sidebar'
import { Link } from '@tanstack/react-router'
import { GalleryVerticalEndIcon } from 'lucide-react'
import SelectionsComponent from './selection-component'
import { NavUser } from 'src/features/app/nav-user'
import { authClient } from 'src/features/auth/lib/auth-client'

export default function QlikSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = authClient.useSession();
  const userData = session?.user
    ? {
      name: session.user.name || session.user.email,
      email: session.user.email,
      avatar: session.user.image || '/placeholder-user.jpg',
    }
    : undefined;

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <div className="flex h-14 w-full items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <GalleryVerticalEndIcon className="h-6 w-6 text-primary" />
          <span className="text-sm font-bold">Forba Systems</span>
        </Link>
      </div>
      {/* <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" asChild className="focus-visible:ring-0 focus-visible:ring-offset-0">
            <Link to="/" className="flex items-center gap-2">
              <GalleryVerticalEndIcon className="h-6 w-6 text-primary" />
              <span className="text-sm font-bold">Forba Systems</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu> */}
      <SidebarContent className='mt-5'>
        <SelectionsComponent />
      </SidebarContent>
      <SidebarFooter>{userData && <NavUser user={userData} />}</SidebarFooter>
    </Sidebar>
  )
}
