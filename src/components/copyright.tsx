import Link from "next/link";
import { PulsingHeart } from "@/components/pulsing-heart";
import { cn } from "@/lib/utils";

export function Copyright({ className, ...props }: React.HTMLProps<HTMLDivElement>) {
  const year = new Date().getFullYear();

  return (
    <div
      className={cn(
        "right-0 bottom-0 left-0 absolute flex flex-col justify-center items-center p-4 text-muted-foreground text-xs",
        className
      )}
      {...props}
    >
      <p>
        © {year} All rights reserved
        <span className="mx-1">•</span>
        Toss
      </p>

      <p>
        Made with <PulsingHeart /> by{" "}
        <Link href="https://github.com/italoseara" className="link">
          Italo Seara
        </Link>
      </p>
    </div>
  );
}
