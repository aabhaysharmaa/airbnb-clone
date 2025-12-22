import type { Metadata } from "next";
import "./globals.css";
import { Nunito } from "next/font/google";


// custom font for our project 
const font = Nunito({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb Clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${font.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
