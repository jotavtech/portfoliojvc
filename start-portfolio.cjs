// Script para iniciar o portfólio estático
const { execSync } = require('child_process');

try {
  console.log('Iniciando o portfólio estático...');
  execSync('cd client && npx vite --host 0.0.0.0', { stdio: 'inherit' });
} catch (error) {
  console.error('Erro ao iniciar o portfólio:', error);
}