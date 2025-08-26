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
    name: z.string().min(1, "Name is required").min(3, "Name must be at least 3 characters"),
    email: z.email("Invalid email address").min(1, "Email is required"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
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
        toast.success("Account created successfully! You can now log in.");

        setTimeout(() => {
          setIsLoading(false);
          router.push("/login");
        }, 1000);
      }
    } catch (error) {
      setIsLoading(false);

      if (axios.isAxiosError(error) && error.response?.status === 409) {
        form.setError("email", { message: "Email is already in use" });
      } else {
        toast.error("Something went wrong. Please try again.");
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
                  <FormLabel className="sr-only">Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" disabled={isLoading} {...field} />
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
                  <FormLabel className="sr-only">Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="Password" disabled={isLoading} {...field} />
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
                  <FormLabel className="sr-only">Confirm password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="Confirm password" disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isLoading} className="mt-1">
              {isLoading && <SpinnerIcon className="mr-2 w-4 h-4 animate-spin" />}
              Create Account
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
