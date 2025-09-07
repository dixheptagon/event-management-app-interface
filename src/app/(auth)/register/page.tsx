import { Suspense } from "react";
import RegisterForm from "./_components/register.form";
import { Loader } from "lucide-react";

function LoadingFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-200">
      <div className="flex flex-col items-center gap-4">
        <Loader className="h-8 w-8 animate-spin text-blue-600" />
        <p className="text-gray-600">Loading registration form...</p>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <RegisterForm />
    </Suspense>
  );
}
