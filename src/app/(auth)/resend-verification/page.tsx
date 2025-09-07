import { Suspense } from "react";
import ResendVerificationForm from "./_components/resend.verification";
import SuspenseLoader from "@/components/shared/suspense-loader/suspense.loader";

export default function Page() {
  return (
    <div>
      <Suspense fallback={<SuspenseLoader />}>
        <ResendVerificationForm />
      </Suspense>
    </div>
  );
}
