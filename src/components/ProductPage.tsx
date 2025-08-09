import React from 'react';
import { Product } from '../types';
import { Play, Shield, Lock, Crown, Award, Clock, ExternalLink, Zap, Star, Gift, Flame, Target, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { OptimizedImage } from './OptimizedImage';

interface ProductPageProps {
  product: Product;
  completedModules: string[];
  onToggleComplete: (moduleId: string) => void;
  onNavigateToNext?: () => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({ 
  product, 
  completedModules, 
  onToggleComplete,
  onNavigateToNext 
}) => {
  const { user } = useAuth();
  const progressPercentage = (completedModules.length / (product.modules.length + product.bonus.length)) * 100;

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
  const isModuleUnlocked = (module: any) => {
    if (module.unlockDay === undefined || module.unlockDay === 0) return true; // Sempre liberado
    return getDaysUntilUnlock(module.unlockDay) === 0;
  };

  // Função para verificar se é módulo especial (Introdução ou Primeiro Dia)
  const isSpecialModule = (module: any) => {
    const specialIds = ['intro', 'cap1', 'dia-1'];
    return specialIds.includes(module.id);
  };

  // Função corrigida para acessar módulos
  const handleModuleAccess = (module: any) => {
    if (!isModuleUnlocked(module)) return;
    
    // Marcar como completo
    onToggleComplete(module.id);
    
    // Abrir Google Drive se houver URL
    if (module.driveUrl) {
      // Garantir que o link abre em nova aba
      const link = document.createElement('a');
      link.href = module.driveUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Componente especial para módulos premium com hover otimizado
  const SpecialModuleCard = ({ module, isCompleted }: { module: any, isCompleted: boolean }) => (
    <div className="relative group bg-gradient-to-br from-yellow-900/30 via-gray-900 to-red-900/30 border-2 border-yellow-400/50 rounded-3xl p-6 md:p-8 overflow-hidden transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-yellow-400/20 hover:border-yellow-400/70">
      {/* Background animado */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-transparent to-red-400/10 animate-pulse"></div>
      
      {/* Elementos decorativos flutuantes com hover otimizado */}
      <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-12">
        <Flame className="w-4 h-4 text-black" />
      </div>
      
      <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-12">
        <Zap className="w-3 h-3 text-white" />
      </div>

      {/* Badge ESPECIAL */}
      <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-red-500 text-black px-3 py-1 rounded-full text-xs font-bold animate-pulse">
        🔥 ESPECIAL
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
        {/* Imagem premium com hover suave */}
        {module.imageUrl && (
          <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 relative overflow-hidden rounded-2xl mx-auto md:mx-0">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-red-400/20 rounded-2xl blur-lg transition-all duration-500 group-hover:blur-md"></div>
            <OptimizedImage
              src={module.imageUrl}
              alt={module.title}
              className="relative w-full h-full transition-transform duration-500 ease-out group-hover:scale-105 rounded-2xl"
              priority={true}
            />
            {isCompleted && (
              <div className="absolute inset-0 bg-green-400/20 flex items-center justify-center rounded-2xl transition-opacity duration-300">
                <Crown className="w-8 h-8 md:w-12 md:h-12 text-yellow-400 transition-transform duration-300 group-hover:scale-110" />
              </div>
            )}
          </div>
        )}

        <div className="flex-1 text-center md:text-left">
          <div className="mb-4">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors duration-300">
              {module.title}
            </h3>
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-3">
              {module.duration && (
                <div className="flex items-center space-x-1 text-yellow-400 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>{module.duration}</span>
                </div>
              )}
              <div className="flex items-center space-x-1 text-red-400 text-sm">
                <Target className="w-4 h-4" />
                <span>IMPERDÍVEL</span>
              </div>
            </div>
          </div>

          <p className="text-gray-300 mb-6 leading-relaxed text-sm md:text-base transition-colors duration-300 group-hover:text-gray-200">
            {module.description}
          </p>

          {/* Super Bônus Destaque com hover otimizado */}
          <div className="bg-gradient-to-r from-yellow-500/20 to-red-500/20 border border-yellow-400/30 rounded-2xl p-4 mb-6 transition-all duration-300 group-hover:border-yellow-400/50 group-hover:shadow-lg group-hover:shadow-yellow-400/10">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Gift className="w-5 h-5 text-yellow-400 transition-transform duration-300 group-hover:scale-110" />
              <span className="text-yellow-400 font-bold text-sm">SUPER BÔNUS INCLUÍDO</span>
              <Sparkles className="w-5 h-5 text-yellow-400 transition-transform duration-300 group-hover:scale-110" />
            </div>
            <p className="text-gray-300 text-xs md:text-sm text-center transition-colors duration-300 group-hover:text-gray-200">
              Material exclusivo de alta performance + Estratégias secretas dos top 1%
            </p>
          </div>

          {/* Chamadas para ação múltiplas com hover otimizado */}
          <div className="space-y-3">
            <button
              onClick={() => handleModuleAccess(module)}
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-yellow-400 to-red-500 hover:from-yellow-500 hover:to-red-600 text-black font-bold py-4 px-6 rounded-2xl transition-all duration-300 ease-out hover:shadow-2xl hover:shadow-yellow-400/30 hover:scale-[1.02]"
            >
              <ExternalLink className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              <span>{isCompleted ? 'ACESSAR NOVAMENTE' : 'COMEÇAR AGORA'}</span>
              <Flame className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
            </button>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-black/30 border border-yellow-400/30 rounded-xl p-3 text-center transition-all duration-300 hover:border-yellow-400/50 hover:bg-yellow-400/5">
                <Star className="w-5 h-5 text-yellow-400 mx-auto mb-1 transition-transform duration-300 hover:scale-110" />
                <span className="text-yellow-400 text-xs font-bold">EXCLUSIVO</span>
              </div>
              <div className="bg-black/30 border border-red-400/30 rounded-xl p-3 text-center transition-all duration-300 hover:border-red-400/50 hover:bg-red-400/5">
                <Zap className="w-5 h-5 text-red-400 mx-auto mb-1 transition-transform duration-300 hover:scale-110" />
                <span className="text-red-400 text-xs font-bold">URGENTE</span>
              </div>
            </div>
          </div>

          {/* Urgência forçada */}
          <div className="mt-4 text-center">
            <p className="text-red-400 text-xs font-bold animate-pulse">
              ⚡ NÃO DEIXE PARA DEPOIS - SUA TRANSFORMAÇÃO COMEÇA AQUI
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Módulos específicos do Mente Blindada 21 com as imagens originais
  const menteBlindadaModules = [
    {
      id: 'dia-1',
      title: 'DIA 1 - Despertar',
      description: 'O primeiro passo para sua transformação mental',
      image: 'https://i.imgur.com/jShh59j.png',
      color: 'from-green-400 to-green-600',
      duration: '25 min',
      unlockDay: 0,
      driveUrl: 'https://drive.google.com/drive/folders/1iYicVgWn6011cbP9M5POuYp2tcHAHXPc?usp=sharing'
    },
    {
      id: 'dia-2',
      title: 'DIA 2 - Desconstrução',
      description: 'Quebrando padrões limitantes do passado',
      image: 'https://i.imgur.com/psyHQBE.jpeg',
      color: 'from-blue-400 to-blue-600',
      duration: '28 min',
      unlockDay: 1,
      driveUrl: 'https://drive.google.com/drive/folders/1wGzTbndu3B3gzTpNKdH6MDfYrxPkHB0H?usp=sharing'
    },
    {
      id: 'dia-3',
      title: 'DIA 3 - Fundação',
      description: 'Construindo bases sólidas para o novo você',
      image: 'https://i.imgur.com/nUWrGmf.png',
      color: 'from-yellow-400 to-yellow-600',
      duration: '30 min',
      unlockDay: 2,
      driveUrl: 'https://drive.google.com/drive/folders/1QZxMRoZATzzGheybkM1OVSxdZ2wOqSSA?usp=sharing'
    },
    {
      id: 'dia-4',
      title: 'DIA 4 - Força',
      description: 'Desenvolvendo poder mental inabalável',
      image: 'https://i.imgur.com/ktA19bj.jpeg',
      color: 'from-red-400 to-red-600',
      duration: '27 min',
      unlockDay: 3,
      driveUrl: 'https://drive.google.com/drive/folders/1Qt8JUZxz3CfvbDdkdoxaNx4Y5DnS7yr3?usp=sharing'
    },
    {
      id: 'dia-5',
      title: 'DIA 5 - Foco',
      description: 'Laser mental para resultados precisos',
      image: 'https://i.imgur.com/ZyZof8g.png',
      color: 'from-purple-400 to-purple-600',
      duration: '32 min',
      unlockDay: 4,
      driveUrl: 'https://drive.google.com/drive/folders/1CV04yRTYIQioFRkdvqSvTBI9yCoJxnuY?usp=sharing'
    },
    {
      id: 'dia-6',
      title: 'DIA 6 - Fluxo',
      description: 'Entrando no estado de alta performance',
      image: 'https://i.imgur.com/26jW1GJ.png',
      color: 'from-cyan-400 to-cyan-600',
      duration: '29 min',
      unlockDay: 5,
      driveUrl: 'https://drive.google.com/drive/folders/18TFySD1K6uvAJeaWCl4SumQZPBd64iCN?usp=sharing'
    },
    {
      id: 'dia-7',
      title: 'DIA 7 - Fé',
      description: 'Convicção inabalável em seu potencial',
      image: 'https://i.imgur.com/Cd7O2br.jpeg',
      color: 'from-indigo-400 to-indigo-600',
      duration: '26 min',
      unlockDay: 6,
      driveUrl: 'https://drive.google.com/drive/folders/1nhlR1hIzT86bU8h3qSlHJP7p6Pk07ZYu?usp=sharing'
    },
    {
      id: 'dia-8',
      title: 'DIA 8 - Coragem',
      description: 'Enfrentando medos com determinação',
      image: 'https://i.imgur.com/TFpJjha.jpeg',
      color: 'from-orange-400 to-orange-600',
      duration: '31 min',
      unlockDay: 7,
      driveUrl: 'https://drive.google.com/drive/folders/1ozKX_S44A9AZkhJk3skOIVWfU_lgjs2f?usp=sharing'
    },
    {
      id: 'dia-9',
      title: 'DIA 9 - Clareza',
      description: 'Visão cristalina dos seus objetivos',
      image: 'https://i.imgur.com/JC2m55z.png',
      color: 'from-teal-400 to-teal-600',
      duration: '24 min',
      unlockDay: 8,
      driveUrl: 'https://drive.google.com/drive/folders/1NmhB_TnRaoIuj7ePjk6RiZGmlhzDhqv4?usp=sharing'
    },
    {
      id: 'dia-10',
      title: 'DIA 10 - Conquista',
      description: 'Mentalidade de vitória absoluta',
      image: 'https://i.imgur.com/wzVpqRs.png',
      color: 'from-emerald-400 to-emerald-600',
      duration: '33 min',
      unlockDay: 9,
      driveUrl: 'https://drive.google.com/drive/folders/11sA6-XF18WktXDVH1qTzBhpr-QttQQDr?usp=sharing'
    },
    {
      id: 'dia-11',
      title: 'DIA 11 - Consistência',
      description: 'Disciplina que gera resultados exponenciais',
      image: 'https://i.imgur.com/k6bBowr.png',
      color: 'from-lime-400 to-lime-600',
      duration: '28 min',
      unlockDay: 10,
      driveUrl: 'https://drive.google.com/drive/folders/1ZWqyItd96cjNmM1Fl6O_RiUMmxDAjFsz?usp=sharing'
    },
    {
      id: 'dia-12',
      title: 'DIA 12 - Criação',
      description: 'Moldando sua realidade com propósito',
      image: 'https://i.imgur.com/tXTQrjG.png',
      color: 'from-amber-400 to-amber-600',
      duration: '30 min',
      unlockDay: 11,
      driveUrl: 'https://drive.google.com/drive/folders/1Hj0w8F20TZuBAg70ZYyjqEtvorGRIlI6?usp=sharing'
    },
    {
      id: 'dia-13',
      title: 'DIA 13 - Comando',
      description: 'Liderança sobre sua própria vida',
      image: 'https://i.imgur.com/kQVO6Zc.jpeg',
      color: 'from-rose-400 to-rose-600',
      duration: '27 min',
      unlockDay: 12,
      driveUrl: 'https://drive.google.com/drive/folders/12OcafR-JgaZp6JbDkvQ_3kznfTNPMfWH?usp=sharing'
    },
    {
      id: 'dia-14',
      title: 'DIA 14 - Controle',
      description: 'Domínio total sobre suas emoções',
      image: 'https://i.imgur.com/tBI47lw.png',
      color: 'from-violet-400 to-violet-600',
      duration: '29 min',
      unlockDay: 13,
      driveUrl: 'https://drive.google.com/drive/folders/1L0QD9xUmVHscbEFS2XRaSW19knNwMbP9?usp=sharing'
    },
    {
      id: 'dia-15',
      title: 'DIA 15 - Disciplina',
      description: 'A força que move montanhas',
      image: 'https://i.imgur.com/ELYhO4z.png',
      color: 'from-fuchsia-400 to-fuchsia-600',
      duration: '35 min',
      unlockDay: 14,
      driveUrl: 'https://drive.google.com/drive/folders/14DyR0PLrG_Od5Mz2JfGh8K8tmjWfYlpE?usp=sharing'
    },
    {
      id: 'dia-16',
      title: 'DIA 16 - Determinação',
      description: 'Vontade inquebrantável de vencer',
      image: 'https://vidagold.fun/CURA%20NATURAL/wp-content/uploads/2025/07/ChatGPT-Image-1-de-jul.-de-2025-13_13_02-1024x683.png',
      color: 'from-pink-400 to-pink-600',
      duration: '26 min',
      unlockDay: 15,
      driveUrl: 'https://drive.google.com/drive/folders/1mtfA2Bp590wNpKRZWf4P_9zfBqSAYROK?usp=sharing'
    },
    {
      id: 'dia-17',
      title: 'DIA 17 - Dominância',
      description: 'Supremacia mental sobre obstáculos',
      image: 'https://vidagold.fun/CURA%20NATURAL/wp-content/uploads/2025/07/ChatGPT-Image-1-de-jul.-de-2025-13_19_21-1024x683.png',
      color: 'from-red-400 to-red-600',
      duration: '31 min',
      unlockDay: 16,
      driveUrl: 'https://drive.google.com/drive/folders/1x8BIdONgesAlBHOu80kpxbQfuKwwqlOv?usp=sharing'
    },
    {
      id: 'dia-18',
      title: 'DIA 18 - Evolução',
      description: 'Transformação contínua e imparável',
      image: 'https://vidagold.fun/CURA%20NATURAL/wp-content/uploads/2025/07/ChatGPT-Image-1-de-jul.-de-2025-13_24_59.png',
      color: 'from-blue-400 to-blue-600',
      duration: '28 min',
      unlockDay: 17,
      driveUrl: 'https://drive.google.com/drive/folders/1JD2NUXptTSXgzoY966kaUQO6fzF8h6G0?usp=sharing'
    },
    {
      id: 'dia-19',
      title: 'DIA 19 - Excelência',
      description: 'Padrão de qualidade superior',
      image: 'https://vidagold.fun/CURA%20NATURAL/wp-content/uploads/2025/07/ChatGPT-Image-1-de-jul.-de-2025-13_26_49.png',
      color: 'from-green-400 to-green-600',
      duration: '32 min',
      unlockDay: 18,
      driveUrl: 'https://drive.google.com/drive/folders/1T3G0p8DXxcP8VJ6zi__9nn9crgOI2klP?usp=sharing'
    },
    {
      id: 'dia-20',
      title: 'DIA 20 - Vitória',
      description: 'O triunfo da nova versão de você',
      image: 'https://vidagold.fun/CURA%20NATURAL/wp-content/uploads/2025/07/ChatGPT-Image-1-de-jul.-de-2025-13_29_51.png',
      color: 'from-yellow-400 to-yellow-600',
      duration: '34 min',
      unlockDay: 19,
      driveUrl: 'https://drive.google.com/drive/folders/1cQCbi-gqPxeOv2htzGiNOIpodl1oe-VP?usp=sharing'
    },
    {
      id: 'dia-21',
      title: 'DIA 21 - Ritual de Fogo',
      description: 'A cerimônia final da sua transformação',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&auto=format&q=80',
      color: 'from-red-500 to-orange-500',
      duration: '40 min',
      unlockDay: 20,
      driveUrl: 'https://drive.google.com/drive/folders/1SK6-d7HQNErDcxpnMjImQULp_sdUkNIA?usp=sharing'
    }
  ];

  if (product.id === 'mente-blindada') {
    return (
      <div className="space-y-4 md:space-y-8 px-2 md:px-0">
        {/* Header do Produto - Otimizado para mobile */}
        <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-xl md:rounded-3xl p-4 md:p-8 border border-gray-700">
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-start md:justify-between">
            <div className="flex-1">
              <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">{product.name}</h1>
              <h2 className="text-base md:text-xl text-green-400 font-semibold mb-3 md:mb-4">{product.subtitle}</h2>
              <p className="text-gray-300 text-sm md:text-lg leading-relaxed">{product.description}</p>
            </div>
            
            <div className="md:ml-8 flex justify-center md:justify-end">
              <div className="bg-black/30 rounded-xl md:rounded-2xl p-3 md:p-4 border border-gray-700">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1 text-center">
                  {Math.round(progressPercentage)}%
                </div>
                <div className="text-gray-400 text-xs md:text-sm text-center">Completo</div>
                <div className="w-16 md:w-20 h-2 bg-gray-700 rounded-full mt-2">
                  <div 
                    className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DIA 1 - Módulo Especial */}
        <div className="space-y-4 md:space-y-6">
          <div className="flex items-center space-x-2 md:space-x-3 px-2 md:px-0">
            <Flame className="w-5 h-5 md:w-6 md:h-6 text-red-400" />
            <h3 className="text-lg md:text-2xl font-bold text-white">INÍCIO EXPLOSIVO</h3>
            <Zap className="w-5 h-5 md:w-6 md:h-6 text-yellow-400" />
          </div>
          
          <SpecialModuleCard 
            module={{
              ...menteBlindadaModules[0],
              imageUrl: menteBlindadaModules[0].image
            }} 
            isCompleted={completedModules.includes('dia-1')} 
          />
        </div>

        {/* Grid de Módulos Restantes com hover otimizado */}
        <div className="space-y-4 md:space-y-6">
          <div className="flex items-center space-x-2 md:space-x-3 px-2 md:px-0">
            <Award className="w-5 h-5 md:w-6 md:h-6 text-green-400" />
            <h3 className="text-lg md:text-2xl font-bold text-white">JORNADA DE 21 DIAS</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
            {menteBlindadaModules.slice(1).map((module, index) => {
              const isCompleted = completedModules.includes(module.id);
              const isUnlocked = isModuleUnlocked(module);
              const daysUntilUnlock = getDaysUntilUnlock(module.unlockDay || 0);
              
              return (
                <div 
                  key={module.id}
                  className={`group bg-gray-900/90 border border-gray-700/50 rounded-lg md:rounded-2xl overflow-hidden transition-all duration-500 ease-out ${
                    isUnlocked 
                      ? 'hover:bg-gray-800/90 hover:border-green-400/30 cursor-pointer hover:shadow-lg hover:shadow-green-400/10' 
                      : 'opacity-60 cursor-not-allowed'
                  }`}
                  onClick={() => isUnlocked && handleModuleAccess(module)}
                >
                  {/* Imagem do módulo com hover suave */}
                  <div className="relative h-32 sm:h-36 md:h-48 overflow-hidden">
                    <OptimizedImage
                      src={module.image}
                      alt={module.title}
                      className={`w-full h-full transition-all duration-500 ease-out ${
                        isUnlocked ? 'group-hover:scale-105' : 'grayscale'
                      }`}
                      priority={index < 4}
                    />
                    
                    {/* Cadeado para módulos bloqueados */}
                    {!isUnlocked && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
                        <Lock className="w-8 h-8 md:w-12 md:h-12 text-gray-300 mb-2 animate-lock-pulse" />
                        <div className="text-center px-2">
                          <p className="text-white text-xs md:text-sm font-bold">
                            Libera em {daysUntilUnlock} {daysUntilUnlock === 1 ? 'dia' : 'dias'}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {/* Status de conclusão */}
                    {isCompleted && isUnlocked && (
                      <div className="absolute top-2 right-2 w-6 h-6 md:w-8 md:h-8 bg-green-400 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                        <Award className="w-3 h-3 md:w-5 md:h-5 text-black" />
                      </div>
                    )}
                    
                    {/* Número do dia */}
                    <div className="absolute top-2 left-2 w-6 h-6 md:w-8 md:h-8 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white text-xs md:text-sm font-bold">{index + 2}</span>
                    </div>
                  </div>

                  {/* Conteúdo do card */}
                  <div className="p-3 md:p-6">
                    <div className="flex items-start justify-between mb-1 md:mb-2">
                      <h3 className={`font-bold text-sm md:text-lg leading-tight transition-colors duration-300 ${
                        isUnlocked 
                          ? 'text-white group-hover:text-green-400' 
                          : 'text-gray-400'
                      }`}>
                        {module.title}
                      </h3>
                      {module.duration && (
                        <div className="flex items-center space-x-1 text-gray-400 text-xs ml-2 flex-shrink-0">
                          <Clock className="w-3 h-3" />
                          <span>{module.duration}</span>
                        </div>
                      )}
                    </div>
                    
                    <p className={`text-xs md:text-sm mb-3 md:mb-4 leading-relaxed line-clamp-2 transition-colors duration-300 ${
                      isUnlocked ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-500'
                    }`}>
                      {module.description}
                    </p>
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isUnlocked) handleModuleAccess(module);
                      }}
                      disabled={!isUnlocked}
                      className={`flex items-center justify-center space-x-1 md:space-x-2 px-3 md:px-4 py-2 md:py-2.5 rounded-lg md:rounded-xl font-medium transition-all duration-300 w-full text-xs md:text-base ${
                        !isUnlocked
                          ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed border border-gray-600/50'
                          : isCompleted
                          ? 'bg-green-400/20 text-green-400 hover:bg-green-400/30 border border-green-400/30 hover:shadow-lg hover:shadow-green-400/20'
                          : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-600 hover:border-green-400/30'
                      }`}
                    >
                      {!isUnlocked ? (
                        <>
                          <Lock className="w-3 h-3 md:w-4 md:h-4" />
                          <span>Bloqueado</span>
                        </>
                      ) : (
                        <>
                          <ExternalLink className="w-3 h-3 md:w-4 md:h-4 transition-transform duration-300 group-hover:scale-110" />
                          <span>{isCompleted ? 'Acessar Novamente' : 'Acessar Conteúdo'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bônus Section com hover otimizado */}
        {product.bonus.length > 0 && (
          <div className="space-y-4 md:space-y-6 mt-6 md:mt-12">
            <div className="flex items-center space-x-2 md:space-x-3 px-2 md:px-0">
              <Crown className="w-5 h-5 md:w-6 md:h-6 text-yellow-400" />
              <h3 className="text-lg md:text-2xl font-bold text-white">Bônus Exclusivos</h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-6">
              {product.bonus.map(bonus => {
                const isBonusUnlocked = isModuleUnlocked(bonus);
                const bonusDaysUntilUnlock = getDaysUntilUnlock(bonus.unlockDay || 0);
                
                return (
                  <div key={bonus.id} className={`group bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl md:rounded-3xl p-4 md:p-8 transition-all duration-500 ease-out ${
                    isBonusUnlocked ? 'hover:border-yellow-400/50 cursor-pointer hover:shadow-lg hover:shadow-yellow-400/10' : 'opacity-60 cursor-not-allowed'
                  }`}>
                    <div className="flex items-start space-x-3 md:space-x-6">
                      <div className="flex-shrink-0">
                        <div className={`w-10 h-10 md:w-16 md:h-16 rounded-lg md:rounded-2xl flex items-center justify-center transition-all duration-300 ease-out ${
                          isBonusUnlocked 
                            ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 group-hover:scale-105 group-hover:rotate-3' 
                            : 'bg-gray-600'
                        }`}>
                          {isBonusUnlocked ? (
                            <Crown className="w-5 h-5 md:w-8 md:h-8 text-black transition-transform duration-300 group-hover:scale-110" />
                          ) : (
                            <Lock className="w-5 h-5 md:w-8 md:h-8 text-gray-400" />
                          )}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className={`text-base md:text-xl font-bold mb-2 transition-colors duration-300 ${
                          isBonusUnlocked 
                            ? 'text-white group-hover:text-yellow-400' 
                            : 'text-gray-400'
                        }`}>
                          {bonus.title}
                        </h3>
                        <p className={`mb-3 md:mb-6 leading-relaxed text-xs md:text-base transition-colors duration-300 ${
                          isBonusUnlocked ? 'text-gray-300 group-hover:text-gray-200' : 'text-gray-500'
                        }`}>
                          {bonus.description}
                        </p>

                        {!isBonusUnlocked && (
                          <p className="text-yellow-400 text-xs md:text-sm mb-3 font-medium">
                            🔒 Libera em {bonusDaysUntilUnlock} {bonusDaysUntilUnlock === 1 ? 'dia' : 'dias'}
                          </p>
                        )}

                        <button 
                          onClick={() => isBonusUnlocked && handleModuleAccess(bonus)}
                          disabled={!isBonusUnlocked}
                          className={`flex items-center space-x-1 md:space-x-2 px-3 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl font-medium transition-all duration-300 text-xs md:text-base ${
                            !isBonusUnlocked
                              ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed border border-gray-600/50'
                              : completedModules.includes(bonus.id)
                              ? 'bg-yellow-400/20 text-yellow-400 hover:bg-yellow-400/30 border border-yellow-400/30 hover:shadow-lg hover:shadow-yellow-400/20'
                              : 'bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border border-yellow-400/30 hover:shadow-lg hover:shadow-yellow-400/20'
                          }`}
                        >
                          {!isBonusUnlocked ? (
                            <>
                              <Lock className="w-3 h-3 md:w-4 md:h-4" />
                              <span>Bloqueado</span>
                            </>
                          ) : (
                            <>
                              <ExternalLink className="w-3 h-3 md:w-4 md:h-4 transition-transform duration-300 group-hover:scale-110" />
                              <span>{completedModules.includes(bonus.id) ? 'Acessar Novamente' : 'Acessar Conteúdo'}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Layout para Mente Milionária com módulos especiais e hover otimizado
  return (
    <div className="space-y-4 md:space-y-8 px-2 md:px-0">
      {/* Header do Produto */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-xl md:rounded-3xl p-4 md:p-8 border border-gray-700">
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-start md:justify-between">
          <div className="flex-1">
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">{product.name}</h1>
            <h2 className="text-base md:text-xl text-green-400 font-semibold mb-3 md:mb-4">{product.subtitle}</h2>
            <p className="text-gray-300 text-sm md:text-lg leading-relaxed">{product.description}</p>
          </div>
          
          <div className="md:ml-8 flex justify-center md:justify-end">
            <div className="bg-black/30 rounded-xl md:rounded-2xl p-3 md:p-4 border border-gray-700">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1 text-center">
                {Math.round(progressPercentage)}%
              </div>
              <div className="text-gray-400 text-xs md:text-sm text-center">Completo</div>
              <div className="w-16 md:w-20 h-2 bg-gray-700 rounded-full mt-2">
                <div 
                  className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Módulos Especiais - Introdução e Capítulo 1 */}
      <div className="space-y-4 md:space-y-6">
        <div className="flex items-center space-x-2 md:space-x-3 px-2 md:px-0">
          <Flame className="w-5 h-5 md:w-6 md:h-6 text-red-400" />
          <h3 className="text-lg md:text-2xl font-bold text-white">INÍCIO OBRIGATÓRIO</h3>
          <Zap className="w-5 h-5 md:w-6 md:h-6 text-yellow-400" />
        </div>
        
        <div className="space-y-4 md:space-y-6">
          {product.modules.slice(0, 2).map(module => (
            <SpecialModuleCard 
              key={module.id}
              module={module} 
              isCompleted={completedModules.includes(module.id)} 
            />
          ))}
        </div>
      </div>

      {/* Módulos Principais Restantes com hover otimizado */}
      <div className="space-y-4 md:space-y-6">
        <div className="flex items-center space-x-2 md:space-x-3 px-2 md:px-0">
          <Award className="w-5 h-5 md:w-6 md:h-6 text-green-400" />
          <h3 className="text-lg md:text-2xl font-bold text-white">Módulos de Transformação</h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-6">
          {product.modules.slice(2).map(module => {
            const isUnlocked = isModuleUnlocked(module);
            const daysUntilUnlock = getDaysUntilUnlock(module.unlockDay || 0);
            
            return (
              <div key={module.id} className={`group bg-gray-900/90 border border-gray-700/50 rounded-lg md:rounded-2xl p-3 md:p-6 transition-all duration-500 ease-out relative overflow-hidden ${
                isUnlocked ? 'hover:bg-gray-800/90 hover:border-green-400/30 cursor-pointer hover:shadow-lg hover:shadow-green-400/10' : 'opacity-60 cursor-not-allowed'
              }`}>
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 via-transparent to-yellow-400/5 rounded-lg md:rounded-2xl"></div>
                
                <div className="relative z-10 flex items-start space-x-3 md:space-x-4">
                  {module.imageUrl && (
                    <div className="flex-shrink-0 w-14 h-14 md:w-20 md:h-20 relative overflow-hidden rounded-lg md:rounded-xl">
                      <OptimizedImage
                        src={module.imageUrl}
                        alt={module.title}
                        className={`w-full h-full transition-transform duration-500 ease-out ${
                          isUnlocked ? 'group-hover:scale-105' : 'grayscale'
                        }`}
                        priority={false}
                      />
                      {completedModules.includes(module.id) && isUnlocked && (
                        <div className="absolute inset-0 bg-green-400/20 flex items-center justify-center rounded-lg md:rounded-xl transition-opacity duration-300">
                          <Award className="w-5 h-5 md:w-8 md:h-8 text-green-400 transition-transform duration-300 group-hover:scale-110" />
                        </div>
                      )}
                      {!isUnlocked && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg md:rounded-xl">
                          <Lock className="w-4 h-4 md:w-6 md:h-6 text-gray-300" />
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2 md:mb-3">
                      <h3 className={`font-bold text-sm md:text-lg leading-tight transition-colors duration-300 ${
                        isUnlocked 
                          ? 'text-white group-hover:text-green-400' 
                          : 'text-gray-400'
                      }`}>
                        {module.title}
                      </h3>
                      {module.duration && (
                        <div className="flex items-center space-x-1 text-gray-400 text-xs md:text-sm ml-2 md:ml-4 flex-shrink-0">
                          <Clock className="w-3 h-3 md:w-4 md:h-4" />
                          <span>{module.duration}</span>
                        </div>
                      )}
                    </div>

                    <p className={`text-xs md:text-sm mb-3 md:mb-4 leading-relaxed transition-colors duration-300 ${
                      isUnlocked ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-500'
                    }`}>
                      {module.description}
                    </p>

                    {!isUnlocked && (
                      <p className="text-yellow-400 text-xs md:text-sm mb-3 font-medium">
                        🔒 Libera em {daysUntilUnlock} {daysUntilUnlock === 1 ? 'dia' : 'dias'}
                      </p>
                    )}

                    <button
                      onClick={() => handleModuleAccess(module)}
                      disabled={!isUnlocked}
                      className={`flex items-center space-x-1 md:space-x-2 px-3 md:px-4 py-2 md:py-2.5 rounded-lg md:rounded-xl font-medium transition-all duration-300 text-xs md:text-base ${
                        !isUnlocked
                          ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed border border-gray-600/50'
                          : completedModules.includes(module.id)
                          ? 'bg-green-400/20 text-green-400 hover:bg-green-400/30 border border-green-400/30 hover:shadow-lg hover:shadow-green-400/20'
                          : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-600 hover:border-green-400/30'
                      }`}
                    >
                      {!isUnlocked ? (
                        <>
                          <Lock className="w-3 h-3 md:w-4 md:h-4" />
                          <span>Bloqueado</span>
                        </>
                      ) : (
                        <>
                          <ExternalLink className="w-3 h-3 md:w-4 md:h-4 transition-transform duration-300 group-hover:scale-110" />
                          <span>{completedModules.includes(module.id) ? 'Acessar Novamente' : 'Acessar Conteúdo'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bônus com sistema de liberação e hover otimizado */}
      {product.bonus.length > 0 && (
        <div className="space-y-4 md:space-y-6">
          <div className="flex items-center space-x-2 md:space-x-3 px-2 md:px-0">
            <Crown className="w-5 h-5 md:w-6 md:h-6 text-yellow-400" />
            <h3 className="text-lg md:text-2xl font-bold text-white">Bônus Exclusivos</h3>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-6">
            {product.bonus.map(bonus => {
              const isBonusUnlocked = isModuleUnlocked(bonus);
              const bonusDaysUntilUnlock = getDaysUntilUnlock(bonus.unlockDay || 0);
              
              return (
                <div key={bonus.id} className={`group bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl md:rounded-3xl p-4 md:p-8 transition-all duration-500 ease-out ${
                  isBonusUnlocked ? 'hover:border-yellow-400/50 cursor-pointer hover:shadow-lg hover:shadow-yellow-400/10' : 'opacity-60 cursor-not-allowed'
                }`}>
                  <div className="flex items-start space-x-3 md:space-x-6">
                    <div className="flex-shrink-0">
                      <div className={`w-10 h-10 md:w-16 md:h-16 rounded-lg md:rounded-2xl flex items-center justify-center transition-all duration-300 ease-out ${
                        isBonusUnlocked 
                          ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 group-hover:scale-105 group-hover:rotate-3' 
                          : 'bg-gray-600'
                      }`}>
                        {isBonusUnlocked ? (
                          <Crown className="w-5 h-5 md:w-8 md:h-8 text-black transition-transform duration-300 group-hover:scale-110" />
                        ) : (
                          <Lock className="w-5 h-5 md:w-8 md:h-8 text-gray-400" />
                        )}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className={`text-base md:text-xl font-bold mb-2 transition-colors duration-300 ${
                        isBonusUnlocked 
                          ? 'text-white group-hover:text-yellow-400' 
                          : 'text-gray-400'
                      }`}>
                        {bonus.title}
                      </h3>
                      <p className={`mb-3 md:mb-6 leading-relaxed text-xs md:text-base transition-colors duration-300 ${
                        isBonusUnlocked ? 'text-gray-300 group-hover:text-gray-200' : 'text-gray-500'
                      }`}>
                        {bonus.description}
                      </p>

                      {!isBonusUnlocked && (
                        <p className="text-yellow-400 text-xs md:text-sm mb-3 font-medium">
                          🔒 Libera em {bonusDaysUntilUnlock} {bonusDaysUntilUnlock === 1 ? 'dia' : 'dias'}
                        </p>
                      )}

                      <button 
                        onClick={() => handleModuleAccess(bonus)}
                        disabled={!isBonusUnlocked}
                        className={`flex items-center space-x-1 md:space-x-2 px-3 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl font-medium transition-all duration-300 text-xs md:text-base ${
                          !isBonusUnlocked
                            ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed border border-gray-600/50'
                            : completedModules.includes(bonus.id)
                            ? 'bg-yellow-400/20 text-yellow-400 hover:bg-yellow-400/30 border border-yellow-400/30 hover:shadow-lg hover:shadow-yellow-400/20'
                            : 'bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border border-yellow-400/30 hover:shadow-lg hover:shadow-yellow-400/20'
                        }`}
                      >
                        {!isBonusUnlocked ? (
                          <>
                            <Lock className="w-3 h-3 md:w-4 md:h-4" />
                            <span>Bloqueado</span>
                          </>
                        ) : (
                          <>
                            <ExternalLink className="w-3 h-3 md:w-4 md:h-4 transition-transform duration-300 group-hover:scale-110" />
                            <span>{completedModules.includes(bonus.id) ? 'Acessar Novamente' : 'Acessar Conteúdo'}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* CTA para upgrade - APENAS para usuários básicos */}
      {user?.accessLevel === 'basic' && (
        <div className="bg-gradient-to-r from-yellow-500/10 to-green-500/10 border border-yellow-400/20 rounded-xl md:rounded-3xl p-4 md:p-8 text-center transition-all duration-500 hover:border-yellow-400/40 hover:shadow-lg hover:shadow-yellow-400/10">
          <Crown className="w-10 md:w-12 h-10 md:h-12 text-yellow-400 mx-auto mb-4 transition-transform duration-300 hover:scale-110" />
          <h3 className="text-lg md:text-2xl font-bold text-white mb-4">
            Pronto para o próximo nível?
          </h3>
          <p className="text-gray-300 mb-4 md:mb-6 text-sm md:text-base leading-relaxed">
            Continue sua jornada de transformação com o Mente Blindada 21 - 21 dias de evolução mental completa.
          </p>
          <a
            href="https://checkout-97.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 md:space-x-3 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold py-3 md:py-4 px-4 md:px-8 rounded-lg md:rounded-2xl transition-all duration-300 text-sm md:text-base transform hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/30"
          >
            <span>Evoluir para Premium</span>
            <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
          </a>
        </div>
      )}

      {/* CTA para próximo produto - APENAS para usuários premium */}
      {onNavigateToNext && user?.accessLevel === 'premium' && (
        <div className="bg-gradient-to-r from-yellow-500/10 to-green-500/10 border border-yellow-400/20 rounded-xl md:rounded-3xl p-4 md:p-8 text-center transition-all duration-500 hover:border-yellow-400/40 hover:shadow-lg hover:shadow-yellow-400/10">
          <h3 className="text-lg md:text-2xl font-bold text-white mb-4">
            Pronto para o próximo nível?
          </h3>
          <p className="text-gray-300 mb-4 md:mb-6 text-sm md:text-base leading-relaxed">
            Continue sua jornada de transformação com o próximo módulo de elite.
          </p>
          <button
            onClick={onNavigateToNext}
            className="inline-flex items-center space-x-2 md:space-x-3 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold py-3 md:py-4 px-4 md:px-8 rounded-lg md:rounded-2xl transition-all duration-300 text-sm md:text-base transform hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/30"
          >
            <span>Continuar na próxima jornada</span>
            <Play className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      )}
    </div>
  );
};