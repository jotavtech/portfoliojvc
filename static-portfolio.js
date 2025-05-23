// Script para iniciar o portfólio estático usando Vite
import { createServer } from 'vite';

async function iniciarPortfolioEstatico() {
  try {
    console.log('Iniciando o portfólio estático de João Vitor Chaves...');
    
    const vite = await createServer({
      root: './client',
      server: {
        port: 3000,
        host: '0.0.0.0'
      }
    });
    
    await vite.listen();
    
    vite.printUrls();
    console.log('Portfólio estático rodando com sucesso!');
  } catch (error) {
    console.error('Erro ao iniciar o portfólio estático:', error);
  }
}

iniciarPortfolioEstatico();