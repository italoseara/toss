import type { Metadata } from "next";

const title = "Toss";
const description = "Self-hosted, open-source file sharing solution";
const baseUrl = "https://toss.italo.host";

export const metadata: Metadata = {
  title: {
    default: title,
    template: `%s | ${title}`,
  },
  description: description,
  keywords: ["file sharing", "self-hosted", "open-source", "toss"],
  authors: [{ name: "Italo Seara", url: "https://social.italo.host/github" }],
  creator: "Italo Seara",
  metadataBase: new URL(baseUrl),
  openGraph: {
    type: "website",
    locale: "en_US",
    title: title,
    description: description,
    url: baseUrl,
    siteName: title,
    images: [
      {
        url: new URL("/og-image.png", baseUrl),
        width: 1,
        height: 1,
        alt: title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: title,
    description: description,
    images: [new URL("/og-image.png", baseUrl).toString()],
    creator: "@italosseara",
  },
};
