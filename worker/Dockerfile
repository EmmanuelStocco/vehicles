# Use Node.js 18 Alpine como base
FROM node:18-alpine

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm install && npm cache clean --force

# Copiar código fonte
COPY . .

# Compilar a aplicação
RUN npm run build

# Criar usuário não-root para segurança
RUN addgroup -g 1001 -S nodejs
RUN adduser -S worker -u 1001

# Mudar para usuário não-root
USER worker

# Comando para iniciar a aplicação
CMD ["npm", "run", "start:prod"]
