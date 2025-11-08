import { Sidebar, SidebarContent, SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from 'src/components/ui/sidebar'
import { Link } from '@tanstack/react-router'
import { GalleryVerticalEndIcon, Shield, Users } from 'lucide-react'
import SelectionsComponent from './selection-component'
import { NavUser } from 'src/features/auth/client/components/nav-user'
import { authClient } from 'src/features/auth/lib/auth-client'
import { NavItems } from './nav-items'

export default function QlikSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  //const { data: session } = authClient.useSession();


  // Admin navigation items - only show if user has admin permissions
  //const adminItems = canManageUsers(currentUserRole)
  const adminItems = [
    {
      name: 'Admin Dashboard',
      url: '/admin',
      icon: Shield,
    },
    {
      name: 'User Management',
      url: '/admin/users',
      icon: Users,
    },
  ]

  const allNavigationItems = [...adminItems];

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <div className="flex h-14 w-full items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <GalleryVerticalEndIcon className="h-6 w-6 text-primary" />
          <span className="text-sm font-bold">Forba Systems</span>
        </Link>
      </div>
      <SidebarContent >
        <SelectionsComponent />
      </SidebarContent>
      <SidebarFooter>
        <NavItems items={allNavigationItems} label="" />
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
