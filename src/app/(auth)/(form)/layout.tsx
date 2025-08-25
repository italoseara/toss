import { LogoIcon } from "@/components/icons";
import { ModeToggle } from "@/components/mode-toggle";
import { Copyright } from "@/components/copyright";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-center items-center mx-4 min-h-screen">
      <LogoIcon className="mx-auto mb-8 w-24 h-24 text-black dark:text-white transition-colors duration-200" />

      <div className="top-0 left-0 absolute m-6">
        <ModeToggle variant="ghost" />
      </div>

      {children}

      <Copyright />
    </div>
  );
}
