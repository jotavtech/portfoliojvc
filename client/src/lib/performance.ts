// Configurações de performance para otimizar a aplicação

export const PERFORMANCE_CONFIG = {
  // Configurações de animação
  animation: {
    duration: {
      fast: 0.3,
      normal: 0.6,
      slow: 1.0
    },
    easing: {
      smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      linear: 'linear'
    }
  },

  // Configurações de lazy loading
  lazyLoading: {
    threshold: 0.1,
    rootMargin: '50px',
    delay: 100
  },

  // Configurações de debounce
  debounce: {
    scroll: 16, // ~60fps
    resize: 100,
    input: 300
  },

  // Configurações de cache
  cache: {
    imageCache: new Map<string, HTMLImageElement>(),
    maxCacheSize: 50
  },

  // Configurações de intersection observer
  intersection: {
    threshold: 0.1,
    rootMargin: '0px 0px -10% 0px'
  }
};

// Função para pré-carregar imagens importantes
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      PERFORMANCE_CONFIG.cache.imageCache.set(src, img);
      resolve();
    };
    img.onerror = reject;
    img.src = src;
  });
};

// Função para limpar cache quando necessário
export const clearImageCache = () => {
  if (PERFORMANCE_CONFIG.cache.imageCache.size > PERFORMANCE_CONFIG.cache.maxCacheSize) {
    const entries = Array.from(PERFORMANCE_CONFIG.cache.imageCache.entries());
    const toDelete = entries.slice(0, Math.floor(entries.length / 2));
    toDelete.forEach(([key]) => {
      PERFORMANCE_CONFIG.cache.imageCache.delete(key);
    });
  }
};

// Função para otimizar imagens do Cloudinary
export const optimizeCloudinaryImage = (url: string, options: {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'auto' | 'webp' | 'jpg' | 'png';
} = {}) => {
  const { width, height, quality = 80, format = 'auto' } = options;
  
  if (!url.includes('cloudinary.com')) return url;
  
  const baseUrl = url.split('/upload/')[0] + '/upload/';
  const imagePath = url.split('/upload/')[1];
  
  const transformations = [];
  
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  transformations.push(`q_${quality}`);
  transformations.push(`f_${format}`);
  
  return `${baseUrl}${transformations.join(',')}/${imagePath}`;
};

// Função para detectar se o dispositivo é móvel
export const isMobileDevice = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

// Função para detectar conexão lenta
export const isSlowConnection = (): boolean => {
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    return connection.effectiveType === 'slow-2g' || 
           connection.effectiveType === '2g' || 
           connection.effectiveType === '3g';
  }
  return false;
};

// Função para aplicar otimizações baseadas no dispositivo
export const getOptimizationLevel = () => {
  if (isMobileDevice() || isSlowConnection()) {
    return 'low';
  }
  return 'high';
};

// Configurações dinâmicas baseadas no dispositivo
export const getDynamicConfig = () => {
  const optimizationLevel = getOptimizationLevel();
  
  return {
    animationDuration: optimizationLevel === 'low' ? 0.3 : 0.6,
    imageQuality: optimizationLevel === 'low' ? 60 : 80,
    enableComplexAnimations: optimizationLevel === 'high',
    lazyLoadThreshold: optimizationLevel === 'low' ? 0.05 : 0.1
  };
}; 