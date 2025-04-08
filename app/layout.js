import "./globals.css";
import { headerFont, geistSans, geistMono } from "./fonts";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${headerFont.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
