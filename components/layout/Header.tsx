import React, { useState, useEffect, useRef } from 'react';
import { SearchIcon, BellIcon, MailIcon, MenuIcon, ChevronDownIcon, UserCircleIcon, SettingsIcon, LogoutIcon } from '../icons/Icons';
import { ViewType } from '../../App';
import { Notification } from '../../types';
import { mockNotifications } from '../notifications/data';
import { mockEmails } from '../email/data';
import NotificationsPanel from './NotificationsPanel';

const viewTitles: Record<ViewType, string> = {
  dashboard: 'Dashboard',
  projects: 'Projects',
  services: 'Services',
  employees: 'Employees',
  departments: 'Departments',
  leave: 'Leave',
  attendance: 'Attendance',
  performance: 'Performance',
  notifications: 'Announcements',
  email: 'Email',
  leaderboard: 'Leaderboard',
  payroll: 'Payroll',
  reports: 'Reports',
  audit: 'Audit Logs',
  settings: 'Settings',
};

interface HeaderProps {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  onMenuClick: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setCurrentView, onMenuClick, searchQuery, setSearchQuery }) => {
  const pageTitle = viewTitles[currentView] || 'Dashboard';
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadNotifications = notifications.filter(n => !n.read).length;
  const unreadEmails = mockEmails.filter(e => e.to.email === 'admin@corporatesaathi.com' && !e.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-20 bg-white dark:bg-gray-800 shadow-sm dark:border-b dark:border-gray-700 flex items-center justify-between px-4 sm:px-6 lg:px-8 flex-shrink-0">
      <div className="flex items-center">
        <button
          onClick={onMenuClick}
          className="lg:hidden mr-4 text-gray-500 hover:text-primary focus:outline-none"
          aria-label="Open sidebar"
        >
          <MenuIcon />
        </button>
        <h2 className="text-xl font-semibold text-text-primary dark:text-gray-200">{pageTitle}</h2>
      </div>
      <div className="flex items-center space-x-2 sm:space-x-4">
        <div className="relative hidden md:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
          />
        </div>

        <div className="relative" ref={notificationRef}>
          <button 
            onClick={() => setIsNotificationsOpen(prev => !prev)}
            className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition relative"
          >
            <span className="sr-only">View notifications</span>
            <BellIcon />
            {unreadNotifications > 0 && (
              <span className="absolute top-0 right-0 block h-5 w-5 rounded-full ring-2 ring-white bg-red-500 text-white text-xs flex items-center justify-center">
                {unreadNotifications}
              </span>
            )}
          </button>
          {isNotificationsOpen && (
             <NotificationsPanel 
                notifications={notifications}
                setNotifications={setNotifications}
                onClose={() => setIsNotificationsOpen(false)}
             />
          )}
        </div>
        
        <button onClick={() => setCurrentView('email')} className="relative p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition">
          <span className="sr-only">View messages</span>
          <MailIcon />
           {unreadEmails > 0 && (
              <span className="absolute top-0 right-0 block h-5 w-5 rounded-full ring-2 ring-white bg-red-500 text-white text-xs flex items-center justify-center">
                {unreadEmails}
              </span>
            )}
        </button>
        
        <div className="relative" ref={profileRef}>
          <button onClick={() => setIsProfileMenuOpen(prev => !prev)} className="flex items-center space-x-2 focus:outline-none p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src="https://picsum.photos/100/100"
              alt="User avatar"
            />
            <div className="hidden lg:block text-left">
              <div className="font-semibold text-sm text-text-primary dark:text-gray-200">Admin User</div>
              <div className="text-xs text-text-secondary dark:text-gray-400">System Administrator</div>
            </div>
            <ChevronDownIcon className="hidden lg:block w-4 h-4 text-gray-500" />
          </button>
          
           {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border dark:border-gray-700 z-50 animate-fade-in-down py-2">
                  <div className="px-4 py-2 border-b dark:border-gray-700">
                     <p className="font-semibold text-sm text-text-primary dark:text-gray-200">Admin User</p>
                     <p className="text-xs text-text-secondary dark:text-gray-400 truncate">admin@corporatesaathi.com</p>
                  </div>
                  <div className="mt-2 space-y-1">
                     <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('settings'); setIsProfileMenuOpen(false); }} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                       <UserCircleIcon className="w-5 h-5 text-gray-500" /> My Profile
                     </a>
                     <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('settings'); setIsProfileMenuOpen(false); }} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                       <SettingsIcon className="w-5 h-5 text-gray-500" /> Settings
                     </a>
                  </div>
                  <div className="mt-2 pt-2 border-t dark:border-gray-700">
                     <a href="#" onClick={(e) => { e.preventDefault(); alert("Logging out..."); }} className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-500/20">
                       <LogoutIcon className="w-5 h-5" /> Logout
                     </a>
                  </div>
              </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;