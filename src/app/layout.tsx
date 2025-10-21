import type { Metadata } from "next";
import Sider from "@/app/components/layout/sider";
import Header from "@/app/components/layout/header";
import Footer from "@/app/components/layout/footer";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ToolsLib",
  description: "在线工具库",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh_hans" suppressHydrationWarning>
      <head>
        {/* 阻塞脚本：在任何渲染前执行 */}
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || theme === 'light') {
                    document.documentElement.setAttribute('data-theme', theme);
                  } else {
                    document.documentElement.setAttribute('data-theme', 'light');
                  }
                } catch (e) {
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              })();
            `.trim(),
          }}
        /> */}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex`} suppressHydrationWarning>
        <Sider />
        <section className="flex flex-col flex-1">
          {/* <Header /> */}
          <section className="flex flex-1 bg-base-200 p-4 overflow-y-auto">
            {children}
          </section>
          <Footer />
        </section>
      </body>
    </html>
  );
}
