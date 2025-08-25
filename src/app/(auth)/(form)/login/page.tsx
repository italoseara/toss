"use client";

import { LoginForm } from "./components/login-form";

export default function LoginPage() {
  return (
    <>
      <div className="flex flex-col justify-center space-y-6 mx-auto w-full sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="font-semibold text-2xl tracking-tight">Login to your account</h1>
          <p className="text-muted-foreground text-sm">
            Insert your details below to access the dashboard.
          </p>
        </div>

        <LoginForm />
      </div>
    </>
  );
}
