import { SignUpForm } from "./components/sign-up-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Setup",
};

export default function SignupPage() {
  return (
    <>
      <div className="flex flex-col justify-center space-y-6 mx-auto w-full sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="font-semibold text-2xl tracking-tight">Setup admin account</h1>
          <p className="text-muted-foreground text-sm">
            Fill the fields below to create your account.
          </p>
        </div>

        <SignUpForm />

        <p className="px-8 text-muted-foreground text-sm text-center">
          This form only appears once, the created account will be the administrator account.
        </p>
      </div>
    </>
  );
}
