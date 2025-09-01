"use client";

import * as React from "react";
import { toast } from "sonner";
import { CopyIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const CopyInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, disabled, ...props }, ref) => {
    return (
      <div className="relative">
        <Input
          className={cn("pr-10", className)}
          type="text"
          readOnly
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
          onClick={() => {
            if (props.value) {
              navigator.clipboard.writeText(props.value.toString());
              toast.success("Copied to clipboard", { duration: 2000 });
            }
          }}
          disabled={disabled}
        >
          <CopyIcon size={20} />
        </Button>
      </div>
    );
  }
);
CopyInput.displayName = "CopyIcon";

export { CopyInput };
