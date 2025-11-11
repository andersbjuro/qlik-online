
import { type ComponentProps } from 'react';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from 'src/components/ui/sidebar';
import { NavUser } from './nav-user';
import SelectionsComponent from '../qlik/components/selection-component';
import { GalleryVerticalEndIcon } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <div className="p-1 items-center">
          <Link to="/" className="flex items-center gap-2">
            <GalleryVerticalEndIcon className="h-6 w-6 text-primary" />
            <span className="text-sm font-bold">FORBA</span>
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SelectionsComponent />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
