import React from 'react';
import { FaBrush, FaCar, FaHeadphones, FaList, FaBook } from 'react-icons/fa';

interface ProjectLogoProps {
  title: string;
  category: string;
  size?: number;
}

const ProjectLogo: React.FC<ProjectLogoProps> = ({ title, size = 200 }) => {
  const getLogoContent = () => {
    switch (title.toLowerCase()) {
      case 'cynthia makes':
        return (
          <div className="flex items-center justify-center w-full h-full">
            <div className="relative">
              {/* Pincel de maquiagem */}
              <div className="w-16 h-16 bg-neutral-100 rounded-lg flex items-center justify-center shadow-lg">
                <FaBrush className="text-4xl text-neutral-600" />
              </div>
              {/* Texto */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                <div className="text-neutral-700 font-light text-sm tracking-wider">CM</div>
              </div>
            </div>
          </div>
        );
      
      case 'comparate':
        return (
          <div className="flex items-center justify-center w-full h-full">
            <div className="relative">
              {/* Carrinho */}
              <div className="w-16 h-16 bg-neutral-100 rounded-lg flex items-center justify-center shadow-lg">
                <FaCar className="text-4xl text-neutral-600" />
              </div>
              {/* Texto */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                <div className="text-neutral-700 font-light text-sm tracking-wider">COMP</div>
              </div>
            </div>
          </div>
        );
      
      case 'folheando':
        return (
          <div className="flex items-center justify-center w-full h-full">
            <div className="relative">
              {/* Livro */}
              <div className="w-16 h-16 bg-neutral-100 rounded-lg flex items-center justify-center shadow-lg">
                <FaBook className="text-4xl text-neutral-600" />
              </div>
              {/* Texto */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                <div className="text-neutral-700 font-light text-sm tracking-wider">FOLH</div>
              </div>
            </div>
          </div>
        );
      
      case 'playoff':
        return (
          <div className="flex items-center justify-center w-full h-full">
            <div className="relative">
              {/* Fone de ouvido */}
              <div className="w-16 h-16 bg-neutral-100 rounded-lg flex items-center justify-center shadow-lg">
                <FaHeadphones className="text-4xl text-neutral-600" />
              </div>
              {/* Texto */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                <div className="text-neutral-700 font-light text-sm tracking-wider">PLAY</div>
              </div>
            </div>
          </div>
        );
      
      case 'dashmeboard':
        return (
          <div className="flex items-center justify-center w-full h-full">
            <div className="relative">
              {/* Lista */}
              <div className="w-16 h-16 bg-neutral-100 rounded-lg flex items-center justify-center shadow-lg">
                <FaList className="text-4xl text-neutral-600" />
              </div>
              {/* Texto */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                <div className="text-neutral-700 font-light text-sm tracking-wider">DASH</div>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="flex items-center justify-center w-full h-full">
            <div className="relative">
              {/* Forma geométrica simples */}
              <div className="w-16 h-16 bg-neutral-100 rounded-lg flex items-center justify-center shadow-lg">
                <div className="w-8 h-8 bg-neutral-300 rounded-md"></div>
              </div>
              {/* Texto */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                <div className="text-neutral-700 font-light text-sm tracking-wider">
                  {title.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div 
      className="bg-white rounded-2xl shadow-lg flex items-center justify-center overflow-hidden border border-neutral-200"
      style={{ width: size, height: size }}
    >
      {getLogoContent()}
    </div>
  );
};

export default ProjectLogo; 