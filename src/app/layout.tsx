// src/app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import LayoutWrapper from '@/components/layout/LayoutWrapper';
import { AppToaster } from '@/components/ui/Toaster';

export const metadata: Metadata = {
  title: 'Inventory System',
  description: 'Sistema de estoque e inventário',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <LayoutWrapper>{children}</LayoutWrapper>
        <AppToaster />
      </body>
    </html>
  );
}
