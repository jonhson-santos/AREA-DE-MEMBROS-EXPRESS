import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { WelcomeScreen } from './WelcomeScreen';
import { ProductPage } from './ProductPage';
import { BonusPage } from './BonusPage';
import { CofreDigitalPage } from './CofreDigitalPage';
import { CentralIAsPage } from './CentralIAsPage';
import { useAuth } from '../context/AuthContext';
import { PRODUCTS } from '../data/products';
import { MessageCircle, Menu, X, ExternalLink } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('welcome');
  const [completedModules, setCompletedModules] = useState<Record<string, string[]>>({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, toggleModuleComplete } = useAuth();

  const handleWelcomeContinue = () => {
    setCurrentPage('home');
  };

  const handleToggleComplete = (productId: string, moduleId: string) => {
    toggleModuleComplete(productId, moduleId);
    
    // Update local state for immediate UI feedback
    setCompletedModules(prev => ({
      ...prev,
      [productId]: prev[productId]?.includes(moduleId) 
        ? prev[productId].filter(id => id !== moduleId)
        : [...(prev[productId] || []), moduleId]
    }));
  };

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    setSidebarOpen(false); // Close sidebar on mobile after navigation
  };

  const renderContent = () => {
    if (currentPage === 'welcome') {
      return <WelcomeScreen onContinue={handleWelcomeContinue} />;
    }

    if (currentPage === 'home') {
      return (
        <div className="space-y-6 md:space-y-8">
          <div className="text-center py-8 md:py-16 px-4">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Sua Jornada <span className="text-green-400">Começou</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Escolha por onde começar sua transformação mental. Cada módulo foi projetado para elevar sua mentalidade a um novo patamar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 px-4 md:px-0">
            <div 
              onClick={() => setCurrentPage('mente-milionaria')}
              className="group cursor-pointer bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 hover:border-green-400/50 rounded-2xl md:rounded-3xl p-6 md:p-8 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl"
            >
              <div className="text-center">
                {/* Mente Milionária Express - Mobile optimized */}
                <div className="relative w-24 h-32 md:w-32 md:h-40 mx-auto mb-4 md:mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-xl md:rounded-2xl blur-lg md:blur-xl group-hover:blur-md md:group-hover:blur-lg transition-all"></div>
                  <div className="relative w-full h-full bg-gradient-to-br from-gray-900/90 to-gray-800/90 rounded-xl md:rounded-2xl overflow-hidden border border-gray-700/50 group-hover:border-green-400/30 transition-all">
                    <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/5 to-transparent rounded-t-xl md:rounded-t-2xl"></div>
                    <img 
                      src="https://i.imgur.com/oFRZBNL.png" 
                      alt="Mente Milionária Express"
                      className="w-full h-full object-contain p-2 md:p-3 filter drop-shadow-xl group-hover:scale-105 transition-transform"
                      loading="eager"
                    />
                  </div>
                </div>
                
                <h2 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">Mente Milionária Express</h2>
                <p className="text-gray-400 mb-4 md:mb-6 text-sm md:text-base leading-relaxed">O início da revolução interna. Mergulho rápido e prático em mentalidade de riqueza.</p>
                <div className="bg-green-400/20 text-green-400 px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium inline-block">
                  8 Módulos + Bônus
                </div>
              </div>
            </div>

            {user?.accessLevel === 'premium' && (
              <div 
                onClick={() => setCurrentPage('mente-blindada')}
                className="group cursor-pointer bg-gradient-to-br from-yellow-900/30 to-gray-800 border border-yellow-400/30 hover:border-yellow-400/70 rounded-2xl md:rounded-3xl p-6 md:p-8 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl"
              >
                <div className="text-center">
                  {/* Mente Blindada 21 - Mobile optimized */}
                  <div className="relative w-24 h-32 md:w-32 md:h-40 mx-auto mb-4 md:mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-xl md:rounded-2xl blur-lg md:blur-xl group-hover:blur-md md:group-hover:blur-lg transition-all"></div>
                    <div className="relative w-full h-full bg-gradient-to-br from-gray-900/90 to-gray-800/90 rounded-xl md:rounded-2xl overflow-hidden border border-gray-700/50 group-hover:border-yellow-400/30 transition-all">
                      <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/5 to-transparent rounded-t-xl md:rounded-t-2xl"></div>
                      <img 
                        src="https://i.imgur.com/jShh59j.png" 
                        alt="Mente Blindada 21"
                        className="w-full h-full object-contain p-2 md:p-3 filter drop-shadow-xl group-hover:scale-105 transition-transform"
                        loading="eager"
                      />
                    </div>
                  </div>
                  
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">Mente Blindada 21</h2>
                  <p className="text-gray-400 mb-4 md:mb-6 text-sm md:text-base leading-relaxed">A transformação definitiva. 21 dias para blindar sua mente com aço e propósito.</p>
                  <div className="bg-yellow-400/20 text-yellow-400 px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium inline-block">
                    Premium • 21 Dias + Extras
                  </div>
                </div>
              </div>
            )}

            {/* Botão para adquirir Mente Blindada se for usuário básico */}
            {user?.accessLevel === 'basic' && (
              <div className="group bg-gradient-to-br from-yellow-900/30 to-gray-800 border border-yellow-400/30 hover:border-yellow-400/70 rounded-2xl md:rounded-3xl p-6 md:p-8 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl">
                <div className="text-center">
                  {/* Mente Blindada 21 - Mobile optimized */}
                  <div className="relative w-24 h-32 md:w-32 md:h-40 mx-auto mb-4 md:mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-xl md:rounded-2xl blur-lg md:blur-xl group-hover:blur-md md:group-hover:blur-lg transition-all"></div>
                    <div className="relative w-full h-full bg-gradient-to-br from-gray-900/90 to-gray-800/90 rounded-xl md:rounded-2xl overflow-hidden border border-gray-700/50 group-hover:border-yellow-400/30 transition-all">
                      <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/5 to-transparent rounded-t-xl md:rounded-t-2xl"></div>
                      <img 
                        src="https://i.imgur.com/jShh59j.png" 
                        alt="Mente Blindada 21"
                        className="w-full h-full object-contain p-2 md:p-3 filter drop-shadow-xl group-hover:scale-105 transition-transform"
                        loading="eager"
                      />
                    </div>
                  </div>
                  
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">Mente Blindada 21</h2>
                  <p className="text-gray-400 mb-4 md:mb-6 text-sm md:text-base leading-relaxed">A transformação definitiva. 21 dias para blindar sua mente com aço e propósito.</p>
                  
                  <a
                    href="https://app.pushinpay.com.br/service/pay/9F43FAA5-88B5-46A3-85DF-6D21A0AFA923"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 text-sm md:text-base"
                  >
                    <span>Adquirir Agora</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Módulos de Recorrência */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 px-4 md:px-0 mt-8">
            <div 
              className="group cursor-pointer bg-gradient-to-br from-purple-900/30 to-gray-800 border border-purple-400/30 hover:border-purple-400/70 rounded-2xl md:rounded-3xl p-6 md:p-8 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl"
            >
              <div className="text-center">
                <div className="relative w-24 h-32 md:w-32 md:h-40 mx-auto mb-4 md:mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-purple-600/20 rounded-xl md:rounded-2xl blur-lg md:blur-xl group-hover:blur-md md:group-hover:blur-lg transition-all"></div>
                  <div className="relative w-full h-full bg-gradient-to-br from-gray-900/90 to-gray-800/90 rounded-xl md:rounded-2xl overflow-hidden border border-gray-700/50 group-hover:border-purple-400/30 transition-all">
                    <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/5 to-transparent rounded-t-xl md:rounded-t-2xl"></div>
                    <div className="w-full h-full flex items-center justify-center p-4">
                      <img 
                        src="https://i.imgur.com/2V1gYpR.jpeg" 
                        alt="Cofre Digital"
                        className="w-full h-full object-contain filter drop-shadow-xl"
                      />
                    </div>
                  </div>
                </div>
                
                <h2 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">Cofre Digital</h2>
                <p className="text-gray-400 mb-4 md:mb-6 text-sm md:text-base leading-relaxed">Acesso exclusivo ao cofre de estratégias secretas dos milionários.</p>
                
                <div className="space-y-3">
                  <button
                    onClick={() => setCurrentPage('cofre-digital')}
                    className="w-full bg-gradient-to-r from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700 text-black font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 text-sm md:text-base"
                  >
                    Entrar no Cofre
                  </button>
                  <a
                    href="https://cofre-digital-pied.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center space-x-2 w-full bg-purple-500/20 border border-purple-400/30 text-purple-400 hover:bg-purple-500/30 font-medium py-2.5 px-4 rounded-lg transition-all duration-300 text-sm"
                  >
                    <span>Adquirir Acesso</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            <div 
              className="group cursor-pointer bg-gradient-to-br from-cyan-900/30 to-gray-800 border border-cyan-400/30 hover:border-cyan-400/70 rounded-2xl md:rounded-3xl p-6 md:p-8 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl"
            >
              <div className="text-center">
                <div className="relative w-24 h-32 md:w-32 md:h-40 mx-auto mb-4 md:mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-cyan-600/20 rounded-xl md:rounded-2xl blur-lg md:blur-xl group-hover:blur-md md:group-hover:blur-lg transition-all"></div>
                  <div className="relative w-full h-full bg-gradient-to-br from-gray-900/90 to-gray-800/90 rounded-xl md:rounded-2xl overflow-hidden border border-gray-700/50 group-hover:border-cyan-400/30 transition-all">
                    <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/5 to-transparent rounded-t-xl md:rounded-t-2xl"></div>
                    <div className="w-full h-full flex items-center justify-center p-4">
                      <img 
                        src="https://i.imgur.com/fkA7h2C.png" 
                        alt="Central das IAs"
                        className="w-full h-full object-contain filter drop-shadow-xl"
                      />
                    </div>
                  </div>
                </div>
                
                <h2 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">Central das IAs</h2>
                <p className="text-gray-400 mb-4 md:mb-6 text-sm md:text-base leading-relaxed">Hub completo de inteligências artificiais para maximizar seus resultados.</p>
                
                <div className="space-y-3">
                  <button
                    onClick={() => setCurrentPage('central-ias')}
                    className="w-full bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-black font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 text-sm md:text-base"
                  >
                    Entrar na Central
                  </button>
                  <a
                    href="https://central-de-i-as-01.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center space-x-2 w-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-400 hover:bg-cyan-500/30 font-medium py-2.5 px-4 rounded-lg transition-all duration-300 text-sm"
                  >
                    <span>Adquirir Acesso</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (currentPage === 'bonus') {
      return <BonusPage />;
    }

    if (currentPage === 'cofre-digital') {
      return <CofreDigitalPage />;
    }

    if (currentPage === 'central-ias') {
      return <CentralIAsPage />;
    }


    // Product pages
    const product = PRODUCTS[currentPage];
    if (product) {
      return (
        <ProductPage
          product={product}
          completedModules={completedModules[currentPage] || []}
          onToggleComplete={(moduleId) => handleToggleComplete(currentPage, moduleId)}
          onNavigateToNext={
            currentPage === 'mente-milionaria' && user?.accessLevel === 'premium'
              ? () => setCurrentPage('mente-blindada')
              : undefined
          }
        />
      );
    }

    return null;
  };

  // Welcome screen sempre em fullscreen
  if (currentPage === 'welcome') {
    return renderContent();
  }

  return (
    <div className="min-h-screen bg-black">
      {/* DESKTOP LAYOUT - Apenas visível em lg+ */}
      <div className="hidden lg:flex min-h-screen">
        {/* Desktop Sidebar - Fixa */}
        <div className="w-64 flex-shrink-0">
          <Sidebar currentPage={currentPage} onPageChange={handlePageChange} />
        </div>
        
        {/* Desktop Content */}
        <main className="flex-1 p-8">
          {renderContent()}
        </main>
      </div>

      {/* MOBILE LAYOUT - Apenas visível em telas menores que lg */}
      <div className="lg:hidden min-h-screen">
        {/* Mobile Header com botão menu */}
        <div className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800 p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-10 h-10 bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg flex items-center justify-center text-white hover:bg-gray-800 transition-all"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg overflow-hidden">
                <img 
                  src="https://vidagold.fun/CURA%20NATURAL/wp-content/uploads/2025/07/ChatGPT-Image-1-de-jul.-de-2025-01_51_03.png" 
                  alt="Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-white font-bold text-sm">Mente Imparável</span>
            </div>
          </div>
        </div>

        {/* Mobile Sidebar Overlay - Só aparece quando sidebarOpen é true */}
        {sidebarOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setSidebarOpen(false)}
            />
            
            {/* Sidebar */}
            <div className="fixed inset-y-0 left-0 w-64 z-50 transform transition-transform duration-300 ease-in-out">
              <Sidebar currentPage={currentPage} onPageChange={handlePageChange} />
            </div>
          </>
        )}
        
        {/* Mobile Content - Sempre visível, sem sidebar sobrepondo */}
        <main className="p-4 min-h-screen">
          {renderContent()}
        </main>
      </div>

      {/* WhatsApp Support Button - Sempre visível */}
      <a
        href="https://wa.me/554799658915?text=Quero%20acesso%20ao%20grupo%20Premium%20"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 w-12 h-12 md:w-14 md:h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-110 z-30"
      >
        <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
      </a>
    </div>
  );
};