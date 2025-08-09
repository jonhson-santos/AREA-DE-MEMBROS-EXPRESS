import React, { useState } from 'react';
import { Lock, Unlock, Shield, Crown, Timer, CheckCircle, AlertCircle } from 'lucide-react';

export const CofreDigitalPage: React.FC = () => {
  const [accessKey, setAccessKey] = useState('');
  const [accessStatus, setAccessStatus] = useState<'locked' | 'weekly' | 'monthly' | 'lifetime'>('locked');
  const [error, setError] = useState('');
  const [expiryDate, setExpiryDate] = useState<Date | null>(null);

  const ACCESS_KEYS = {
    'cofresemanal': { type: 'weekly' as const, duration: 7 },
    'cofremensal': { type: 'monthly' as const, duration: 30 },
    'cofrevitalicio': { type: 'lifetime' as const, duration: null }
  };

  const handleAccessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const keyData = ACCESS_KEYS[accessKey as keyof typeof ACCESS_KEYS];
    if (keyData) {
      setAccessStatus(keyData.type);
      if (keyData.duration) {
        const expiry = new Date();
        expiry.setDate(expiry.getDate() + keyData.duration);
        setExpiryDate(expiry);
      } else {
        setExpiryDate(null);
      }
      setAccessKey('');
    } else {
      setError('Chave de acesso inválida');
    }
  };

  const getStatusInfo = () => {
    switch (accessStatus) {
      case 'weekly':
        return {
          title: 'Acesso Semanal Ativo',
          color: 'text-blue-400',
          bgColor: 'bg-blue-400/20',
          borderColor: 'border-blue-400/30',
          icon: Timer
        };
      case 'monthly':
        return {
          title: 'Acesso Mensal Ativo',
          color: 'text-green-400',
          bgColor: 'bg-green-400/20',
          borderColor: 'border-green-400/30',
          icon: CheckCircle
        };
      case 'lifetime':
        return {
          title: 'Acesso Vitalício Ativo',
          color: 'text-yellow-400',
          bgColor: 'bg-yellow-400/20',
          borderColor: 'border-yellow-400/30',
          icon: Crown
        };
      default:
        return {
          title: 'Cofre Bloqueado',
          color: 'text-red-400',
          bgColor: 'bg-red-400/20',
          borderColor: 'border-red-400/30',
          icon: Lock
        };
    }
  };

  const statusInfo = getStatusInfo();
  const StatusIcon = statusInfo.icon;

  return (
    <div className="space-y-6 md:space-y-8 px-4 md:px-0">
      {/* Header */}
      <div className="text-center py-8 md:py-12">
        <div className="inline-flex items-center justify-center w-16 md:w-20 h-16 md:h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl md:rounded-3xl mb-4 md:mb-6">
          <div className="text-4xl md:text-5xl">🏦</div>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 md:mb-4">
          Cofre <span className="text-purple-400">Digital</span>
        </h1>
        <p className="text-base md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Estratégias secretas dos milionários. Acesso por tempo limitado ou vitalício.
        </p>
      </div>

      {/* Status do Acesso */}
      <div className={`${statusInfo.bgColor} ${statusInfo.borderColor} border rounded-2xl md:rounded-3xl p-6 md:p-8 text-center`}>
        <StatusIcon className={`w-12 md:w-16 h-12 md:h-16 ${statusInfo.color} mx-auto mb-4`} />
        <h2 className={`text-xl md:text-2xl font-bold ${statusInfo.color} mb-2`}>
          {statusInfo.title}
        </h2>
        {expiryDate && (
          <p className="text-gray-300 text-sm md:text-base">
            Expira em: {expiryDate.toLocaleDateString('pt-BR')}
          </p>
        )}
        {accessStatus === 'lifetime' && (
          <p className="text-gray-300 text-sm md:text-base">
            Acesso permanente garantido
          </p>
        )}
      </div>

      {/* Formulário de Acesso */}
      {accessStatus === 'locked' && (
        <div className="bg-gray-900/90 backdrop-blur-2xl border-2 border-gray-800/50 rounded-3xl p-6 md:p-10">
          <div className="text-center mb-6 md:mb-8">
            <Shield className="w-12 md:w-16 h-12 md:h-16 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
              Desbloqueie o Cofre
            </h3>
            <p className="text-gray-400 text-sm md:text-base">
              Digite sua chave de acesso para revelar os segredos
            </p>
          </div>

          <form onSubmit={handleAccessSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                value={accessKey}
                onChange={(e) => setAccessKey(e.target.value)}
                className="w-full bg-black/60 border-2 border-gray-700/50 rounded-xl md:rounded-2xl px-4 md:px-6 py-4 md:py-5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all text-sm md:text-base font-medium"
                placeholder="Digite sua chave de acesso..."
                required
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border-2 border-red-500/30 rounded-xl p-4 flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <p className="text-red-400 text-sm md:text-base font-medium">{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 hover:from-purple-500 hover:via-purple-600 hover:to-purple-700 text-black font-bold py-4 md:py-5 px-6 md:px-8 rounded-xl md:rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-2xl text-sm md:text-base"
            >
              <div className="flex items-center justify-center">
                <Unlock className="w-5 md:w-6 h-5 md:h-6 mr-3" />
                Desbloquear Cofre
              </div>
            </button>
          </form>

          {/* Tipos de Acesso */}
          <div className="mt-8 pt-6 border-t border-gray-800">
            <h4 className="text-white font-bold mb-4 text-center">Tipos de Acesso:</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-500/10 border border-blue-400/30 rounded-xl p-4 text-center">
                <Timer className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <p className="text-blue-400 font-bold text-sm">Semanal</p>
                <p className="text-gray-400 text-xs">7 dias de acesso</p>
              </div>
              <div className="bg-green-500/10 border border-green-400/30 rounded-xl p-4 text-center">
                <CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <p className="text-green-400 font-bold text-sm">Mensal</p>
                <p className="text-gray-400 text-xs">30 dias de acesso</p>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-400/30 rounded-xl p-4 text-center">
                <Crown className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <p className="text-yellow-400 font-bold text-sm">Vitalício</p>
                <p className="text-gray-400 text-xs">Acesso permanente</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Conteúdo do Cofre */}
      {accessStatus !== 'locked' && (
        <div className="space-y-6">
          <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-6">
            🔓 Cofre Desbloqueado
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Estratégias Secretas */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-purple-400/30 rounded-2xl p-6">
              <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                <div className="text-2xl mr-3">💎</div>
                Estratégias Diamante
              </h4>
              <p className="text-gray-300 mb-4">
                Métodos exclusivos utilizados pelos top 1% para multiplicar patrimônio.
              </p>
              <a 
                href="https://drive.google.com/drive/folders/1XtgQ8mMmChDNtWKx4l_pgUhlfuIUacyJ"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-purple-500/20 text-purple-400 px-4 py-2 rounded-lg hover:bg-purple-500/30 transition-all"
              >
                Acessar Conteúdo
              </a>
            </div>

            {/* Blueprints Milionários */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-purple-400/30 rounded-2xl p-6">
              <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                <div className="text-2xl mr-3">📋</div>
                Blueprints Secretos
              </h4>
              <p className="text-gray-300 mb-4">
                Planos detalhados de construção de império financeiro dos bilionários.
              </p>
              <a 
                href="https://drive.google.com/drive/folders/1XtgQ8mMmChDNtWKx4l_pgUhlfuIUacyJ"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-purple-500/20 text-purple-400 px-4 py-2 rounded-lg hover:bg-purple-500/30 transition-all"
              >
                Baixar Blueprints
              </a>
            </div>

            {/* Contatos VIP */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-purple-400/30 rounded-2xl p-6">
              <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                <div className="text-2xl mr-3">📞</div>
                Rede de Contatos VIP
              </h4>
              <p className="text-gray-300 mb-4">
                Lista exclusiva de investidores, mentores e parceiros estratégicos.
              </p>
              <a 
                href="https://drive.google.com/drive/folders/1XtgQ8mMmChDNtWKx4l_pgUhlfuIUacyJ"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-purple-500/20 text-purple-400 px-4 py-2 rounded-lg hover:bg-purple-500/30 transition-all"
              >
                Ver Contatos
              </a>
            </div>

            {/* Oportunidades Secretas */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-purple-400/30 rounded-2xl p-6">
              <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                <div className="text-2xl mr-3">🎯</div>
                Oportunidades Ocultas
              </h4>
              <p className="text-gray-300 mb-4">
                Investimentos e negócios que só os insiders conhecem.
              </p>
              <a 
                href="https://drive.google.com/drive/folders/1XtgQ8mMmChDNtWKx4l_pgUhlfuIUacyJ"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-purple-500/20 text-purple-400 px-4 py-2 rounded-lg hover:bg-purple-500/30 transition-all"
              >
                Explorar Oportunidades
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};