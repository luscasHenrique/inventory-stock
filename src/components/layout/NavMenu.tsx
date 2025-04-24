'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Users,
  FileText,
  Calendar,
  BarChart,
  Settings,
  HelpCircle,
  LogOut,
  ChevronDown,
  ChevronRight,
  ChevronLeft, // ✅ Adicionado!
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

export function NavMenu() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (label: string) =>
    setOpenSubmenu((prev) => (prev === label ? null : label));

  const mainMenu = [
    { icon: Home, label: 'Dashboard', href: '/dashboard' },
    {
      icon: Users,
      label: 'Audience',
      submenu: [
        { label: 'Users', href: '/audience/users' },
        { label: 'Subscribers', href: '/audience/subscribers' },
      ],
    },
    { icon: FileText, label: 'Posts', href: '/posts' },
    { icon: Calendar, label: 'Schedules', href: '/schedules' },
    {
      icon: BarChart,
      label: 'Income',
      submenu: [
        { label: 'Earnings', href: '/income/earnings' },
        { label: 'Funds', href: '/income/funds' },
        { label: 'Declines', href: '/income/declines' },
        { label: 'Payouts', href: '/income/payouts' },
      ],
    },
  ];

  return (
    <aside
      className={`h-full bg-white border-r transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      } flex flex-col`}
    >
      {/* Perfil + Botão de Collapse/Expandir */}
      <div
        className={`flex items-center ${
          isCollapsed ? 'justify-center' : 'justify-between'
        } p-4`}
      >
        <div className="flex items-center gap-3">
          <Image
            src="/avatar-placeholder.png"
            alt="Avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
          {!isCollapsed && (
            <div>
              <p className="text-sm font-semibold">John Doe</p>
              <p className="text-xs text-gray-500">Web Developer</p>
            </div>
          )}
        </div>
        {/* Sempre exibe o botão, mesmo colapsado */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`text-gray-500 ${isCollapsed ? 'ml-0' : 'ml-2'}`}
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Menu principal */}
      <div className="flex-1 space-y-1">
        <p
          className={`px-4 pt-2 pb-1 text-xs text-gray-400 ${
            isCollapsed ? 'hidden' : ''
          }`}
        >
          MAIN
        </p>
        {mainMenu.map(({ icon: Icon, label, href, submenu }, i) => {
          const isActive = href
            ? pathname === href
            : submenu?.some((s) => pathname === s.href);
          return (
            <div key={i} className="relative group">
              <button
                onClick={() =>
                  submenu && (isCollapsed ? null : toggleSubmenu(label))
                }
                onMouseEnter={() =>
                  submenu && isCollapsed && setOpenSubmenu(label)
                }
                onMouseLeave={() =>
                  submenu && isCollapsed && setOpenSubmenu(null)
                }
                className={clsx(
                  'flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100',
                  { 'bg-gray-100 font-semibold': isActive },
                )}
              >
                <Icon size={18} className="mr-3 shrink-0" />
                {!isCollapsed && (
                  <>
                    {href ? (
                      <Link href={href} className="flex-1 text-left">
                        {label}
                      </Link>
                    ) : (
                      <span className="flex-1">{label}</span>
                    )}
                    {submenu && (
                      <span className="ml-auto">
                        {openSubmenu === label ? (
                          <ChevronDown size={16} />
                        ) : (
                          <ChevronRight size={16} />
                        )}
                      </span>
                    )}
                  </>
                )}
              </button>

              {/* Popover submenu colapsado */}
              {isCollapsed && submenu && openSubmenu === label && (
                <div
                  onMouseEnter={() => setOpenSubmenu(label)}
                  onMouseLeave={() => setOpenSubmenu(null)}
                  className="absolute left-full top-0 ml-2 w-40 bg-white border rounded-lg shadow-md py-2 z-50"
                >
                  {submenu.map((sub, j) => (
                    <Link
                      key={j}
                      href={sub.href}
                      className={clsx(
                        'block px-4 py-2 text-sm hover:bg-gray-100 text-gray-600',
                        { 'font-semibold bg-gray-100': pathname === sub.href },
                      )}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}

              {/* Dropdown submenu expandido com animação */}
              <AnimatePresence>
                {!isCollapsed && submenu && openSubmenu === label && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="ml-12 space-y-1 overflow-hidden"
                  >
                    {submenu.map((sub, j) => (
                      <Link
                        key={j}
                        href={sub.href}
                        className={clsx(
                          'block px-4 py-1.5 text-sm text-gray-600 hover:text-black',
                          { 'font-semibold text-black': pathname === sub.href },
                        )}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-4 mt-auto space-y-2">
        <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
          <Settings className="mr-3" size={18} />
          {!isCollapsed && 'Settings'}
        </button>
        <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
          <HelpCircle className="mr-3" size={18} />
          {!isCollapsed && 'Help'}
        </button>
        <button className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">
          <LogOut className="mr-3" size={18} />
          {!isCollapsed && 'Logout'}
        </button>
      </div>
    </aside>
  );
}
