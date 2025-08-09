import React from 'react';
import { Play, Download, CheckCircle, Clock, FileText, Headphones, Gift, Lock, Timer, ExternalLink } from 'lucide-react';
import { Module } from '../types';
import { useAuth } from '../context/AuthContext';
import { OptimizedImage } from './OptimizedImage';

interface ModuleCardProps {
  module: Module;
  completed: boolean;
  onToggleComplete: () => void;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ module, completed, onToggleComplete }) => {
  const { user } = useAuth();

  // Função para calcular dias restantes para liberação
  const getDaysUntilUnlock = (unlockDay: number) => {
    if (!user?.purchaseDate) return 0;
    
    const purchaseDate = new Date(user.purchaseDate);
    const currentDate = new Date();
    const daysPassed = Math.floor((currentDate.getTime() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (unlockDay <= daysPassed) return 0; // Liberado
    return unlockDay - daysPassed; // Dias restantes
  };

  // Função para verificar se um módulo está liberado
  const isModuleUnlocked = (module: Module) => {
    if (module.unlockDay === undefined || module.unlockDay === 0) return true; // Sempre liberado
    return getDaysUntilUnlock(module.unlockDay) === 0;
  };

  const getIcon = () => {
    switch (module.type) {
      case 'video': return Play;
      case 'pdf': return FileText;
      case 'audio': return Headphones;
      case 'bonus': return Gift;
      default: return Play;
    }
  };

  const Icon = getIcon();
  const isUnlocked = isModuleUnlocked(module);
  const daysUntilUnlock = getDaysUntilUnlock(module.unlockDay || 0);

  const handleAccess = () => {
    if (isUnlocked) {
      if (module.driveUrl) {
        // Abre o Google Drive em nova aba
        window.open(module.driveUrl, '_blank', 'noopener,noreferrer');
      }
      onToggleComplete();
    }
  };

  return (
    <div className={`group bg-gray-900/90 border border-gray-700/50 rounded-2xl p-6 transition-all duration-300 relative overflow-hidden ${
      isUnlocked 
        ? 'hover:bg-gray-800/90 hover:border-green-400/30 cursor-pointer transform hover:scale-[1.02] hover:shadow-2xl' 
        : 'opacity-60 cursor-not-allowed'
    }`}>
      {/* Background gradient sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 via-transparent to-yellow-400/5 rounded-2xl"></div>
      
      {/* Animação de bloqueio */}
      {!isUnlocked && (
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-2xl">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <div className="text-center">
              <div className="relative mb-4">
                <Lock className="w-12 h-12 text-red-400 mx-auto animate-lock-pulse" />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-countdown">
                  <Timer className="w-3 h-3 text-white" />
                </div>
              </div>
              <div className="bg-black/60 backdrop-blur-sm rounded-lg px-4 py-2 border border-red-400/30">
                <p className="text-red-400 font-bold text-sm">
                  🔒 Libera em {daysUntilUnlock} {daysUntilUnlock === 1 ? 'dia' : 'dias'}
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  Aguarde para desbloquear
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="relative z-10 flex items-start space-x-4">
        {/* Imagem do módulo otimizada */}
        {module.imageUrl && (
          <div className="flex-shrink-0 w-20 h-20 relative overflow-hidden rounded-xl">
            <OptimizedImage
              src={module.imageUrl}
              alt={module.title}
              className={`w-full h-full transition-transform duration-500 ${
                isUnlocked ? 'group-hover:scale-110' : 'grayscale'
              }`}
              priority={false}
            />
            {completed && isUnlocked && (
              <div className="absolute inset-0 bg-green-400/20 flex items-center justify-center rounded-xl">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
            )}
          </div>
        )}

        {/* Ícone (apenas se não houver imagem) */}
        {!module.imageUrl && (
          <div className={`flex-shrink-0 w-20 h-20 rounded-xl flex items-center justify-center transition-all ${
            !isUnlocked
              ? 'bg-gray-700/50 border-2 border-red-400/30'
              : completed 
              ? 'bg-green-400/20 border-2 border-green-400' 
              : 'bg-gray-800 group-hover:bg-gray-700'
          }`}>
            {!isUnlocked ? (
              <Lock className="w-8 h-8 text-red-400" />
            ) : completed ? (
              <CheckCircle className="w-8 h-8 text-green-400" />
            ) : (
              <Icon className="w-8 h-8 text-gray-400 group-hover:text-white" />
            )}
          </div>
        )}

        {/* Conteúdo do módulo */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-3">
            <h3 className={`font-bold text-lg leading-tight transition-colors ${
              isUnlocked 
                ? 'text-white group-hover:text-green-400' 
                : 'text-gray-400'
            }`}>
              {module.title}
            </h3>
            {module.duration && (
              <div className="flex items-center space-x-1 text-gray-400 text-sm ml-4 flex-shrink-0">
                <Clock className="w-4 h-4" />
                <span>{module.duration}</span>
              </div>
            )}
          </div>

          <p className={`text-sm mb-4 leading-relaxed ${
            isUnlocked ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {module.description}
          </p>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleAccess}
              disabled={!isUnlocked}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
                !isUnlocked
                  ? 'bg-red-500/20 text-red-400 cursor-not-allowed border border-red-400/30'
                  : completed
                  ? 'bg-green-400/20 text-green-400 hover:bg-green-400/30 border border-green-400/30'
                  : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-600'
              }`}
            >
              {!isUnlocked ? (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Bloqueado</span>
                </>
              ) : (
                <>
                  {module.driveUrl ? <ExternalLink className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                  <span>{completed ? 'Acessar Novamente' : 'Acessar Conteúdo'}</span>
                </>
              )}
            </button>

            {module.downloadUrl && isUnlocked && (
              <button className="flex items-center space-x-2 px-4 py-2.5 bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 rounded-xl font-medium transition-all border border-yellow-400/30">
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};