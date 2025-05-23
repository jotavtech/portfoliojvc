// Script para iniciar aplicação frontend estática
import { execSync } from 'child_process';

try {
  console.log('Iniciando o portfolio estático...');
  execSync('cd client && npx vite --host 0.0.0.0', { stdio: 'inherit' });
} catch (error) {
  console.error('Erro ao iniciar o portfolio:', error);
}