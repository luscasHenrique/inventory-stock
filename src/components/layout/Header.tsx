'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { mainMenu, footerMenu } from '@/data/menu';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full h-16 bg-white border-b flex items-center justify-between px-6 relative">
      {/* TÍTULO SEMPRE VISÍVEL */}
      <h1 className="text-lg font-semibold text-gray-800">Inventory System</h1>

      {/* BOTÃO DO MENU MOBILE */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Abrir menu"
          className="text-gray-700 hover:text-black"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* INFORMAÇÃO DE BOAS-VINDAS NO DESKTOP */}
      <div className="hidden md:flex items-center gap-4">
        <span className="text-sm text-gray-600">Bem-vindo(a)!</span>
      </div>

      {/* DROPDOWN MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="absolute top-16 left-0 right-0 bg-white shadow-md border-b z-50 md:hidden"
          >
            <ul>
              {/* MAIN MENU */}
              {mainMenu.map((item) =>
                item.submenu ? (
                  item.submenu.map((subItem) => (
                    <li key={subItem.href}>
                      <Link
                        href={subItem.href}
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="ml-3">{subItem.label}</span>
                      </Link>
                    </li>
                  ))
                ) : (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="mr-3" size={18} />
                      {item.label}
                    </Link>
                  </li>
                ),
              )}

              {/* FOOTER MENU */}
              {footerMenu.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center px-4 py-3 text-sm ${item.color}`}
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="mr-3" size={18} />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
