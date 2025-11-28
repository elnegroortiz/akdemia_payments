import React from 'react';
import { Logo } from '../Logo';
import { NavItem, ViewState } from '../../types';
import { NAVIGATION_ITEMS } from '../../constants';
import { LogOut } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  activeView: ViewState;
  onNavigate: (view: ViewState) => void;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, activeView, onNavigate, onCloseMobile }) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-slate-900/50 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`
          fixed top-0 left-0 z-30 h-screen w-64 bg-white border-r border-slate-200 shadow-xl
          transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:shadow-none
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="h-16 flex items-center px-6 border-b border-slate-100">
            <Logo />
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
            <div className="px-3 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Menú Principal
            </div>
            {NAVIGATION_ITEMS.map((item) => {
              const isActive = activeView === item.id;
              const Icon = item.icon;
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id as ViewState);
                    onCloseMobile();
                  }}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                    ${isActive 
                      ? 'bg-brand-blue/10 text-brand-blue' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }
                  `}
                >
                  <Icon size={20} className={isActive ? 'text-brand-blue' : 'text-slate-400'} />
                  {item.label}
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-blue shadow-[0_0_8px_rgba(14,165,233,0.5)]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-slate-100">
            <button className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
              <LogOut size={20} />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};