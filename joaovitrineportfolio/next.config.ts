import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com"], // Permite carregar imagens de domínios externos
  },
  trailingSlash: true, // Adiciona uma barra ao final das URLs para compatibilidade com sites estáticos
  reactStrictMode: true, // Habilita o modo estrito do React
};

export default nextConfig;
