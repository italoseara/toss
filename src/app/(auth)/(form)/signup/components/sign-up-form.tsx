"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import axios from "axios";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { SpinnerIcon } from "@/components/icons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z
  .object({
    name: z.string().min(1, "Nome é obrigatório").min(3, "Nome deve ter no mínimo 3 caracteres"),
    email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
    password: z
      .string()
      .min(1, "Senha é obrigatória")
      .min(8, "Senha deve ter no mínimo 8 caracteres"),
    confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não conferem",
    path: ["confirmPassword"],
  });

type SignUpFormValues = z.infer<typeof formSchema>;
type SignUpFormProps = React.HTMLAttributes<HTMLDivElement>;

export function SignUpForm({ className, ...props }: SignUpFormProps) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  async function onSubmit(values: SignUpFormValues) {
    setIsLoading(true);

    const data = {
      name: values.name,
      email: values.email,
      password: values.password,
    };

    try {
      const response = await axios.post("/api/signup", data);

      if (response.status === 201) {
        toast.success("Conta criada com sucesso! Faça login para continuar.");

        setTimeout(() => {
          setIsLoading(false);
          router.push("/login");
        }, 1000);
      }
    } catch (error) {
      setIsLoading(false);

      if (axios.isAxiosError(error) && error.response?.status === 409) {
        form.setError("email", { message: "Email já está em uso" });
      } else {
        toast.error("Não foi possível criar sua conta. Tente novamente mais tarde.");
      }
    }
  }

  return (
    <div className={cn("gap-6 grid", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="gap-2 grid">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome" disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Senha</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="Senha" disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Confirmar senha</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="Confirmar senha" disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isLoading} className="mt-1">
              {isLoading && <SpinnerIcon className="mr-2 w-4 h-4 animate-spin" />}
              Criar conta
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
