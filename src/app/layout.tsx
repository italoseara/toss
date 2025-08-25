import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { Roboto, Roboto_Mono } from "next/font/google";

import "@/css/globals.css";
export { metadata } from "@/config/seo";
import ServerSessionProvider from "@/components/server-session-provider";

const robotoSans = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${robotoSans.variable} ${robotoMono.variable} antialiased`}>
        <ServerSessionProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <Toaster />
          </ThemeProvider>
        </ServerSessionProvider>
      </body>
    </html>
  );
}
