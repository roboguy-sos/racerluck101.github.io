import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { profile, socials, siteUrl, asset } from "@/lib/data";
import SiteBackground from "@/components/SiteBackground";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const description =
  "OSCP+ certified Penetration Tester, Red Team Operator, and Security Developer. Web exploitation, Active Directory attacks, Mythic C2, and AI-assisted security automation.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — Offensive Security Engineer (OSCP+)`,
    template: `%s · ${profile.name}`,
  },
  description,
  keywords: [
    "Penetration Tester",
    "OSCP+",
    "Red Team Operator",
    "Offensive Security",
    "Web Application Pentesting",
    "Active Directory",
    "Mythic C2",
    "HackTheBox",
    "Security Developer",
    "Prateek Jaiswal",
  ],
  authors: [{ name: profile.name, url: socials.github }],
  creator: profile.name,
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: `${profile.name} — Offensive Security Engineer (OSCP+)`,
    description,
    siteName: `${profile.name} | Offensive Security`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — Offensive Security Engineer (OSCP+)`,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [{ url: asset("favicon.svg"), type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "Offensive Security Engineer / Penetration Tester",
  email: `mailto:${profile.email}`,
  telephone: profile.phone,
  address: { "@type": "PostalAddress", addressLocality: "Raipur", addressCountry: "India" },
  url: siteUrl,
  sameAs: [socials.linkedin, socials.github, socials.hackthebox, socials.ctftime, socials.oscp],
  knowsAbout: [
    "Penetration Testing",
    "Red Teaming",
    "Web Application Security",
    "Active Directory Security",
    "Offensive Security Automation",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-black"
        >
          Skip to content
        </a>
        <SiteBackground />
        {children}
      </body>
    </html>
  );
}
