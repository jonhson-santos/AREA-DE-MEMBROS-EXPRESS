import React from 'react';
import { Gift, Download, Star, Crown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { PRODUCTS } from '../data/products';

export const BonusPage: React.FC = () => {
  const { user } = useAuth();

  const getAllBonus = () => {
    const allBonus = [];
    
    // Adicionar bônus do produto básico
    allBonus.push(...PRODUCTS['mente-milionaria'].bonus.map(bonus => ({
      ...bonus,
      productName: 'Mente Milionária Express'
    })));

    // Adicionar bônus premium se o usuário tem acesso
    if (user?.accessLevel === 'premium') {
      allBonus.push(...PRODUCTS['mente-blindada'].bonus.map(bonus => ({
        ...bonus,
        productName: 'Mente Blindada 21'
      })));
    }

    return allBonus;
  };

  const bonusList = getAllBonus();

  return (
    <div className="space-y-6 md:space-y-8 px-4 md:px-0">
      {/* Header - Mobile optimized */}
      <div className="text-center py-8 md:py-12">
        <div className="inline-flex items-center justify-center w-16 md:w-20 h-16 md:h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl md:rounded-3xl mb-4 md:mb-6">
          <Gift className="w-8 md:w-10 h-8 md:h-10 text-black" />
        </div>
        
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 md:mb-4">
          Bônus <span className="text-yellow-400">Exclusivos</span>
        </h1>
        <p className="text-base md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Materiais premium para acelerar sua transformação mental. Cada bônus foi projetado para complementar sua jornada.
        </p>
      </div>

      {/* Bônus Cards - Mobile grid com hover otimizado */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
        {bonusList.map((bonus, index) => (
          <div 
            key={bonus.id} 
            className="group bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 hover:border-yellow-400/50 rounded-2xl md:rounded-3xl p-4 md:p-8 transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-yellow-400/10"
          >
            <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
              <div className="flex-shrink-0 mx-auto md:mx-0">
                <div className="w-12 md:w-16 h-12 md:h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl md:rounded-2xl flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-105 group-hover:rotate-3">
                  <Gift className="w-6 md:w-8 h-6 md:h-8 text-black transition-transform duration-300 ease-out group-hover:scale-110" />
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3 md:mb-4">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors duration-300">
                      {bonus.title}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-400 mb-2">{bonus.productName}</p>
                  </div>
                  
                  {user?.accessLevel === 'premium' && bonus.productName.includes('Blindada') && (
                    <Crown className="w-4 md:w-5 h-4 md:h-5 text-yellow-400 mx-auto md:mx-0 mb-2 md:mb-0 transition-transform duration-300 ease-out group-hover:scale-110" />
                  )}
                </div>

                <p className="text-gray-300 mb-4 md:mb-6 leading-relaxed text-sm md:text-base transition-colors duration-300 group-hover:text-gray-200">
                  {bonus.description}
                </p>

                <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
                  <button className="flex items-center justify-center space-x-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 px-4 md:px-6 py-2.5 md:py-3 rounded-lg md:rounded-xl font-medium transition-all duration-300 text-sm md:text-base border border-yellow-400/30 hover:border-yellow-400/50 hover:shadow-lg hover:shadow-yellow-400/20">
                    <Download className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                    <span>Download</span>
                  </button>

                  <div className="flex items-center justify-center md:justify-start space-x-1 text-gray-400 transition-colors duration-300 group-hover:text-yellow-400">
                    <Star className="w-3 md:w-4 h-3 md:h-4 fill-current text-yellow-400 transition-transform duration-300 group-hover:scale-110" />
                    <span className="text-xs md:text-sm font-medium">Exclusivo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA para upgrade se for usuário básico - Mobile optimized */}
      {user?.accessLevel === 'basic' && (
        <div className="bg-gradient-to-r from-yellow-500/10 to-green-500/10 border border-yellow-400/20 rounded-2xl md:rounded-3xl p-6 md:p-8 text-center transition-all duration-500 hover:border-yellow-400/40 hover:shadow-lg hover:shadow-yellow-400/10">
          <Crown className="w-10 md:w-12 h-10 md:h-12 text-yellow-400 mx-auto mb-3 md:mb-4 transition-transform duration-300 hover:scale-110" />
          <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">
            Desbloqueie Ainda Mais Bônus
          </h3>
          <p className="text-gray-300 mb-4 md:mb-6 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Com o acesso Premium, você ganha 6 bônus adicionais exclusivos do Mente Blindada 21, incluindo certificado digital e materiais avançados.
          </p>
          <div className="inline-flex items-center space-x-2 text-yellow-400 font-medium text-sm md:text-base">
            <Crown className="w-4 md:w-5 h-4 md:h-5" />
            <span>Upgrade para Premium disponível</span>
          </div>
        </div>
      )}

      {/* Footer - Mobile optimized */}
      <div className="text-center pt-8 md:pt-12 border-t border-gray-800">
        <p className="text-gray-500 italic max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
          "Cada bônus é uma ferramenta de poder. Use-os para acelerar sua transformação e manter o foco na jornada para a versão imparável de si mesmo."
        </p>
      </div>
    </div>
  );
};