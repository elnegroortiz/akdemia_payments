import React from 'react';
import { Menu, Search, Bell, Settings } from 'lucide-react';
import { MOCK_USER } from '../../constants';
import { ViewState } from '../../types';

interface HeaderProps {
  onMenuToggle: () => void;
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle, title }) => {
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 h-16 px-4 sm:px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuToggle}
          className="p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-lg lg:hidden"
        >
          <Menu size={24} />
        </button>
        
        {/* Breadcrumb / Title */}
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-slate-800">{title}</h1>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {/* Search Bar - Hidden on mobile */}
        <div className="hidden md:flex items-center bg-slate-100 rounded-full px-4 py-1.5 border border-transparent focus-within:border-brand-blue focus-within:ring-2 focus-within:ring-brand-blue/20 transition-all">
          <Search size={16} className="text-slate-400" />
          <input 
            type="text" 
            placeholder="Buscar..." 
            className="bg-transparent border-none focus:ring-0 text-sm w-48 text-slate-700 placeholder-slate-400"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 sm:gap-2 border-r border-slate-200 pr-2 sm:pr-4">
          <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-red rounded-full border border-white"></span>
          </button>
          <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full">
            <Settings size={20} />
          </button>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3">
          <div className="hidden md:block text-right">
            <p className="text-sm font-semibold text-slate-800">{MOCK_USER.name}</p>
            <p className="text-xs text-slate-500">{MOCK_USER.role}</p>
          </div>
          <img 
            src={MOCK_USER.avatarUrl} 
            alt="User" 
            className="w-9 h-9 rounded-full border-2 border-white shadow-sm object-cover"
          />
        </div>
      </div>
    </header>
  );
};