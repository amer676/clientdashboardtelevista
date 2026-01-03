import './globals.css';
import DashboardLayout from '@/components/DashboardLayout';
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'], 
  variable: '--font-mono',
  display: 'swap',
});

export const metadata = {
  title: 'Bison Solar Ops | Powered by Televista',
  description: 'Operational CRM Dashboard for Bison Solar & Roofing',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className={inter.className}>
        <DashboardLayout>
          {children}
        </DashboardLayout>
      </body>
    </html>
  );
}
