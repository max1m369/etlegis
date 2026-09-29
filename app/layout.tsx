import type { Metadata } from "next";
import { Cormorant_Garamond, Jost, Oswald } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import { ModalProvider } from "@/components/providers/ModalProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ConsultationModal } from "@/components/ui/ConsultationModal";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-heading",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
  variable: "--font-condensed",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Адвокатское бюро Etlegis — защита интересов бизнеса в сложных процессах",
  description: "Адвокатское бюро Etlegis. Стратегический консалтинг, снижение персональных рисков руководства и защита корпоративных активов. Экономические и уголовные споры.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${cormorant.variable} ${jost.variable} ${oswald.variable}`}>
      <body className="bg-bg-primary text-text-main font-body antialiased selection:bg-accent selection:text-white overflow-x-hidden max-w-full">
        <ThemeProvider>
          <SmoothScrollProvider>
            <ModalProvider>
              {children}
              <ConsultationModal />
            </ModalProvider>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
