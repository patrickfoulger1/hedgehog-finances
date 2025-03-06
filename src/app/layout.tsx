import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { EdgeStoreProvider } from "../lib/edgestore";

const APP_NAME = "HedgeHog";
const APP_DEFAULT_TITLE = "Smarter Investments";
const APP_TITLE_TEMPLATE = "%s - PWA App";
const APP_DESCRIPTION = "Manage your stock portfolio with us.";

export const metadata: Metadata = {
    applicationName: APP_NAME,
    title: {
        default: APP_DEFAULT_TITLE,
        template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    manifest: "/manifest.json",
};

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="" suppressHydrationWarning>
            <head>
                <meta name="apple-mobile-web-app-title" content="HedgeHog" />
            </head>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased dvw-100 dvh-100`}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <AuthProvider>
                        <EdgeStoreProvider>{children}</EdgeStoreProvider>
                    </AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
