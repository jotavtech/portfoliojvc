import { createServer } from 'vite';
import path from 'path';
import fs from 'fs';

async function startFrontend() {
  try {
    console.log('Iniciando o site estático...');
    
    const server = await createServer({
      configFile: path.resolve('./vite.config.ts'),
      root: './client',
      server: {
        port: 3000,
        host: '0.0.0.0'
      }
    });
    
    await server.listen();
    
    server.printUrls();
    console.log('Site estático rodando com sucesso!');
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
  }
}

startFrontend();