import React, { useState } from 'react';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { DashboardView } from './components/Views/DashboardView';
import { DesignSystemView } from './components/Views/DesignSystemView';
import { ViewState } from './types';
import { NAVIGATION_ITEMS } from './constants';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const getPageTitle = (view: ViewState) => {
    return NAVIGATION_ITEMS.find(item => item.id === view)?.label || 'Panel';
  };

  const renderContent = () => {
    switch (currentView) {
      case ViewState.DASHBOARD:
        return <DashboardView />;
      case ViewState.DESIGN_SYSTEM:
        return <DesignSystemView />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-[50vh] text-slate-400">
            <div className="w-16 h-16 border-2 border-dashed border-slate-300 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl font-bold">?</span>
            </div>
            <h2 className="text-lg font-medium text-slate-600">Página en construcción</h2>
            <p className="text-sm">Esta sección estará disponible próximamente.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans">
      
      {/* Sidebar Component */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        activeView={currentView}
        onNavigate={setCurrentView}
        onCloseMobile={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Header Component */}
        <Header 
          onMenuToggle={toggleSidebar} 
          title={getPageTitle(currentView)}
        />

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-slate-200 py-4 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-slate-400">
            <p>&copy; {new Date().getFullYear()} Akdemia Gestión Inc. Todos los derechos reservados.</p>
            <div className="flex gap-4 mt-2 md:mt-0">
              <a href="#" className="hover:text-brand-blue">Privacidad</a>
              <a href="#" className="hover:text-brand-blue">Términos</a>
              <a href="#" className="hover:text-brand-blue">Soporte</a>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default App;