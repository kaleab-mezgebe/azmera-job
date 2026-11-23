import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0A2540" },
    { media: "(prefers-color-scheme: dark)", color: "#F59E0B" },
  ],
};

export const metadata: Metadata = {
  title: "Azmera Jobs – Your Trusted Partner in Jobs",
  description:
    "Ethiopia's premier employment marketplace. Connecting talent with opportunity. Find verified jobs in Addis Ababa, Hawassa, Dire Dawa and beyond. በሥራ ፍለጋ አስተማማኝ አጋርዎ.",
  keywords: ["Azmera Jobs", "Ethiopia jobs", "Addis Ababa careers", "Ethiopian employment", "ETB salary"],
  icons: { icon: "/azmera-logo.png" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Prevent flash of wrong theme - default to crisp professional light mode */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const saved = localStorage.getItem('azm-theme');
                if (saved === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col theme-bg theme-text antialiased">
        {children}
      </body>
    </html>
  );
}
