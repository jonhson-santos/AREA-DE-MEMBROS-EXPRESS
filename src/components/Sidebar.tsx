import React from 'react';
import { Home, BookOpen, Gift, LogOut, Crown, Shield, Vault, Bot } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, onPageChange }) => {
  const { user, logout } = useAuth();

  const menuItems = [
    { id: 'home', label: 'Início', icon: Home },
    { id: 'mente-milionaria', label: 'Mente Milionária', icon: BookOpen },
    ...(user?.accessLevel === 'premium' ? [
      { id: 'mente-blindada', label: 'Mente Blindada', icon: Shield }
    ] : []),
    { id: 'bonus', label: 'Bônus', icon: Gift },
    { id: 'cofre-digital', label: 'Cofre Digital', icon: Vault },
    { id: 'central-ias', label: 'Central das IAs', icon: Bot }
  ];

  return (
    <div className="h-full w-64 bg-black/95 border-r border-gray-800 flex flex-col">
      {/* Header */}
      <div className="p-4 md:p-6 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl overflow-hidden flex-shrink-0">
            <img 
              src="https://vidagold.fun/CURA%20NATURAL/wp-content/uploads/2025/07/ChatGPT-Image-1-de-jul.-de-2025-01_51_03.png" 
              alt="Mente Imparável Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-white font-bold text-base md:text-lg truncate">Mente Imparável</h2>
            <div className="flex items-center space-x-1">
              {user?.accessLevel === 'premium' && (
                <Crown className="w-3 h-3 text-yellow-400 flex-shrink-0" />
              )}
              <span className="text-xs text-gray-400 capitalize truncate">
                {user?.accessLevel === 'premium' ? 'Premium' : 'Básico'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 md:p-4 overflow-y-auto">
        <ul className="space-y-1 md:space-y-2">
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onPageChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 md:px-4 py-3 rounded-lg md:rounded-xl transition-all duration-200 text-left text-sm md:text-base ${
                    isActive 
                      ? 'bg-gradient-to-r from-green-400/20 to-green-600/20 text-green-400 border border-green-400/30' 
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <Icon className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                  <span className="font-medium truncate">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-3 md:p-4 border-t border-gray-800">
        <button
          onClick={logout}
          className="w-full flex items-center space-x-3 px-3 md:px-4 py-3 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg md:rounded-xl transition-all duration-200 text-sm md:text-base"
        >
          <LogOut className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
          <span className="font-medium">Sair</span>
        </button>
      </div>
    </div>
  );
};