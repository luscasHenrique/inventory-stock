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

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu((prev) => (prev === label ? null : label));
  };

  const mainMenu = [
    { icon: <Home />, label: 'Dashboard' },
    {
      icon: <Users />,
      label: 'Audience',
      submenu: ['Users', 'Subscribers'],
    },
    { icon: <FileText />, label: 'Posts' },
    { icon: <Calendar />, label: 'Schedules' },
    {
      icon: <BarChart />,
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
      {/* Top Profile */}
      <div className="flex items-center justify-between p-4">
        <div
          className={`flex items-center gap-3 ${isCollapsed ? 'hidden' : ''}`}
        >
          <Image
            src="/avatar-placeholder.png"
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <p className="text-sm font-semibold">John Doe</p>
            <p className="text-xs opacity-75">Web Developer</p>
          </div>
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-500"
        >
          {isCollapsed ? '➡️' : '⬅️'}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 mt-4 space-y-2">
        {mainMenu.map((item, index) => (
          <div key={index} className="relative group">
            <button
              className="flex items-center w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
              onClick={() => (item.submenu ? toggleSubmenu(item.label) : null)}
            >
              <span className="mr-3">{item.icon}</span>
              {!isCollapsed && (
                <>
                  {item.label}
                  {item.submenu && (
                    <span className="ml-auto">
                      {openSubmenu === item.label ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      )}
                    </span>
                  )}
                </>
              )}
            </button>

            {/* Submenu */}
            {item.submenu && openSubmenu === item.label && !isCollapsed && (
              <div className="ml-10 space-y-1">
                {item.submenu.map((sub, idx) => (
                  <button
                    key={idx}
                    className="text-sm text-gray-600 hover:text-black"
                  >
                    {sub}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Settings and Footer */}
      <div className="p-4 mt-auto space-y-2">
        <button className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100">
          <Settings className="mr-3" />
          {!isCollapsed && 'Settings'}
        </button>
        <button className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100">
          <HelpCircle className="mr-3" />
          {!isCollapsed && 'Help'}
        </button>
        <button className="flex items-center w-full px-4 py-2 text-red-500 hover:bg-red-100">
          <LogOut className="mr-3" />
          {!isCollapsed && 'Logout'}
        </button>
      </div>
    </aside>
  );
}
