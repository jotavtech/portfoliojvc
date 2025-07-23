import React from 'react';

interface SimpleImageProps {
  src: string;
  alt: string;
  className?: string;
}

const SimpleImage: React.FC<SimpleImageProps> = ({
  src,
  alt,
  className = ''
}) => {
  console.log('Renderizando imagem:', src);
  
  return (
    <img
      src={src}
      alt={alt}
      className={`w-full h-full object-cover rounded-lg ${className}`}
      loading="lazy"
      onLoad={() => console.log('Imagem carregada com sucesso:', src)}
      onError={(e) => {
        console.error('Erro ao carregar imagem:', src);
        e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMzM0MTU1Ii8+CjxwYXRoIGQ9Ik0xMDAgNzBDMTE2LjU2OSA3MCAxMzAgODMuNDMxIDEzMCAxMDBDMTMwIDExNi41NjkgMTE2LjU2OSAxMzAgMTAwIDEzMEM4My40MzEgMTMwIDcwIDExNi41NjkgNzAgMTAwQzcwIDgzLjQzMSA4My40MzEgNzAgMTAwIDcwWiIgZmlsbD0iIzkjYTNhZWQiLz4KPC9zdmc+';
      }}
    />
  );
};

export default SimpleImage; 