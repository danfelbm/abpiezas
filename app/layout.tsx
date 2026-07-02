import type { Metadata } from "next";
import { AppShell } from "../components/shell/AppShell";
import "./globals.css";
import "../styles/pieza.css";
import "../styles/stories.css";

export const metadata: Metadata = {
  title: "canvasbm",
  description: "Canvas de piezas de campaña",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
