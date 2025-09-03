"use client";

import { z } from "zod";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockKeyholeIcon, ForwardIcon } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import { Dialog, DialogPortal } from "@/components/ui/dialog";
import { PasswordInput } from "@/components/ui/password-input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";

function PasswordDialogOverlay({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      className={cn(
        "fixed inset-0 flex justify-center items-center bg-white/50 dark:bg-black/50 backdrop-blur-md data-[state=closed]:animate-out data-[state=open]:animate-in duration-200 data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Overlay>
  );
}

function PasswordDialogContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPrimitive.Content
      className={cn(
        "top-[50%] left-[50%] z-50 fixed rounded-lg w-full sm:max-w-lg translate-x-[-50%] translate-y-[-50%] data-[state=closed]:animate-out data-[state=open]:animate-in duration-200 data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        className
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  );
}

const formSchema = z.object({
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export type PasswordFormValues = z.infer<typeof formSchema>;

interface PasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (password: string) => Promise<void>;
}

export default function PasswordDialog({ open, onOpenChange, onSubmit }: PasswordDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  const handleSubmit = async (values: PasswordFormValues) => {
    setIsSubmitting(true);

    try {
      await onSubmit(values.password);
      onOpenChange(false);
      form.reset();
    } catch (error: any) {
      if (error.response?.status === 403) {
        form.setError("password", { message: "Incorrect password." });
        return;
      }

      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const disabledClose = (event: Event) => {
    event.preventDefault();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <PasswordDialogOverlay />
        <PasswordDialogContent onEscapeKeyDown={disabledClose} onPointerDownOutside={disabledClose}>
          <DialogPrimitive.Title className="sr-only">Password Required</DialogPrimitive.Title>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-6 p-6">
              <div className="flex flex-col justify-center items-center">
                <LockKeyholeIcon className="mb-4 w-32 h-32 text-muted-foreground" />

                <div className="mb-6 text-center">
                  <h1 className="font-semibold text-2xl">This file is password protected</h1>
                  <p className="text-muted-foreground">Please enter the password to proceed</p>
                </div>

                <div className="flex gap-1">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="sr-only">Password</FormLabel>
                        <FormControl>
                          <PasswordInput
                            placeholder="Enter password"
                            autoFocus
                            {...field}
                            disabled={isSubmitting}
                            className="w-64"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isSubmitting}>
                    <ForwardIcon />
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </PasswordDialogContent>
      </DialogPortal>
    </Dialog>
  );
}
