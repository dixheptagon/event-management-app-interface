import { ToastContainer } from "react-toastify";
import ResendVerificationForm from "./_components/resend.verification";

export default function Page() {
  return (
    <div>
      <ToastContainer />
      <ResendVerificationForm />
    </div>
  );
}
