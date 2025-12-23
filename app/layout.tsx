import type { Metadata } from "next";
import "./globals.css";
import { Nunito } from "next/font/google";
import Provider from "@/components/provider";

// custom font for our project
const font = Nunito({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb Clone",
  icons : "/images/icon.png"
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
        <Provider>
          {children}
        </Provider>

      </body>
    </html>
  );
}
