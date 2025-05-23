// Script para iniciar apenas o frontend estático
import { createServer } from 'vite';

async function startFrontend() {
  try {
    console.log('Iniciando portfolio estático...');
    
    const vite = await createServer({
      root: './client',
      server: {
        port: 3000,
        host: '0.0.0.0'
      }
    });
    
    await vite.listen();
    
    vite.printUrls();
    console.log('Portfolio estático rodando com sucesso!');
  } catch (error) {
    console.error('Erro ao iniciar o frontend:', error);
  }
}

startFrontend();