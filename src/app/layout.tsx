import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Roboto } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});


export const metadata: Metadata = {
  title: "Curbside Dashboard",
  description: "Dashboard for daily needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={roboto.variable}
          >
        <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
        <NavBar/>
        {children}
        </ThemeProvider>
        </AppRouterCacheProvider>
        
        <footer><a href="https://www.flaticon.com/free-icons/cone" title="cone icons">Cone icons created by Freepik - Flaticon</a></footer>
      </body>
    </html>
  );
}
