"use client";

import * as React from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const PasswordInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, disabled, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <div className="relative">
        <Input
          className={cn("pr-10 hide-password-toggle", className)}
          type={showPassword ? "text" : "password"}
          autoCapitalize="none"
          autoCorrect="off"
          disabled={disabled}
          ref={ref}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          tabIndex={-1}
          className="top-1/2 right-0 absolute mr-1 rounded-full w-8 h-8 -translate-y-1/2 transform"
          onClick={() => setShowPassword((prev) => !prev)}
          disabled={disabled}
        >
          {showPassword ? <EyeIcon size={20} /> : <EyeOffIcon size={20} />}
        </Button>
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
