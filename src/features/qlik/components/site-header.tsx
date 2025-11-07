import { useLocation } from "@tanstack/react-router";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "src/components/ui/breadcrumb"
import { Separator } from "src/components/ui/separator"
import { SidebarTrigger } from "src/components/ui/sidebar"

export default function SiteHeader() {
  const location = useLocation();
  const pathname = location.pathname;
  const paths = pathname.split('/');
  const breadcrumb = paths.map((path) => {
    return {
      label: path,
      href: `/${path}`,
    };
  });

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className=" data-[orientation=vertical]:h-4"
        />
        {/* <Breadcrumb>
          <BreadcrumbList>
            {breadcrumb.map((item, index) => (
              <BreadcrumbItem className="hidden md:block" key={index}>
                <BreadcrumbLink className="flex items-center gap-2 text-sm capitalize" href={item.href}>
                  {item.label}
                  {index < breadcrumb.length - 1 && index !== 0 && (
                    <BreadcrumbSeparator className="hidden md:block" />
                  )}
                </BreadcrumbLink>
              </BreadcrumbItem>
            ))}
          </BreadcrumbList>
        </Breadcrumb> */}
      </div>
    </header>
  )
}
