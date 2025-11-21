import { useLocation } from "@tanstack/react-router";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "src/components/ui/breadcrumb"
import { Separator } from "src/components/ui/separator"
import { SidebarTrigger } from "src/components/ui/sidebar"
import React from "react"
import AddSelectionDialog from "./add-selection-dialog";
import OrderSelectionsDialog from "./order-selections-dialog";

export default function QlikHeader() {
  const location = useLocation();
  const pathname = location.pathname;
  const segments = pathname.split("/").filter(Boolean);

  return (
    <header className="flex h-12 shrink-0 items-center justify-between gap-2 ">
        <div className="flex gap-2 items-center">
          <SidebarTrigger className="" />
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
        </div>
        <div className="flex gap-2 items-center mr-5">
            <OrderSelectionsDialog />
            <AddSelectionDialog />
        </div>
    </header>
  )
}
