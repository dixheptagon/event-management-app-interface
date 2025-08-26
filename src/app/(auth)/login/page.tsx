import React from "react";
import { ToastContainer } from "react-toastify";
import LoginForm from "./_components/login.form";

export default function Page() {
  return (
    <>
      <ToastContainer />
      <LoginForm />
    </>
  );
}
