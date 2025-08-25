"use client";

import { SignUpForm } from "./components/sign-up-form";

export default function SignupPage() {
  return (
    <>
      <div className="flex flex-col justify-center space-y-6 mx-auto w-full sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="font-semibold text-2xl tracking-tight">Configuração inicial</h1>
          <p className="text-muted-foreground text-sm">
            Preencha os campos abaixo para criar sua conta
          </p>
        </div>

        <SignUpForm />

        <p className="px-8 text-muted-foreground text-sm text-center">
          Esse formulário só aparece uma vez, a conta criada será a conta do administrador.
        </p>
      </div>
    </>
  );
}
