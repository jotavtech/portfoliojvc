# Portfólio de Jota Chaves

Este é um portfólio moderno construído com React, Framer Motion e TailwindCSS, seguindo o estilo do modelo Arpeggio.

## Recursos

- Design moderno com cores azul e laranja
- Animações suaves com Framer Motion
- Menu de navegação com efeito de backdrop blur
- Seções completas: Início, Projetos, Habilidades, Sobre e Contato
- Totalmente responsivo para todos os dispositivos
- 100% frontend (sem backend ou banco de dados)

## Como fazer deploy na Vercel

### Passo 1: Preparar os arquivos

O projeto já está configurado para ser deployado na Vercel como um site estático. Não há dependências de backend ou banco de dados.

### Passo 2: Fazer upload para GitHub

1. Crie um novo repositório no GitHub
2. Suba os arquivos do projeto para o repositório

```bash
git init
git add .
git commit -m "Versão inicial do portfólio"
git branch -M main
git remote add origin [URL DO SEU REPOSITÓRIO]
git push -u origin main
```

### Passo 3: Deploy na Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login com sua conta GitHub
2. Clique em "New Project"
3. Selecione o repositório que você acabou de criar
4. Na configuração do projeto:
   - Framework Preset: Vite
   - Build Command: vite build
   - Output Directory: dist
5. Clique em "Deploy"

A Vercel vai automaticamente reconhecer que este é um projeto Vite e configurar tudo corretamente.

### Passo 4: Configurações personalizadas (opcional)

Após o deploy, você pode configurar:
- Um domínio personalizado
- Variáveis de ambiente (se necessário no futuro)
- Configurações de performance

## Atualização do site

Quando quiser atualizar o site:

1. Faça as alterações necessárias no código
2. Envie as alterações para o GitHub:

```bash
git add .
git commit -m "Descrição das alterações"
git push
```

A Vercel detectará automaticamente as mudanças e fará um novo deploy.

## Desenvolvimento local

Para rodar o projeto localmente:

```bash
npm install
npm run dev
```

O site estará disponível em `http://localhost:5173`.