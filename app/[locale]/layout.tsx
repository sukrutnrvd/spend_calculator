import "@/styles/globals.css";

import { Metadata, Viewport } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";

import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Providers } from "../providers";
import clsx from "clsx";
import { fontSans } from "@/config/fonts";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("seo");

  return {
    title: t("home.title"),
    description: t("home.description"),
  };
}
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html suppressHydrationWarning lang={locale}>
      <head />
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <NextIntlClientProvider>
          <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
            <LanguageSwitcher />
            <main className="">{children}</main>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
