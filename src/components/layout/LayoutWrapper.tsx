'use client';

import { usePathname } from 'next/navigation';
import { NavMenu } from './NavMenu';
import { Header } from './Header';
// import { Footer } from './Footer';

const PUBLIC_ROUTES = ['/login', '/register'];

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isPublicPage = PUBLIC_ROUTES.includes(pathname);

  if (isPublicPage) {
    return (
      <div className="min-h-screen bg-blue-500 flex items-center justify-center">
        {children}
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-transparent ">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex p-1">
        <NavMenu />
      </div>

      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto bg-gray-50 p-6">{children}</main>
        {/* <Footer /> */}
      </div>
    </div>
  );
}
