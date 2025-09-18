# Use Node.js 18 Alpine como base
FROM node:18-alpine

# Instalar dependências do sistema necessárias para SQLite
RUN apk add --no-cache sqlite

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar todas as dependências (incluindo devDependencies para build)
RUN npm ci --legacy-peer-deps && npm cache clean --force

# Copiar código fonte
COPY . .

# Compilar a aplicação
RUN npm run build

# Remover dependências de desenvolvimento após o build
RUN npm prune --production --legacy-peer-deps

# Criar usuário não-root para segurança
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

# Criar diretório para o banco de dados e dar permissões
RUN mkdir -p /app/data && chown -R nestjs:nodejs /app

# Mudar para usuário não-root
USER nestjs

# Expor porta
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "start:prod"]
