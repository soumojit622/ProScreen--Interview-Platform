import { Footer } from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ConvexClerkProvider from "@/components/providers/ConvexClerkProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const mont = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ProScreen - Video Calling Platform",
  description:
    "A cutting-edge video calling interview platform featuring video calls, screen sharing, recording, and secure authentication built with Next.js and TypeScript.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${mont.className} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <SignedIn>
              <div className="min-h-screen">
                <Navbar />
                <main className="px-4 sm:px-6 lg:px-8">{children}</main>
              </div>
              <Footer />
            </SignedIn>

            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </ThemeProvider>
          <Toaster />
        </body>
      </html>
    </ConvexClerkProvider>
  );
}
