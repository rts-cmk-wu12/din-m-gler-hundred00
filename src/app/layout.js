import Footer from "@/components/common/Footer";
import "./globals.css";

import Header from "@/components/common/Header";

export const metadata = {
  title: "Din Mægler",
  description: "Generated by create next app",
};

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