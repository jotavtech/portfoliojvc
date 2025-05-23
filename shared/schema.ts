// Este arquivo foi simplificado para um site estático
// Sem esquemas de banco de dados ou tipos relacionados a API

// Definições de tipos estáticos usados apenas no frontend
export type PortfolioInfo = {
  owner: string;
  title: string;
  lastUpdated: string;
};

export const portfolioData: PortfolioInfo = {
  owner: "Jota Chaves",
  title: "Portfolio de Desenvolvimento Web",
  lastUpdated: "2023-05-23"
};
