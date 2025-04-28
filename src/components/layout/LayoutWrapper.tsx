'use client';

import { usePathname } from 'next/navigation';
import { Header } from './header/Header';
import { NavMenu } from './navmenu/NavMenu';

const PUBLIC_ROUTES = ['/login', '/register'];

function useIsPublicPage() {
  const pathname = usePathname();
  return PUBLIC_ROUTES.includes(pathname);
}

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const isPublicPage = useIsPublicPage();

  if (isPublicPage) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        {children}
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <div className="hidden md:flex p-1">
        <NavMenu />
      </div>

      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
