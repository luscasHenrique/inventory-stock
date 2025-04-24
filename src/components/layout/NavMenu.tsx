'use client';

import { useState } from 'react';
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
} from 'lucide-react';
import Image from 'next/image';

export function NavMenu() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (label: string) =>
    setOpenSubmenu((prev) => (prev === label ? null : label));

  const mainMenu = [
    { icon: Home, label: 'Dashboard' },
    {
      icon: Users,
      label: 'Audience',
      submenu: ['Users', 'Subscribers'],
    },
    { icon: FileText, label: 'Posts' },
    { icon: Calendar, label: 'Schedules' },
    {
      icon: BarChart,
      label: 'Income',
      submenu: ['Earnings', 'Funds', 'Declines', 'Payouts'],
    },
  ];

  return (
    <aside
      className={`h-full bg-white border-r transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      } flex flex-col`}
    >
      {/* Perfil */}
      <div className="flex items-center justify-between p-4">
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <Image
              src="/avatar-placeholder.png"
              alt="Avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <p className="text-sm font-semibold">John Doe</p>
              <p className="text-xs text-gray-500">Web Developer</p>
            </div>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-500 ml-auto"
        >
          {isCollapsed ? '➡️' : '⬅️'}
        </button>
      </div>

      {/* Menu principal */}
      <div className="flex-1 space-y-1">
        <p
          className={`px-4 pt-2 pb-1 text-xs text-gray-400 ${isCollapsed ? 'hidden' : ''}`}
        >
          MAIN
        </p>
        {mainMenu.map(({ icon: Icon, label, submenu }, i) => (
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
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 relative"
            >
              <Icon size={18} className="mr-3 shrink-0" />
              {!isCollapsed && (
                <>
                  {label}
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

            {/* Dropdown colapsado */}
            {isCollapsed && submenu && openSubmenu === label && (
              <div
                onMouseEnter={() => setOpenSubmenu(label)}
                onMouseLeave={() => setOpenSubmenu(null)}
                className="absolute left-full top-0 ml-2 w-40 bg-white border rounded-lg shadow-md py-2 z-50"
              >
                {submenu.map((sub, j) => (
                  <div
                    key={j}
                    className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 cursor-pointer"
                  >
                    {sub}
                  </div>
                ))}
              </div>
            )}

            {/* Dropdown expandido */}
            {!isCollapsed && submenu && openSubmenu === label && (
              <div className="ml-12 space-y-1 pb-1 transition-all">
                {submenu.map((sub, j) => (
                  <button
                    key={j}
                    className="block w-full text-left px-4 py-1.5 text-sm text-gray-600 hover:text-black"
                  >
                    {sub}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Settings / Help / Logout */}
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
