import React, { useState } from 'react';
import { Shield, Lock, Eye, EyeOff, Sparkles, Crown, Star, Zap, Diamond, Gem, Award, Target } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LoginScreen: React.FC = () => {
  const [accessKey, setAccessKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simular delay para experiência premium
    await new Promise(resolve => setTimeout(resolve, 1500));

    const success = login(accessKey);
    if (!success) {
      setError('Chave de acesso inválida. Verifique e tente novamente.');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Premium com múltiplas camadas */}
      <div className="absolute inset-0">
        {/* Gradiente base */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/15 via-black to-yellow-500/15"></div>
        
        {/* Mesh gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-gray-900/50 to-black opacity-80"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-emerald-400/10 to-green-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-yellow-400/10 to-amber-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-green-400/5 to-emerald-400/5 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>
        
        {/* Floating particles - Responsivos */}
        <div className="absolute top-10 md:top-20 left-5 md:left-10 w-2 h-2 bg-emerald-400 rounded-full animate-float opacity-60"></div>
        <div className="absolute top-32 md:top-40 right-8 md:right-20 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-float delay-700 opacity-40"></div>
        <div className="absolute bottom-20 md:bottom-32 left-1/3 w-1 h-1 bg-green-400 rounded-full animate-float delay-300 opacity-50"></div>
        <div className="absolute top-2/3 right-8 md:right-16 w-1.5 h-1.5 bg-amber-400 rounded-full animate-float delay-1000 opacity-30"></div>
        <div className="absolute bottom-1/3 left-8 md:left-20 w-1 h-1 bg-emerald-400 rounded-full animate-float delay-500 opacity-40"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row">
        {/* Lado esquerdo - Branding Premium (Desktop) */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-8 xl:p-16 relative">
          <div className="max-w-lg text-center space-y-8 xl:space-y-12">
            {/* Produto Hero com design ultra premium */}
            <div className="relative group">
              <div className="relative w-80 xl:w-96 h-96 xl:h-[28rem] mx-auto">
                {/* Múltiplos anéis de glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/30 via-green-400/20 to-yellow-400/30 rounded-[3rem] blur-3xl group-hover:blur-2xl transition-all duration-1000 animate-pulse"></div>
                <div className="absolute inset-2 bg-gradient-to-br from-yellow-400/20 via-amber-400/15 to-emerald-400/20 rounded-[2.5rem] blur-2xl group-hover:blur-xl transition-all duration-1000 animate-pulse delay-500"></div>
                
                {/* Anel rotativo externo */}
                <div className="absolute inset-6 border-2 border-gradient-to-r from-emerald-400/40 via-yellow-400/40 to-emerald-400/40 rounded-[2rem] animate-spin-slow"></div>
                <div className="absolute inset-8 border border-gradient-to-r from-yellow-400/30 via-green-400/30 to-yellow-400/30 rounded-[1.5rem] animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '12s' }}></div>
                
                {/* Container principal do produto */}
                <div className="relative w-full h-full bg-gradient-to-br from-gray-900/95 via-black to-gray-900/95 rounded-[3rem] overflow-hidden border-2 border-gray-700/50 backdrop-blur-xl group-hover:border-emerald-400/50 transition-all duration-700 shadow-2xl">
                  {/* Reflexos e highlights */}
                  <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/10 via-white/5 to-transparent rounded-t-[3rem]"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-emerald-400/5 to-transparent rounded-b-[3rem]"></div>
                  
                  {/* Imagem do produto */}
                  <div className="relative w-full h-full p-8 xl:p-12 flex items-center justify-center">
                    <img 
                      src="https://i.postimg.cc/w1QDy5xy/image.png" 
                      alt="Mente Imparável - Acesso Premium"
                      className="w-full h-full object-contain filter drop-shadow-2xl group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  
                  {/* Overlay com efeito holográfico */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-emerald-400/5 to-transparent rounded-[3rem] group-hover:via-emerald-400/10 transition-all duration-700"></div>
                </div>
                
                {/* Elementos decorativos flutuantes premium */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-yellow-400 via-amber-400 to-yellow-600 rounded-2xl flex items-center justify-center shadow-2xl animate-float transform rotate-12">
                  <Crown className="w-8 h-8 text-black" />
                </div>
                
                <div className="absolute -bottom-3 -left-3 w-12 h-12 bg-gradient-to-br from-emerald-400 via-green-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-2xl animate-float-delayed transform -rotate-12">
                  <Diamond className="w-6 h-6 text-black" />
                </div>
                
                <div className="absolute top-1/4 -right-6 w-10 h-10 bg-gradient-to-br from-yellow-400/90 to-amber-400/90 rounded-full shadow-xl animate-float delay-700 flex items-center justify-center">
                  <Gem className="w-5 h-5 text-black" />
                </div>
                
                <div className="absolute bottom-1/3 -left-5 w-8 h-8 bg-gradient-to-br from-emerald-400/80 to-green-400/80 rounded-lg shadow-lg animate-float delay-1000 flex items-center justify-center">
                  <Star className="w-4 h-4 text-black" />
                </div>
                
                {/* Partículas de energia premium */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-ping absolute -top-8 -left-6 opacity-60"></div>
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping absolute -bottom-6 right-8 delay-700 opacity-50"></div>
                  <div className="w-1 h-1 bg-amber-400 rounded-full animate-ping absolute top-8 -right-10 delay-1000 opacity-40"></div>
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-ping absolute -top-4 right-6 delay-300 opacity-50"></div>
                </div>
                
                {/* Base com reflexo premium */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-64 h-6 bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent rounded-full blur-lg"></div>
              </div>
            </div>

            {/* Título com efeito premium */}
            <div className="space-y-6">
              <div className="relative">
                <h1 className="text-5xl xl:text-6xl font-bold text-white leading-tight relative z-10">
                  Mente <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-400 to-yellow-400 animate-pulse">Imparável</span>
                </h1>
                <div className="absolute inset-0 text-5xl xl:text-6xl font-bold text-emerald-400/20 blur-sm">
                  Mente Imparável
                </div>
              </div>
              
              <div className="space-y-3">
                <p className="text-xl xl:text-2xl text-gray-200 font-semibold">
                  Área Exclusiva de Membros
                </p>
                <p className="text-lg xl:text-xl text-gray-400 font-medium">
                  Transformação Mental de Elite
                </p>
              </div>
            </div>

            {/* Features premium com ícones */}
            <div className="grid grid-cols-1 gap-4 mt-12">
              {[
                { icon: Shield, text: "Acesso vitalício aos conteúdos", color: "emerald" },
                { icon: Crown, text: "Materiais exclusivos e bônus", color: "yellow" },
                { icon: Award, text: "Suporte premium incluso", color: "green" },
                { icon: Target, text: "Certificado de conclusão", color: "amber" }
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-4 text-gray-300 group hover:text-white transition-colors">
                  <div className={`w-3 h-3 bg-${feature.color}-400 rounded-full animate-pulse`} style={{ animationDelay: `${index * 300}ms` }}></div>
                  <feature.icon className={`w-5 h-5 text-${feature.color}-400 group-hover:scale-110 transition-transform`} />
                  <span className="text-sm xl:text-base font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Quote premium */}
            <div className="mt-16 p-8 bg-gradient-to-r from-gray-900/60 via-gray-800/60 to-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 via-transparent to-yellow-400/5"></div>
              <div className="relative z-10">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-600 rounded-full flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-black" />
                  </div>
                </div>
                <p className="text-gray-300 italic text-center leading-relaxed font-medium text-base xl:text-lg">
                  "Você não comprou um produto. Você comprou um código. Uma nova versão. Uma mente que não volta atrás."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Lado direito - Formulário Premium */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 md:p-8 min-h-screen">
          <div className="w-full max-w-md">
            {/* Logo mobile premium */}
            <div className="lg:hidden text-center mb-8 md:mb-12">
              <div className="relative w-40 md:w-48 h-48 md:h-56 mx-auto mb-6">
                {/* Glow effects múltiplos */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/30 via-green-400/20 to-yellow-400/30 rounded-3xl blur-2xl animate-pulse"></div>
                <div className="absolute inset-2 bg-gradient-to-br from-yellow-400/20 to-emerald-400/20 rounded-2xl blur-xl animate-pulse delay-500"></div>
                
                {/* Container da imagem mobile */}
                <div className="relative w-full h-full bg-gradient-to-br from-gray-900/95 via-black to-gray-900/95 rounded-3xl overflow-hidden border-2 border-gray-700/50 backdrop-blur-xl shadow-2xl">
                  <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/8 to-transparent rounded-t-3xl"></div>
                  <img 
                    src="https://i.postimg.cc/w1QDy5xy/image.png" 
                    alt="Mente Imparável"
                    className="w-full h-full object-contain p-4 md:p-6 filter drop-shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-emerald-400/5 to-transparent rounded-3xl"></div>
                </div>
                
                {/* Elementos decorativos mobile */}
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-xl flex items-center justify-center animate-float">
                  <Crown className="w-5 h-5 text-black" />
                </div>
                <div className="absolute -bottom-1 -left-1 w-8 h-8 bg-gradient-to-br from-emerald-400 to-green-600 rounded-lg flex items-center justify-center animate-float-delayed">
                  <Diamond className="w-4 h-4 text-black" />
                </div>
              </div>
              
              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl font-bold text-white relative">
                  Mente <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-yellow-400">Imparável</span>
                </h1>
                <p className="text-gray-400 text-base md:text-lg font-medium">Área Exclusiva de Membros</p>
              </div>
            </div>

            {/* Card do formulário premium */}
            <div className="bg-gray-900/90 backdrop-blur-2xl border-2 border-gray-800/50 rounded-3xl md:rounded-[2rem] p-6 md:p-10 shadow-2xl relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 via-transparent to-yellow-400/5 rounded-3xl md:rounded-[2rem]"></div>
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, rgba(16, 185, 129, 0.3) 1px, transparent 0)`,
                  backgroundSize: '30px 30px'
                }}></div>
              </div>
              
              <div className="relative z-10">
                {/* Header premium */}
                <div className="text-center mb-8 md:mb-10">
                  <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-emerald-400/20 via-green-400/20 to-yellow-400/20 px-4 md:px-6 py-3 rounded-full mb-4 md:mb-6 border border-emerald-400/30">
                    <Shield className="w-4 md:w-5 h-4 md:h-5 text-emerald-400" />
                    <span className="text-emerald-400 text-sm md:text-base font-semibold">Acesso Ultra Seguro</span>
                    <Gem className="w-4 md:w-5 h-4 md:h-5 text-yellow-400" />
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4">
                    Entre na <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-yellow-400">Sala Secreta</span>
                  </h2>
                  <p className="text-gray-400 text-sm md:text-base font-medium">
                    Onde se moldam os novos ricos
                  </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6 md:space-y-8">
                  <div>
                    <label className="block text-sm md:text-base font-bold text-gray-300 mb-3 md:mb-4">
                      Chave de Acesso Premium
                    </label>
                    <div className="relative group">
                      <input
                        type={showKey ? 'text' : 'password'}
                        value={accessKey}
                        onChange={(e) => setAccessKey(e.target.value)}
                        className="w-full bg-black/60 border-2 border-gray-700/50 rounded-xl md:rounded-2xl px-4 md:px-6 py-4 md:py-5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all pr-14 text-sm md:text-base font-medium backdrop-blur-sm group-hover:border-gray-600/50"
                        placeholder="Digite sua chave exclusiva..."
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowKey(!showKey)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-emerald-400 transition-colors p-1"
                      >
                        {showKey ? <EyeOff className="w-5 md:w-6 h-5 md:h-6" /> : <Eye className="w-5 md:w-6 h-5 md:h-6" />}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-500/10 border-2 border-red-500/30 rounded-xl md:rounded-2xl p-4 md:p-5 backdrop-blur-sm">
                      <p className="text-red-400 text-sm md:text-base font-medium">{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-600 hover:from-emerald-500 hover:via-green-600 hover:to-emerald-700 text-black font-bold py-4 md:py-5 px-6 md:px-8 rounded-xl md:rounded-2xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:transform-none shadow-2xl relative overflow-hidden group text-sm md:text-base"
                  >
                    {/* Shimmer effect premium */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 md:w-6 h-5 md:h-6 border-3 border-black/30 border-t-black rounded-full animate-spin mr-3"></div>
                        Validando acesso premium...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Lock className="w-5 md:w-6 h-5 md:h-6 mr-3" />
                        Acessar Área Secreta
                        <Zap className="w-5 md:w-6 h-5 md:h-6 ml-3" />
                      </div>
                    )}
                  </button>
                </form>

                {/* Info premium */}
                <div className="mt-8 md:mt-10 pt-6 md:pt-8 border-t border-gray-800/50">
                  <div className="text-center space-y-4">
                    <div className="inline-flex items-center space-x-2 text-gray-400 text-xs md:text-sm">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span>Sua chave de acesso foi enviada por email após a compra</span>
                      <Gem className="w-4 h-4 text-emerald-400" />
                    </div>
                    
                    {/* Trust indicators */}
                    <div className="flex items-center justify-center space-x-6 text-gray-500 text-xs">
                      <div className="flex items-center space-x-1">
                        <Shield className="w-3 h-3" />
                        <span>100% Seguro</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Lock className="w-3 h-3" />
                        <span>Criptografado</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Crown className="w-3 h-3 text-yellow-400" />
                        <span>Premium</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};