"use client";

import { useSession } from "next-auth/react";
import { User2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export default function User({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const { data, status } = useSession();

  if (status === "loading") {
    return (
      <div className={cn("flex items-center gap-3 mt-5", className)}>
        <div className="flex flex-col items-end gap-1">
          <Skeleton className="mb-1 w-32 h-4" />
          <Skeleton className="w-48 h-3" />
        </div>
        <Skeleton className="bg-muted p-1.5 rounded-full w-10 h-10" />
      </div>
    );
  }

  const { name, email } = data?.user || {};

  return (
    <div className={cn("flex items-center gap-3 mt-5", className)}>
      <div className="text-end">
        <p className="font-medium">{name}</p>
        <p className="text-muted-foreground text-sm">{email}</p>
      </div>
      <User2 className="bg-muted p-1.5 rounded-full w-10 h-10" />
    </div>
  );
}
