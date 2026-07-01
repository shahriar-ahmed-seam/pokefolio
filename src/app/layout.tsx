import type { Metadata, Viewport } from "next";
import { Fredoka, Russo_One, Outfit } from "next/font/google";
import "./globals.css";
import { TypeProvider } from "@/context/TypeProvider";
import { Particles } from "@/components/fx/Particles";
import { PokeballCursor } from "@/components/fx/PokeballCursor";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { profile } from "@/data/portfolio";

const display = Fredoka({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});
const heading = Russo_One({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});
const body = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = "https://pokefolio-seam.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} · ${profile.epithet}`,
    template: `%s · ${profile.name}`,
  },
  description:
    "The portfolio of Shahriar Ahmed Seam — AI/ML Engineer & LLM Researcher, reimagined as a Pokémon journey. Choose your starter, master your moves, and explore a Project Dex of AI systems.",
  keywords: [
    "Shahriar Ahmed Seam",
    "AI engineer portfolio",
    "machine learning engineer",
    "LLM researcher",
    "agentic AI",
    "pokemon portfolio",
    "next.js",
    "react",
    "developer portfolio",
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  openGraph: {
    type: "website",
    url: siteUrl,
    title: `${profile.name} · ${profile.epithet}`,
    description: "A Pokémon-themed developer portfolio — choose your starter and explore a Project Dex of AI systems.",
    siteName: "PokéFolio",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} · ${profile.epithet}`,
    description: "A Pokémon-themed developer portfolio by Shahriar Ahmed Seam.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#080b16",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${heading.variable} ${body.variable}`} suppressHydrationWarning>
      <body className="min-h-dvh antialiased">
        <TypeProvider>
          <Particles />
          <PokeballCursor />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </TypeProvider>
      </body>
    </html>
  );
}
