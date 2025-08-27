import type { Metadata } from "next";

import { LoginForm } from "./components/login-form";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Login",
};

export default async function LoginPage() {
  const users = await prisma.user.count();
  if (users === 0) redirect("/setup");

  return (
    <div className="flex flex-col justify-center space-y-6 mx-auto w-full sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="font-semibold text-2xl tracking-tight">Login to your account</h1>
        <p className="text-muted-foreground text-sm">
          Insert your details below to access the dashboard.
        </p>
      </div>

      <LoginForm />
    </div>
  );
}
