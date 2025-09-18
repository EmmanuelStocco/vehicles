# Sistema de Veículos

Sistema completo de CRUD de veículos com arquitetura de microserviços usando NestJS, Angular e RabbitMQ.

## 🏗️ Arquitetura

- **Backend**: NestJS com TypeORM e SQLite
- **Worker**: Microserviço NestJS para processamento de eventos
- **Frontend**: Angular 16+ com interface responsiva
- **Message Broker**: RabbitMQ para comunicação entre serviços

## 📋 Funcionalidades

### Backend (NestJS)
- ✅ CRUD completo de veículos
- ✅ Validação de dados com class-validator
- ✅ Banco de dados SQLite com TypeORM
- ✅ Publicação de eventos no RabbitMQ
- ✅ Testes unitários com Jest
- ✅ CORS configurado para o frontend

### Worker (Microserviço)
- ✅ Consumo de eventos do RabbitMQ
- ✅ Processamento assíncrono de operações
- ✅ Logs detalhados das operações

### Frontend (Angular)
- ✅ Listagem de veículos
- ✅ Formulário de criação/edição
- ✅ Validação de formulários
- ✅ Interface responsiva e moderna
- ✅ Integração com API REST

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+

### Execução Local

1. **Instalar dependências do backend:**
```bash
cd backend
npm install
```

2. **Instalar dependências do worker:**
```bash
cd worker
npm install
```

3. **Instalar dependências do frontend:**
```bash
cd frontend
npm install
```

4. **Instalar e executar RabbitMQ:**
```bash
# Instalar localmente (Ubuntu/Debian)
sudo apt-get install rabbitmq-server
sudo systemctl start rabbitmq-server

# Ou usando Homebrew (macOS)
brew install rabbitmq
brew services start rabbitmq

# Ou baixar e executar manualmente
# https://www.rabbitmq.com/download.html
```

5. **Executar o backend:**
```bash
cd backend
npm run start:dev
```

6. **Executar o worker (em outro terminal):**
```bash
cd worker
npm run start:dev
```

7. **Executar o frontend (em outro terminal):**
```bash
cd frontend
npm start
```

### Execução com Docker (Backend)

1. **Executar apenas o backend com Docker:**
```bash
# Usando docker-compose
docker-compose -f docker-compose-backend.yml up --build

# Ou usando Docker diretamente
cd backend
docker build -t backend-vehicles .
docker run -p 3000:3000 -v $(pwd)/vehicles.db:/app/vehicles.db backend-vehicles
```

2. **Acessar a aplicação:**
- Backend API: http://localhost:3000

### Execução com Docker (Frontend)

1. **Executar apenas o frontend com Docker:**
```bash
# Usando docker-compose
docker-compose -f docker-compose-frontend.yml up --build

# Ou usando Docker diretamente
cd frontend
docker build -t frontend-vehicles .
docker run -p 80:80 frontend-vehicles
```

2. **Acessar a aplicação:**
- Frontend: http://localhost

### Execução com Docker (Completo - Backend + Frontend)

1. **Executar ambos os serviços juntos:**
```bash
# Na pasta raiz do projeto
docker-compose up --build
```

2. **Acessar as aplicações:**
- Frontend: http://localhost (porta 80)
- Backend API: http://localhost:3000


## 📚 API Endpoints

### Veículos
- `GET /vehicles` - Listar todos os veículos
- `GET /vehicles/:id` - Buscar veículo por ID
- `POST /vehicles` - Criar novo veículo
- `PATCH /vehicles/:id` - Atualizar veículo
- `DELETE /vehicles/:id` - Excluir veículo

### Exemplo de Criação de Veículo
```json
POST /vehicles
{
  "placa": "ABC1234",
  "chassi": "12345678901234567",
  "renavam": "12345678901",
  "modelo": "Civic",
  "marca": "Honda",
  "ano": 2023
}
```

## 🧪 Testes

### Executar testes do backend:
```bash
cd backend
npm test
```

### Executar testes com cobertura:
```bash
cd backend
npm run test:cov
```

## 📁 Estrutura do Projeto

```
├── backend/                 # API NestJS
│   ├── src/
│   │   ├── entities/        # Entidades TypeORM
│   │   ├── dto/            # DTOs de validação
│   │   ├── vehicles/       # Módulo de veículos
│   │   └── main.ts
│   ├── Dockerfile          # Configuração Docker
│   ├── .dockerignore       # Arquivos ignorados no Docker
│   └── package.json
├── worker/                 # Microserviço worker
│   ├── src/
│   │   ├── vehicle-processor.service.ts
│   │   └── main.ts
│   └── package.json
├── frontend/               # Aplicação Angular
│   ├── src/app/
│   │   ├── vehicle-list/   # Componente de listagem
│   │   ├── services/       # Serviços HTTP
│   │   └── models/         # Interfaces TypeScript
│   ├── Dockerfile          # Configuração Docker
│   ├── nginx.conf          # Configuração Nginx
│   ├── .dockerignore       # Arquivos ignorados no Docker
│   └── package.json
├── docker-compose-backend.yml  # Docker Compose para backend
├── docker-compose-frontend.yml # Docker Compose para frontend
└── README.md
```

## 🔧 Tecnologias Utilizadas

### Backend
- **NestJS** - Framework Node.js
- **TypeORM** - ORM para banco de dados
- **SQLite** - Banco de dados
- **class-validator** - Validação de dados
- **Jest** - Testes unitários
- **RabbitMQ** - Message broker

### Frontend
- **Angular 16** - Framework frontend
- **TypeScript** - Linguagem
- **SCSS** - Estilização
- **RxJS** - Programação reativa


## 📝 Validações

### Placa
- 7 a 8 caracteres
- Única no sistema

### Chassi
- Exatamente 17 caracteres
- Único no sistema

### Renavam
- 9 a 11 caracteres
- Único no sistema

### Modelo e Marca
- Obrigatórios
- Texto livre

### Ano
- Entre 1900 e ano atual + 1
- Número inteiro

## 🚀 Próximos Passos

- [ ] Implementar autenticação/autorização
- [ ] Adicionar paginação na listagem
- [ ] Implementar filtros e busca
- [ ] Adicionar logs estruturados
- [ ] Implementar cache Redis
- [ ] Adicionar monitoramento (Prometheus/Grafana)
- [ ] Implementar CI/CD

## 📄 Licença

Este projeto é um teste técnico e não possui licença específica.
