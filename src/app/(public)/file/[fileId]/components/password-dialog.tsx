"use client";

import { cn } from "@/lib/utils";
import { LockKeyholeIcon, ForwardIcon } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import { Dialog, DialogPortal } from "@/components/ui/dialog";
import { PasswordInput } from "@/components/ui/password-input";
import { Button } from "@/components/ui/button";

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

interface PasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PasswordDialog({ open, onOpenChange }: PasswordDialogProps) {
  const disabledClose = (event: Event) => {
    event.preventDefault();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <PasswordDialogOverlay />
        <PasswordDialogContent onEscapeKeyDown={disabledClose} onPointerDownOutside={disabledClose}>
          <DialogPrimitive.Title className="sr-only">Password Required</DialogPrimitive.Title>

          <div className="flex flex-col justify-center items-center">
            <LockKeyholeIcon className="mb-4 w-32 h-32 text-muted-foreground" />

            <div className="mb-6 text-center">
              <h1 className="font-semibold text-2xl">This file is password protected</h1>
              <p className="text-muted-foreground">Please enter the password to proceed</p>
            </div>

            <div className="flex items-center gap-1">
              <PasswordInput placeholder="Enter password" className="w-64" />
              <Button type="button" onClick={() => onOpenChange(false)}>
                <ForwardIcon />
              </Button>
            </div>
          </div>
        </PasswordDialogContent>
      </DialogPortal>
    </Dialog>
  );
}
