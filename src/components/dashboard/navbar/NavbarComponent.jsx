import React from 'react';
import { Bell, Search, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function NavbarComponent() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-lg">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-gray-800/50 text-white rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Right side icons */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5 text-gray-400" />
            ) : (
              <Moon className="h-5 w-5 text-gray-400" />
            )}
          </button>

          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors relative">
            <Bell className="h-5 w-5 text-gray-400" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
          </button>
        </div>
      </div>
    </div>
  );
}
