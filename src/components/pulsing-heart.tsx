import { cn } from "@/lib/utils";

export function PulsingHeart({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <span className={cn("animate-pulse", className)} {...props}>
      ❤️
    </span>
  );
}
