import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { AppShell } from "../components/shell/AppShell";
import { AccessGate } from "../components/shell/AccessGate";
import "./globals.css";
import "../styles/pieza.css";
import "../styles/stories.css";
import "../styles/impuestos.css";

// Tipografía corporativa CAJAR (manual de identidad): Roboto.
// El canvas "Impuestos saludables" usa 300 (light) y 900 (black) + itálicas,
// además de los pesos base del resto del sitio.
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Canvas · Proyecto Cajar",
  description: "Canvas de piezas gráficas del proyecto Cajar",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${roboto.className} ${roboto.variable}`}>
        <AccessGate>
          <AppShell>{children}</AppShell>
        </AccessGate>
      </body>
    </html>
  );
}
