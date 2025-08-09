import React, { useState, useEffect } from 'react';
import { Bot, Zap, Brain, Sparkles, Crown, Star, Target, Rocket, Lock, Unlock, Shield, Timer, CheckCircle, AlertCircle } from 'lucide-react';

export const CentralIAsPage: React.FC = () => {
  const [accessKey, setAccessKey] = useState('');
  const [accessStatus, setAccessStatus] = useState<'locked' | 'weekly' | 'monthly' | 'lifetime'>('locked');
  const [error, setError] = useState('');
  const [expiryDate, setExpiryDate] = useState<Date | null>(null);
  const [showPitch, setShowPitch] = useState(false);

  const ACCESS_KEYS = {
    'iasemanal': { type: 'weekly' as const, duration: 7 },
    'iamensal': { type: 'monthly' as const, duration: 30 },
    'iavitalicio': { type: 'lifetime' as const, duration: null }
  };

  // Verificar acesso salvo no localStorage
  useEffect(() => {
    const savedAccess = localStorage.getItem('central_ias_access');
    if (savedAccess) {
      const accessData = JSON.parse(savedAccess);
      const now = new Date();
      
      if (accessData.type === 'lifetime') {
        setAccessStatus('lifetime');
      } else if (accessData.expiryDate && new Date(accessData.expiryDate) > now) {
        setAccessStatus(accessData.type);
        setExpiryDate(new Date(accessData.expiryDate));
      } else {
        // Acesso expirado
        localStorage.removeItem('central_ias_access');
        setShowPitch(true);
      }
    }
  }, []);

  const handleAccessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const keyData = ACCESS_KEYS[accessKey as keyof typeof ACCESS_KEYS];
    if (keyData) {
      setAccessStatus(keyData.type);
      
      let expiry = null;
      if (keyData.duration) {
        expiry = new Date();
        expiry.setDate(expiry.getDate() + keyData.duration);
        setExpiryDate(expiry);
      } else {
        setExpiryDate(null);
      }

      // Salvar no localStorage
      const accessData = {
        type: keyData.type,
        expiryDate: expiry?.toISOString() || null
      };
      localStorage.setItem('central_ias_access', JSON.stringify(accessData));
      
      setAccessKey('');
      setShowPitch(false);
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
          title: 'Central Bloqueada',
          color: 'text-red-400',
          bgColor: 'bg-red-400/20',
          borderColor: 'border-red-400/30',
          icon: Lock
        };
    }
  };

  const statusInfo = getStatusInfo();
  const StatusIcon = statusInfo.icon;

  const aiTools = [
    {
      id: 'chatgpt-premium',
      name: 'ChatGPT Premium',
      description: 'Acesso completo ao GPT-4 com prompts otimizados para negócios',
      icon: '🤖',
      url: 'https://chat.openai.com/',
      category: 'Texto & Conversação'
    },
    {
      id: 'midjourney',
      name: 'Midjourney Pro',
      description: 'Criação de imagens profissionais com IA para marketing',
      icon: '🎨',
      url: 'https://midjourney.com/',
      category: 'Design & Imagens'
    },
    {
      id: 'claude',
      name: 'Claude AI',
      description: 'Assistente avançado para análises complexas e estratégias',
      icon: '🧠',
      url: 'https://claude.ai/',
      category: 'Análise & Estratégia'
    },
    {
      id: 'notion-ai',
      name: 'Notion AI',
      description: 'Organização inteligente e automação de processos',
      icon: '📋',
      url: 'https://notion.so/',
      category: 'Produtividade'
    },
    {
      id: 'gamma',
      name: 'Gamma',
      description: 'Apresentações profissionais criadas automaticamente',
      icon: '📊',
      url: 'https://gamma.app/',
      category: 'Apresentações'
    },
    {
      id: 'jasper',
      name: 'Jasper AI',
      description: 'Copywriting profissional para vendas e marketing',
      icon: '✍️',
      url: 'https://jasper.ai/',
      category: 'Marketing & Vendas'
    }
  ];

  // Pitch para compra do acesso anual
  const PitchModal = () => (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-cyan-400/30 rounded-3xl p-8 max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-3xl mx-auto mb-6 flex items-center justify-center">
            <Bot className="w-10 h-10 text-black" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            🚀 Seu Acesso <span className="text-red-400">Expirou!</span>
          </h2>
          <p className="text-xl text-gray-300 mb-6">
            Não perca mais tempo! Garante acesso <span className="text-cyan-400 font-bold">VITALÍCIO</span> à Central das IAs
          </p>
        </div>

        <div className="space-y-6 mb-8">
          <div className="bg-cyan-500/10 border border-cyan-400/30 rounded-2xl p-6">
            <h3 className="text-cyan-400 font-bold text-xl mb-4">🎯 O que você está perdendo:</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>Acesso a 6+ ferramentas de IA premium</span>
              </li>
              <li className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>Biblioteca com +500 prompts otimizados</span>
              </li>
              <li className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>Automação completa dos seus processos</span>
              </li>
              <li className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>Suporte premium e atualizações constantes</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-400/30 rounded-2xl p-6 text-center">
            <h4 className="text-red-400 font-bold text-lg mb-2">⚡ OFERTA LIMITADA</h4>
            <p className="text-white text-2xl font-bold mb-2">
              De <span className="line-through text-gray-400">R$ 497</span> por apenas <span className="text-green-400">R$ 197</span>
            </p>
            <p className="text-gray-300 text-sm">Acesso vitalício • Sem mensalidades • Sem pegadinhas</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="https://central-de-i-as-01.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-black font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 text-center"
          >
            🚀 GARANTIR ACESSO VITALÍCIO
          </a>
          <button
            onClick={() => setShowPitch(false)}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-4 px-6 rounded-2xl transition-all"
          >
            Talvez depois
          </button>
        </div>
      </div>
    </div>
  );

  // Se mostrar pitch, renderizar apenas o modal
  if (showPitch) {
    return <PitchModal />;
  }

  return (
    <div className="space-y-6 md:space-y-8 px-4 md:px-0">
      {/* Header */}
      <div className="text-center py-8 md:py-12">
        <div className="inline-flex items-center justify-center w-16 md:w-20 h-16 md:h-20 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-2xl md:rounded-3xl mb-4 md:mb-6">
          <img 
            src="https://i.imgur.com/fkA7h2C.png" 
            alt="Central das IAs"
            className="w-full h-full object-contain p-2"
          />
        </div>
        
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 md:mb-4">
          Central das <span className="text-cyan-400">IAs</span>
        </h1>
        <p className="text-base md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Hub completo de inteligências artificiais premium para maximizar seus resultados e automatizar seu sucesso.
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
            <Shield className="w-12 md:w-16 h-12 md:h-16 text-cyan-400 mx-auto mb-4" />
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
              Desbloqueie a Central
            </h3>
            <p className="text-gray-400 text-sm md:text-base">
              Digite sua chave de acesso para entrar no hub de IAs
            </p>
          </div>

          <form onSubmit={handleAccessSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                value={accessKey}
                onChange={(e) => setAccessKey(e.target.value)}
                className="w-full bg-black/60 border-2 border-gray-700/50 rounded-xl md:rounded-2xl px-4 md:px-6 py-4 md:py-5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all text-sm md:text-base font-medium"
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
              className="w-full bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:from-cyan-500 hover:via-cyan-600 hover:to-cyan-700 text-black font-bold py-4 md:py-5 px-6 md:px-8 rounded-xl md:rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-2xl text-sm md:text-base"
            >
              <div className="flex items-center justify-center">
                <Unlock className="w-5 md:w-6 h-5 md:h-6 mr-3" />
                Acessar Central das IAs
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

          {/* CTA para compra */}
          <div className="mt-8 pt-6 border-t border-gray-800 text-center">
            <p className="text-gray-400 mb-4">Não tem uma chave de acesso?</p>
            <a
              href="https://central-de-i-as-01.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-black font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              <Crown className="w-5 h-5" />
              <span>Adquirir Acesso Vitalício</span>
            </a>
          </div>
        </div>
      )}

      {/* Conteúdo da Central - Só aparece se tiver acesso */}
      {accessStatus !== 'locked' && (
        <>
          {/* Vídeo Tutorial Dicloak */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-cyan-400/30 rounded-2xl md:rounded-3xl p-6 md:p-8 mb-8">
            <div className="text-center mb-6">
              <h4 className="text-xl md:text-2xl font-bold text-white mb-4 flex items-center justify-center">
                <div className="text-2xl mr-3">🎥</div>
                Tutorial Exclusivo - Dicloak
              </h4>
            </div>
            
            {/* Container do vídeo responsivo */}
            <div className="relative w-full mb-6" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-xl"
                src="https://www.youtube.com/embed/YKbj3LKFpoI"
                title="Tutorial Dicloak"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            
            {/* Instruções de acesso */}
            <div className="bg-red-500/10 border-2 border-red-400/30 rounded-xl p-6 mb-6">
              <h5 className="text-red-400 font-bold text-lg mb-4 text-center">
                LEIA COM ATENÇÃO: ↓↓↓
              </h5>
              
              <div className="space-y-4 text-gray-300 text-sm md:text-base leading-relaxed">
                <p>
                  Na tela inicial de login do Dicloak, digite ou copie e cole a <strong className="text-white">CONTA</strong> e a <strong className="text-white">SENHA</strong> disponíveis abaixo. Em seguida, prossiga para o passo: <strong className="text-green-400">#3 - Configurando</strong>.
                </p>
                
                <div className="bg-yellow-500/10 border border-yellow-400/30 rounded-lg p-4">
                  <p className="text-yellow-400 font-bold text-center">
                    A SENHA SERÁ ALTERADA TODO DIA 10, 20 E 30.
                  </p>
                  <p className="text-yellow-300 text-center mt-2">
                    RETORNE AQUI PARA PEGAR O ACESSO ATUALIZADO.
                  </p>
                </div>
                
                <p className="text-gray-400 text-center italic">
                  (Em breve, será adicionada a autenticação, fiquem ligados!)
                </p>
                
                <div className="text-center">
                  <p className="text-green-400 font-bold">
                    IR PARA O PRÓXIMO PASSO: #3 - Configurando
                  </p>
                </div>
              </div>
            </div>
            
            {/* Credenciais de acesso */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-black/30 border border-gray-600 rounded-xl p-4">
                <h6 className="text-white font-bold mb-2 text-center">CONTA:</h6>
                <div className="bg-gray-800 rounded-lg p-3 text-center">
                  <code className="text-cyan-400 font-mono text-sm md:text-base break-all">
                    GRINGATOOLS.COM
                  </code>
                </div>
                <button 
                  onClick={() => navigator.clipboard.writeText('GRINGATOOLS.COM')}
                  className="w-full mt-2 bg-cyan-500/20 text-cyan-400 py-2 px-4 rounded-lg hover:bg-cyan-500/30 transition-all text-sm"
                >
                  Copiar Conta
                </button>
              </div>
              
              <div className="bg-black/30 border border-gray-600 rounded-xl p-4">
                <h6 className="text-white font-bold mb-2 text-center">SENHA:</h6>
                <div className="bg-gray-800 rounded-lg p-3 text-center">
                  <code className="text-cyan-400 font-mono text-sm md:text-base break-all">
                    NETWORKPRO+VAIDEBAN=10/08
                  </code>
                </div>
                <button 
                  onClick={() => navigator.clipboard.writeText('NETWORKPRO+VAIDEBAN=10/08')}
                  className="w-full mt-2 bg-cyan-500/20 text-cyan-400 py-2 px-4 rounded-lg hover:bg-cyan-500/30 transition-all text-sm"
                >
                  Copiar Senha
                </button>
              </div>
            </div>
            
            {/* Aviso importante */}
            <div className="mt-6 bg-blue-500/10 border border-blue-400/30 rounded-xl p-4 text-center">
              <p className="text-blue-400 font-medium text-sm">
                💡 <strong>Dica:</strong> Use os botões "Copiar" para facilitar o processo de login no Dicloak
              </p>
            </div>
          </div>

          {/* Grid de Ferramentas de IA */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {aiTools.map((tool) => (
              <div 
                key={tool.id}
                className="group bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 hover:border-cyan-400/50 rounded-2xl md:rounded-3xl p-6 md:p-8 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-400/10"
              >
                <div className="text-center">
                  <div className="w-16 md:w-20 h-16 md:h-20 mx-auto mb-4 md:mb-6 bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl flex items-center justify-center text-3xl md:text-4xl group-hover:scale-110 transition-transform">
                    {tool.icon}
                  </div>
                  
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {tool.name}
                  </h3>
                  
                  <div className="inline-block bg-cyan-400/20 text-cyan-400 px-3 py-1 rounded-full text-xs md:text-sm font-medium mb-3">
                    {tool.category}
                  </div>
                  
                  <p className="text-gray-300 mb-6 text-sm md:text-base leading-relaxed group-hover:text-gray-200 transition-colors">
                    {tool.description}
                  </p>
                  
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-medium transition-all border border-cyan-400/30 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-400/20"
                  >
                    <Rocket className="w-4 h-4" />
                    <span>Acessar Ferramenta</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Seção de Prompts Premium */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-cyan-400/30 rounded-2xl md:rounded-3xl p-6 md:p-8">
            <div className="text-center mb-6 md:mb-8">
              <Brain className="w-12 md:w-16 h-12 md:h-16 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Biblioteca de Prompts Premium
              </h3>
              <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto">
                Coleção exclusiva de prompts otimizados para cada ferramenta de IA, desenvolvidos pelos especialistas.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-black/30 rounded-xl p-6 border border-gray-700/50">
                <h4 className="text-white font-bold mb-3 flex items-center">
                  <Sparkles className="w-5 h-5 text-yellow-400 mr-2" />
                  Prompts para Negócios
                </h4>
                <p className="text-gray-400 text-sm mb-4">
                  Estratégias, análises de mercado, planos de negócio e muito mais.
                </p>
                <a 
                  href="https://drive.google.com/drive/folders/1XtgQ8mMmChDNtWKx4l_pgUhlfuIUacyJ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-lg hover:bg-cyan-500/30 transition-all text-sm"
                >
                  Baixar Prompts
                </a>
              </div>

              <div className="bg-black/30 rounded-xl p-6 border border-gray-700/50">
                <h4 className="text-white font-bold mb-3 flex items-center">
                  <Target className="w-5 h-5 text-green-400 mr-2" />
                  Prompts para Marketing
                </h4>
                <p className="text-gray-400 text-sm mb-4">
                  Copywriting, campanhas, conteúdo viral e conversões.
                </p>
                <a 
                  href="https://drive.google.com/drive/folders/1XtgQ8mMmChDNtWKx4l_pgUhlfuIUacyJ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-lg hover:bg-cyan-500/30 transition-all text-sm"
                >
                  Baixar Prompts
                </a>
              </div>
            </div>
          </div>

          {/* CTA Final */}
          <div className="text-center py-8 md:py-12">
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 rounded-2xl md:rounded-3xl p-6 md:p-8">
              <Zap className="w-12 md:w-16 h-12 md:h-16 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                Maximize Seu Potencial com IA
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                Use essas ferramentas para automatizar tarefas, criar conteúdo profissional e acelerar seus resultados. O futuro é agora.
              </p>
              <div className="inline-flex items-center space-x-2 text-cyan-400 font-medium">
                <Star className="w-5 h-5" />
                <span>
                  {accessStatus === 'lifetime' ? 'Acesso Vitalício Ativo' : 
                   accessStatus === 'monthly' ? 'Acesso Mensal Ativo' : 
                   'Acesso Semanal Ativo'}
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};