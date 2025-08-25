"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
import { SpinnerIcon } from "@/components/icons";

const formSchema = z.object({
  email: z.email("Email inválido").min(1, "Email é obrigatório"),
  password: z
    .string()
    .min(1, "Senha é obrigatória")
    .min(8, "Senha deve ter no mínimo 8 caracteres"),
});

type LoginFormValues = z.infer<typeof formSchema>;
type LoginFormProps = React.HTMLAttributes<HTMLDivElement>;

export function LoginForm({ className, ...props }: LoginFormProps) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: LoginFormValues) {
    setIsLoading(true);

    const signInData = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (signInData?.error) {
      toast.error("Email ou senha inválidos");
      setIsLoading(false);
      return;
    }

    toast.success("Login efetuado com sucesso");

    setTimeout(() => {
      setIsLoading(false);
      router.push("/");
    }, 1000);
  }

  return (
    <div className={cn("gap-6 grid", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="gap-2 grid">
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

            <p className="-mt-1 text-muted-foreground text-sm text-right">
              <Link href="/forgot-password">Esqueci minha senha</Link>
            </p>

            <Button disabled={isLoading} className="mt-1" type="submit">
              {isLoading && <SpinnerIcon className="mr-2 w-4 h-4 animate-spin" />}
              Entrar na minha conta
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
