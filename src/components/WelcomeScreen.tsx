import React from 'react';
import { ArrowRight, Sparkles, Target, Crown } from 'lucide-react';

interface WelcomeScreenProps {
  onContinue: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onContinue }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-yellow-500/10"></div>
      
      {/* Elementos decorativos - Responsivos */}
      <div className="absolute top-10 md:top-20 left-10 md:left-20 w-1.5 md:w-2 h-1.5 md:h-2 bg-green-400 rounded-full animate-pulse"></div>
      <div className="absolute top-20 md:top-40 right-16 md:right-32 w-1 h-1 bg-yellow-400 rounded-full animate-pulse delay-1000"></div>
      <div className="absolute bottom-16 md:bottom-32 left-1/4 w-1 md:w-1.5 h-1 md:h-1.5 bg-green-400 rounded-full animate-pulse delay-500"></div>

      <div className="relative max-w-4xl mx-auto text-center px-4">
        {/* Mockup do produto com nova imagem personalizada - Mobile optimized */}
        <div className="mb-8 md:mb-12 relative">
          <div className="relative w-32 md:w-40 h-40 md:h-48 mx-auto mb-6 md:mb-8">
            {/* Glow effect de fundo */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 via-yellow-400/10 to-green-400/20 rounded-2xl md:rounded-3xl blur-xl md:blur-2xl"></div>
            
            {/* Container da imagem principal */}
            <div className="relative w-full h-full bg-gradient-to-br from-gray-900/90 via-black to-gray-900/90 rounded-2xl md:rounded-3xl overflow-hidden border border-gray-700/50 backdrop-blur-sm hover:border-green-400/30 transition-all duration-500 transform hover:scale-105">
              {/* Reflexo superior */}
              <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/5 to-transparent rounded-t-2xl md:rounded-t-3xl"></div>
              
              {/* Nova imagem do produto */}
              <div className="relative w-full h-full p-3 md:p-4 flex items-center justify-center">
                <img 
                  src="https://i.imgur.com/awXGI1I.png" 
                  alt="Mente Imparável - Bem-vindo à Sala Secreta"
                  className="w-full h-full object-contain filter drop-shadow-2xl"
                />
              </div>
              
              {/* Overlay com gradiente sutil */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl md:rounded-3xl"></div>
            </div>
          </div>
          
          <div className="absolute -top-1 md:-top-2 -right-1 md:-right-2 w-6 md:w-8 h-6 md:h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-float">
            <Sparkles className="w-3 md:w-4 h-3 md:h-4 text-black" />
          </div>
        </div>

        {/* Mensagem de boas-vindas - Mobile optimized */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
          Bem-vindo à <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-yellow-400">
            Sala Secreta
          </span>
        </h1>

        <div className="space-y-3 md:space-y-4 mb-8 md:mb-12">
          <p className="text-lg md:text-xl lg:text-2xl text-gray-300 font-medium">
            Aqui se moldam os novos ricos.
          </p>
          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed px-4">
            Prepare-se para o renascimento. Sua jornada de transformação mental começa agora.
          </p>
        </div>

        {/* Features destacadas com imagens personalizadas - Mobile grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12 max-w-3xl mx-auto">
          <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-xl md:rounded-2xl p-4 md:p-6 hover:border-green-400/30 transition-all duration-300">
            <div className="w-12 md:w-16 h-12 md:h-16 mx-auto mb-3 md:mb-4 rounded-lg md:rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 p-1.5 md:p-2">
              <img 
                src="https://i.imgur.com/Rsioru5.png" 
                alt="Foco Laser"
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="text-white font-semibold mb-2 text-sm md:text-base">Foco Laser</h3>
            <p className="text-gray-400 text-xs md:text-sm">Mentalidade direcionada para resultados</p>
          </div>
          
          <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-xl md:rounded-2xl p-4 md:p-6 hover:border-yellow-400/30 transition-all duration-300">
            <div className="w-12 md:w-16 h-12 md:h-16 mx-auto mb-3 md:mb-4 rounded-lg md:rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 p-1.5 md:p-2">
              <img 
                src="https://i.imgur.com/XG4VWGZ.jpeg" 
                alt="Elite Mental"
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="text-white font-semibold mb-2 text-sm md:text-base">Elite Mental</h3>
            <p className="text-gray-400 text-xs md:text-sm">Acesso ao mindset dos top 1%</p>
          </div>
          
          <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-xl md:rounded-2xl p-4 md:p-6 hover:border-green-400/30 transition-all duration-300 md:col-span-1 col-span-1">
            <div className="w-12 md:w-16 h-12 md:h-16 mx-auto mb-3 md:mb-4 rounded-lg md:rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 p-1.5 md:p-2">
              <img 
                src="https://i.imgur.com/mrffqkg.png" 
                alt="Transformação"
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="text-white font-semibold mb-2 text-sm md:text-base">Transformação</h3>
            <p className="text-gray-400 text-xs md:text-sm">Evolução acelerada garantida</p>
          </div>
        </div>

        {/* CTA Principal - Mobile optimized */}
        <button
          onClick={onContinue}
          className="group inline-flex items-center space-x-2 md:space-x-3 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-black font-bold py-4 md:py-5 px-6 md:px-8 rounded-xl md:rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl text-sm md:text-lg"
        >
          <span>Acessar a Jornada</span>
          <ArrowRight className="w-4 md:w-6 h-4 md:h-6 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Frase de impacto - Mobile optimized */}
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-800">
          <p className="text-gray-500 text-xs md:text-sm italic max-w-2xl mx-auto px-4">
            "Você não comprou um produto. Você comprou um código. Uma nova versão. Uma mente que não volta atrás."
          </p>
        </div>
      </div>
    </div>
  );
};