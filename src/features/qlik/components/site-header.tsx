
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "~/components/ui/breadcrumb"
import { buttonVariants } from "~/components/ui/button"
import { Separator } from "~/components/ui/separator"
import { SidebarTrigger } from "~/components/ui/sidebar"
//import kyInstance from "@/lib/ky"
//import { QlikItem } from "@/types/qlik"
//import { useQuery } from "@tanstack/react-query"
//import { ArrowLeft } from "lucide-react"


export default function SiteHeader() {
  // const params = useParams()
  // const pathname = usePathname();
  // const segments = pathname.split("/").filter(Boolean);

  // const { data: items } = useQuery<QlikItem[]>({
  //   queryKey: ["qlikitems"],
  //   queryFn: () => kyInstance.get(`/api/qlik/items`).json<QlikItem[]>(),
  // });

  //const app = items?.find((item) => item.resourceId === params.app)

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className=" data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            {/* {segments.map((segment, index) => (
              <React.Fragment key={segment}>
                <BreadcrumbItem>
                  {index === 0 &&
                    <BreadcrumbLink href="/qlik">
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
            ))} */}
          </BreadcrumbList>
        </Breadcrumb>
        {/* {app &&

        <Link className={buttonVariants({variant: "link"})} href="/qlik"><ArrowLeft size="4" /> tillbaka</Link>} */}
      </div>
    </header>
  )
}
