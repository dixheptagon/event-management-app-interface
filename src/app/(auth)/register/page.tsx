import RegisterForm from "./_components/register.form";
import React from "react";
import { ToastContainer } from "react-toastify";

export default function Page() {
  return (
    <>
      <ToastContainer />
      <RegisterForm />
    </>
  );
}
