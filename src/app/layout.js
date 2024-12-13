import Footer from "@/components/common/Footer";
import "./globals.css";

import Header from "@/components/common/Header";

export const metadata = {
  title: "Din Mægler",
  description: "Find din drømmebolig med vores professionelle mæglertjenester. Vi tilbyder ekspertvejledning, skræddersyede løsninger og en personlig tilgang til boligkøb og -salg",
  icons: {
    icon: "/icon.ico",
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="dk">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
