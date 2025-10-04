import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/provider/AuthProvider";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["vietnamese"],
});

export const metadata: Metadata = {
  title: "Next_Level_Portfolio_App",
  description: "Created & designed by Shanto",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <AuthProvider>
          {children}
          <Toaster richColors />
        </AuthProvider>
      </body>
    </html>
  );
}
