import { Suspense } from "react";
import ExploreEventsPage from "./_components/explore.events";
import SuspenseLoader from "@/components/shared/suspense-loader/suspense.loader";

export default function page() {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <ExploreEventsPage />
    </Suspense>
  );
}
