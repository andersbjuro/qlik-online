import { ApplicationCard } from "./application-card";
import { qlikItemsQueryOptions } from "~/services/qlik";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function ApplicationList() {
  const {data : items} = useSuspenseQuery(qlikItemsQueryOptions())
  //const session = useSession();
  //if (!session.data?.user?.onboardingComplete) redirect("/onboarding");

  return (
    <div>
      <main>
        <h1 className="text-xl font-medium mb-3 pl-3">Katalog</h1>
        <div className="container mx-auto px-4 ">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {items && items
              .slice() // avoid mutating original array
              .sort((a, b) => a.spaceId.localeCompare(b.spaceId)).map((item) => (
                <ApplicationCard key={item.resourceId} item={item} />
              ))}
            {items?.length === 0 && <div className="flex justify-center items-center col-span-3">
              <div className="text-xl font-semibold">Inga publiserade applikationer</div>
            </div>
            }
          </div>
        </div>
      </main>
    </div>
  );
}
