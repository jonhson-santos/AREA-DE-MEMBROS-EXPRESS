export interface User {
  accessLevel: 'basic' | 'premium';
  productAccess: string[];
  purchaseDate?: string; // Data da compra para calcular liberações
}

export interface Module {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'pdf' | 'audio' | 'bonus';
  completed: boolean;
  duration?: string;
  downloadUrl?: string;
  imageUrl?: string;
  unlockDay?: number; // Dia em que o módulo é liberado (0 = imediato)
  driveUrl?: string; // URL do Google Drive para o conteúdo
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  modules: Module[];
  bonus: Module[];
}

export interface AuthContextType {
  user: User | null;
  login: (key: string) => boolean;
  logout: () => void;
  toggleModuleComplete: (productId: string, moduleId: string) => void;
}