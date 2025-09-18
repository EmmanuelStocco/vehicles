# Sistema de Gestão de Veículos

Sistema completo de CRUD de veículos com arquitetura de microserviços usando NestJS, Angular e RabbitMQ. Implementa padrão Event-Driven Architecture para processamento assíncrono de operações.

## 🏗️ Arquitetura

- **Backend**: API REST NestJS com TypeORM e SQLite
- **Worker**: Microserviço NestJS para processamento assíncrono de eventos
- **Frontend**: Angular 16+ com interface responsiva
- **Message Broker**: RabbitMQ para comunicação entre serviços
- **Containerização**: Docker para deploy e desenvolvimento

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
- ✅ Simulação de processamento de 1 segundo

### Frontend (Angular)
- ✅ Listagem de veículos
- ✅ Formulário de criação/edição
- ✅ Validação de formulários
- ✅ Interface responsiva e moderna
- ✅ Integração com API REST

## 🔄 Fluxo de Processamento

1. **Frontend** → Envia requisição para **Backend**
2. **Backend** → Processa operação CRUD no banco de dados
3. **Backend** → Publica evento no **RabbitMQ**
4. **Worker** → Consome evento do **RabbitMQ**
5. **Worker** → Processa operação de forma assíncrona
6. **Worker** → Registra logs de processamento

### Exemplo de Logs:
```
Backend:  📤 Enviando evento de criação para o worker - Veículo ID: 123
Worker:   📥 Processando requisição via RabbitMQ - Novo veículo criado (ID: 123)
Worker:   ✅ Processamento concluído - Ação: CREATE | Veículo ID: 123
```

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

### Execução com Docker (Completo - Todos os Serviços)

1. **Executar todos os serviços juntos:**
```bash
# Na pasta raiz do projeto
docker-compose up --build
```

2. **Acessar as aplicações:**
- Frontend: http://localhost (porta 80)
- Backend API: http://localhost:3000
- RabbitMQ Management: http://localhost:15672 (admin/admin)

3. **Verificar logs do worker:**
```bash
# Ver logs do worker em tempo real
docker logs -f desafionovo-worker-1

# Ver logs do backend
docker logs -f desafionovo-backend-1
```

### Execução com Docker (Microserviço Worker)

1. **Executar worker com RabbitMQ:**
```bash
# Na pasta raiz do projeto
docker-compose -f docker-compose-worker.yml up --build
```

2. **Acessar:**
- RabbitMQ Management: http://localhost:15672 (admin/admin)


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
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── Dockerfile          # Configuração Docker
│   ├── .dockerignore       # Arquivos ignorados no Docker
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
├── docker-compose-worker.yml   # Docker Compose para worker + RabbitMQ
└── README.md
```

## 🔧 Tecnologias Utilizadas

### Backend
- **NestJS** - Framework Node.js para APIs REST
- **TypeORM** - ORM para banco de dados
- **SQLite** - Banco de dados leve e portável
- **class-validator** - Validação de dados
- **Jest** - Testes unitários
- **RabbitMQ** - Message broker para microserviços
- **AMQP** - Protocolo de mensageria

### Worker (Microserviço)
- **NestJS Microservices** - Framework para microserviços
- **RabbitMQ** - Message broker
- **Event-Driven Architecture** - Padrão arquitetural
- **AMQP** - Protocolo de mensageria

### Frontend
- **Angular 16** - Framework frontend
- **TypeScript** - Linguagem tipada
- **SCSS** - Estilização
- **RxJS** - Programação reativa
- **HTTP Client** - Comunicação com API

### Infraestrutura
- **Docker** - Containerização
- **Docker Compose** - Orquestração de containers
- **Nginx** - Servidor web para frontend
- **Node.js 18** - Runtime JavaScript


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

- [ ] Implementar autenticação/autorização (JWT)
- [ ] Adicionar paginação na listagem
- [ ] Implementar filtros e busca avançada
- [ ] Adicionar logs estruturados (Winston)
- [ ] Implementar cache Redis
- [ ] Adicionar monitoramento (Prometheus/Grafana)
- [ ] Implementar CI/CD (GitHub Actions)
- [ ] Adicionar testes de integração
- [ ] Implementar rate limiting
- [ ] Adicionar documentação da API (Swagger)

## 📄 Licença

Este projeto é um teste técnico e não possui licença específica.
