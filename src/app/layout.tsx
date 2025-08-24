import { Roboto, Roboto_Mono } from "next/font/google";
import "@/css/globals.css";

export { metadata } from "@/config/seo";

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
    <html lang="en">
      <body className={`${robotoSans.variable} ${robotoMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
