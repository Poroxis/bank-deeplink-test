import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["cyrillic", "latin"],
});

export const metadata: Metadata = {
  title: "Тест суммы в диплинке Сбера",
  description: "Тестовые варианты суммы в iOS-диплинке Сбера.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={geist.variable}>{children}</body>
    </html>
  );
}
