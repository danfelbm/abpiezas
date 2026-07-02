import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { AppShell } from "../components/shell/AppShell";
import "./globals.css";
import "../styles/pieza.css";
import "../styles/stories.css";

// Tipografía corporativa CAJAR (manual de identidad): Roboto.
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  title: "Canvas · Proyecto Cajar",
  description: "Canvas de piezas gráficas del proyecto Cajar",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={roboto.className}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
