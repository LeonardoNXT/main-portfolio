import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  abstract:
    "Portfólio de Leonardo da Silva Leal, um Desenvolvedor Full Stack Node",
  title: "Leonardo Leal - Portifólio",
  description:
    "Aqui eu mostro um pouco mais da minha arte e do que eu sei fazer! Sou um desenvolvedor especializado em Node Js, a qual trabalho com as tecnologias NextJS | NestJs entre outras tecnologias que integram minha stack.",
  creator: "Leonardo Leal",
  applicationName: "Portfólio de Leonardo Leal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        {children}
      </body>
    </html>
  );
}
