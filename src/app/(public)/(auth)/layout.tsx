import { LogoIcon } from "@/components/icons";
import { Copyright } from "@/components/copyright";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-center items-center mx-4 min-h-screen">
      <LogoIcon className="mx-auto mb-8 w-24 h-24" />
      {children}
      <Copyright />
    </div>
  );
}
