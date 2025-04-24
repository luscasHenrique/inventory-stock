'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import * as Tooltip from '@radix-ui/react-tooltip';
import { mainMenu, footerMenu } from '@/data/menu';

export function NavMenu() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);
  useEffect(() => {
    if (isMounted) {
      const savedState = localStorage.getItem('navMenuCollapsed');
      if (savedState !== null) setIsCollapsed(savedState === 'true');
    }
  }, [isMounted]);
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('navMenuCollapsed', String(isCollapsed));
    }
  }, [isCollapsed, isMounted]);

  const toggleSubmenu = (label: string) =>
    setOpenSubmenu((prev) => (prev === label ? null : label));

  if (!isMounted) return null;

  return (
    <aside
      className={`h-full bg-white border-r transition-[width] duration-300 ease-in-out ${
        isCollapsed ? 'w-16' : 'w-64'
      } flex flex-col`}
    >
      <div
        className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} p-4`}
      >
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <Image
                src="/avatar-placeholder.png"
                alt="Avatar"
                width={40}
                height={40}
                className="rounded-full cursor-pointer"
              />
            </Tooltip.Trigger>
            {isCollapsed && (
              <Tooltip.Portal>
                <Tooltip.Content
                  side="right"
                  className="bg-black text-white px-3 py-1 rounded text-sm"
                >
                  John Doe - Web Developer
                </Tooltip.Content>
              </Tooltip.Portal>
            )}
          </Tooltip.Root>
        </Tooltip.Provider>
        {!isCollapsed && (
          <div className="ml-3">
            <p className="text-sm font-semibold">John Doe</p>
            <p className="text-xs text-gray-500">Web Developer</p>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`text-gray-500 ${isCollapsed ? 'ml-0' : 'ml-2'}`}
          aria-label={isCollapsed ? 'Expandir menu' : 'Colapsar menu'}
          aria-expanded={!isCollapsed}
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <div className="flex-1 space-y-1">
        <p
          className={`px-4 pt-2 pb-1 text-xs text-gray-400 ${isCollapsed ? 'hidden' : ''}`}
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
                  {
                    'bg-gray-100 font-semibold': isActive,
                  },
                )}
              >
                <Icon size={18} className="shrink-0" />
                {!isCollapsed && (
                  <span className="ml-3 flex-1 text-left">{label}</span>
                )}
                {submenu && !isCollapsed && (
                  <span className="ml-auto">
                    {openSubmenu === label ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                  </span>
                )}
              </button>

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
                        {
                          'font-semibold bg-gray-100': pathname === sub.href,
                        },
                      )}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}

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
                          {
                            'font-semibold text-black': pathname === sub.href,
                          },
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

      {/* Footer fixo no bottom */}
      <div className="mt-auto space-y-1 py-4">
        {footerMenu.map(({ icon: Icon, label, href }, idx) => (
          <Link
            key={idx}
            href={href}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <Icon
              className={clsx('size-5 shrink-0', {
                'mx-auto': isCollapsed,
                'mr-3': !isCollapsed,
              })}
            />
            {!isCollapsed && <span>{label}</span>}
          </Link>
        ))}
      </div>
    </aside>
  );
}
