# Multi-stage build para Angular
# Stage 1: Build da aplicação
FROM node:18-alpine AS build

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm ci && npm cache clean --force

# Copiar código fonte
COPY . .

# Build da aplicação para produção
RUN npm run build --configuration=production

# Stage 2: Servir a aplicação com Nginx
FROM nginx:alpine

# Copiar arquivos buildados do stage anterior
COPY --from=build /app/dist/frontend /usr/share/nginx/html

# Copiar configuração customizada do Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Expor porta 80
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
