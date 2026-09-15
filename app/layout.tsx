import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import "prismjs/themes/prism.css";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Clerk + Cerbos Demo App",
  description:
    "Example Next.js app using Clerk for authentication and Cerbos for authorization.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider signInUrl="/sign-in" signUpUrl="/sign-up" afterSignOutUrl="/">
      <html lang="en">
        <body>
          <Header />
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
