#!/bin/bash
# 🚀 Comandos Úteis - Fechamento Jobinho

# =================================
# INSTALAÇÃO E SETUP
# =================================

# Instalar dependências
npm install

# Atualizar dependências
npm update

# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install

# =================================
# DESENVOLVIMENTO
# =================================

# Iniciar servidor de desenvolvimento (porta 5173)
npm run dev

# Iniciar em porta diferente
npm run dev -- --port 3000

# Preview de produção
npm run preview

# =================================
# BUILD E DEPLOY
# =================================

# Build para produção
npm run build

# Build com análise de bundle
npm run build

# Limpar pasta dist
rm -rf dist

# =================================
# CODE QUALITY
# =================================

# Lint TypeScript
npm run lint

# =================================
# GIT
# =================================

# Inicializar repositório git
git init

# Adicionar todos os arquivos
git add .

# Commit inicial
git commit -m "Initial commit: Fechamento Jobinho v1.0.0"

# Ver status
git status

# =================================
# ESTRUTURA DE PASTAS
# =================================

# Criar estrutura de pastas (se necessário)
mkdir -p src/{components,pages,types,utils,styles,services,data}

# =================================
# LIMPEZA
# =================================

# Limpar node_modules
rm -rf node_modules

# Limpar dist
rm -rf dist

# Limpar cache npm
npm cache clean --force

# =================================
# INFORMAÇÕES
# =================================

# Versão do Node
node --version

# Versão do npm
npm --version

# Listar dependências
npm list

# Ver versões de dependências outdated
npm outdated

# =================================
# DEPLOY (Exemplos)
# =================================

# Vercel
npm install -g vercel
vercel

# Netlify (depois de build)
# Arraste a pasta 'dist' para https://app.netlify.com

# GitHub Pages
# Build → dist
# Settings → Pages → Deploy from branch 'main' (dist folder)

# =================================
# DICAS DE DESENVOLVIMENTO
# =================================

# Hot Module Replacement (HMR) já está ativado
# Altere arquivos e veja mudanças em tempo real

# Para adicionar novas dependências
npm install nome-do-pacote

# Para remover dependências
npm uninstall nome-do-pacote

# Para versão dev
npm install --save-dev nome-do-pacote

# =================================
# ATALHOS ÚTEIS (VS CODE)
# =================================

# Abrir terminal integrado
Ctrl+` (Windows/Linux)
Cmd+` (Mac)

# Paleta de comandos
Ctrl+Shift+P (Windows/Linux)
Cmd+Shift+P (Mac)

# Buscar arquivo
Ctrl+P (Windows/Linux)
Cmd+P (Mac)

# Ir para linha
Ctrl+G (Windows/Linux)
Cmd+G (Mac)

# Substituir em arquivo
Ctrl+H (Windows/Linux)
Cmd+H (Mac)

# =================================
# TROUBLESHOOTING
# =================================

# Se npm install falhar
npm cache clean --force
rm package-lock.json
npm install

# Se porta 5173 está em uso
npm run dev -- --port 3000

# Se TypeScript está com erro
npx tsc --noEmit

# Se build falhar
npm run build 2>&1 | head -50

# =================================
# EXTENSÕES RECOMENDADAS
# =================================

# VS Code Extensions (extensionId)
# - ES7+ React/Redux/React-Native snippets
# - Prettier - Code formatter
# - ESLint
# - Tabnine (AI completion)
# - Thunder Client (alternativa a Postman)

# Instalar via CLI
code --install-extension dsznajder.es7-react-js-snippets
code --install-extension esbenp.prettier-vscode
code --install-extension dbaeumer.vscode-eslint

# =================================
# SCRIPTS CUSTOMIZADOS
# =================================

# Você pode adicionar scripts em package.json
# "scripts": {
#   "dev": "vite",
#   "build": "tsc && vite build",
#   "lint": "eslint . --ext ts,tsx",
#   "preview": "vite preview",
#   "type-check": "tsc --noEmit",
#   "format": "prettier --write \"src/**/*.{ts,tsx,css}\""
# }

# Rodar script customizado
# npm run nome-do-script

# =================================
# MONITORAMENTO EM PRODUÇÃO
# =================================

# Se host em servidor
# Verificar logs
tail -f server.log

# Reiniciar aplicação
systemctl restart app-name

# Atualizar código
git pull origin main
npm install
npm run build

# =================================
# PERFORMANCE
# =================================

# Análise de bundle
npm run build -- --analyze

# Benchmarking
# Use DevTools (F12) → Lighthouse

# =================================
# SEGURANÇA
# =================================

# Verificar vulnerabilidades
npm audit

# Corrigir vulnerabilidades
npm audit fix

# Forçar correção
npm audit fix --force

# =================================
# DOCUMENTAÇÃO E AJUDA
# =================================

# Ver ajuda de um comando
npm help <comando>

# Ver informações de pacote
npm info react

# Ver script disponíveis
npm run

# =================================
# VERSIONAMENTO
# =================================

# Bump version (major.minor.patch)
npm version major  # 1.0.0 → 2.0.0
npm version minor  # 1.0.0 → 1.1.0
npm version patch  # 1.0.0 → 1.0.1

# =================================
# PUBLICAR (Se tornar pacote npm)
# =================================

# Login npm
npm login

# Publicar
npm publish

# Unpublish
npm unpublish package-name --force

# =================================
# DICAS EXTRAS
# =================================

# Usar yarn ao invés de npm
# npm i -g yarn
# yarn install
# yarn dev
# yarn build

# Usar pnpm (mais rápido)
# npm i -g pnpm
# pnpm install
# pnpm dev
# pnpm build

# Monorepo com npm workspaces
# npm init -w ./packages/app
# npm init -w ./packages/shared

# =================================
# REFERÊNCIAS RÁPIDAS
# =================================

# React: https://react.dev
# TypeScript: https://www.typescriptlang.org
# Vite: https://vitejs.dev
# npm docs: https://docs.npmjs.com
# Node.js: https://nodejs.org

# =================================

echo "✅ Ficheiro de comandos carregado com sucesso!"
echo "📚 Consulte este arquivo para referência rápida"
