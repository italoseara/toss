"use client";

import { LoginForm } from "./components/login-form";

export default function LoginPage() {
  return (
    <>
      <div className="flex flex-col justify-center space-y-6 mx-auto w-full sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="font-semibold text-2xl tracking-tight">Entrar na sua conta</h1>
          <p className="text-muted-foreground text-sm">
            Insira seus dados abaixo para ter acesso ao painel
          </p>
        </div>

        <LoginForm />
      </div>
    </>
  );
}
