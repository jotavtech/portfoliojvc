import React from 'react';

interface SectionPlaceholderProps {
  height?: string;
  className?: string;
}

const SectionPlaceholder: React.FC<SectionPlaceholderProps> = ({ 
  height = "min-h-screen",
  className = ""
}) => {
  return (
    <div className={`${height} bg-black flex items-center justify-center ${className}`}>
      <div className="text-center">
        <div className="w-16 h-16 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white/60 text-sm">Carregando seção...</p>
      </div>
    </div>
  );
};

export default SectionPlaceholder; 