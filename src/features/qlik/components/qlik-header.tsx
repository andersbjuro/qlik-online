import { useLocation } from "@tanstack/react-router";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "src/components/ui/breadcrumb"
import { Separator } from "src/components/ui/separator"
import { SidebarTrigger } from "src/components/ui/sidebar"
import React from "react"
import AddSelectionDialog from "./add-selection-dialog";

export default function QlikHeader() {
  const location = useLocation();
  const pathname = location.pathname;
  const segments = pathname.split("/").filter(Boolean);

  return (
    <header className="flex h-12 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="data-[orientation=vertical]:h-5 mr-1"
        />
        <Breadcrumb>
          <BreadcrumbList>
            {segments.map((segment, index) => (
              <React.Fragment key={segment}>
                <BreadcrumbItem>
                  {index === 0 &&
                    <BreadcrumbLink href="/dashboard">
                      {segment.charAt(0).toUpperCase() + segment.slice(1)}
                    </BreadcrumbLink>
                  }
                  {index > 0 &&
                    <BreadcrumbLink>
                      {segment.charAt(0).toUpperCase() + segment.slice(1)}
                    </BreadcrumbLink>
                  }
                </BreadcrumbItem>
                {index < segments.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
        <div className="ml-auto">
          <AddSelectionDialog />
        </div>

      </div>
    </header>
  )
}
