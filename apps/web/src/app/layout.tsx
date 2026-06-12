import type { Metadata } from "next";
import { Inter, Noto_Sans_Arabic } from "next/font/google";
import { LocaleProvider } from "@/lib/i18n/LocaleProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-noto-arabic",
});

export const metadata: Metadata = {
  title: "Tasko — La marketplace des talents algériens",
  description:
    "Marketplace algérienne de services digitaux. Paiement DZD, escrow sécurisé, freelancers vérifiés.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.variable} ${notoArabic.variable} font-sans`}>
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
