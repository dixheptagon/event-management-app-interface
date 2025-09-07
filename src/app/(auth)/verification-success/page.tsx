import { Suspense } from "react";
import VerifyEmailPage from "./_components/verification.succes";
import SuspenseLoader from "@/components/shared/suspense-loader/suspense.loader";

export default function Page() {
  return (
    <div>
      <Suspense fallback={<SuspenseLoader />}>
        <VerifyEmailPage />
      </Suspense>
    </div>
  );
}
