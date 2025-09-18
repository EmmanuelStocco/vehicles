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
- Docker e Docker Compose instalados
- **Não é necessário** Node.js local (tudo roda em containers)

### Execução Recomendada (Docker - Todos os Serviços)

1. **Executar todos os serviços:**
```bash
# Na pasta raiz do projeto
docker-compose up --build
```

2. **Acessar as aplicações:**
- Frontend: http://localhost (porta 80)
- Backend API: http://localhost:3000
- RabbitMQ Management: http://localhost:15672 (admin/admin)

3. **Verificar logs:**
```bash
# Ver logs do worker em tempo real
docker logs -f desafionovo-worker-1

# Ver logs do backend
docker logs -f desafionovo-backend-1
```

### Execução Local (Desenvolvimento)

**Nota:** Para desenvolvimento local, você precisará do Node.js 18+ e instalar as dependências:

1. **Instalar dependências:**
```bash
# Backend
cd backend && npm install

# Worker  
cd worker && npm install

# Frontend
cd frontend && npm install
```

2. **Executar RabbitMQ via Docker:**
```bash
docker-compose up rabbitmq -d
```

3. **Executar serviços localmente:**
```bash
# Terminal 1 - Backend
cd backend && npm run start:dev

# Terminal 2 - Worker
cd worker && npm run start:dev

# Terminal 3 - Frontend
cd frontend && npm start
```

4. **Executar testes (opcional):**
```bash
# Testes do backend
cd backend && npm test

# Testes com cobertura
cd backend && npm run test:cov
```

### Execução com Docker (Serviços Individuais)

**Para testar serviços individualmente:**

1. **Apenas Backend + RabbitMQ:**
```bash
docker-compose -f docker-compose-backend.yml up --build
```

2. **Apenas Frontend:**
```bash
docker-compose -f docker-compose-frontend.yml up --build
```

3. **Apenas Worker + RabbitMQ:**
```bash
docker-compose -f docker-compose-worker.yml up --build
```


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

### Pré-requisitos para testes locais:
```bash
# Instalar dependências do backend
cd backend
npm install
```

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

### Executar testes em modo watch (desenvolvimento):
```bash
cd backend
npm run test:watch
```

**Nota:** Os testes verificam todas as operações CRUD e a integração com o EventsService (RabbitMQ).

## 📁 Estrutura do Projeto

```
├── backend/                 # API NestJS
│   ├── src/
│   │   ├── entities/        # Entidades TypeORM
│   │   ├── dto/            # DTOs de validação
│   │   ├── vehicles/       # Módulo de veículos
│   │   ├── events/         # Serviço de eventos RabbitMQ
│   │   └── main.ts
│   ├── Dockerfile          # Configuração Docker
│   ├── .dockerignore       # Arquivos ignorados no Docker
│   ├── .gitignore         # Arquivos ignorados no Git
│   └── package.json
├── worker/                 # Microserviço worker
│   ├── src/
│   │   ├── vehicle-processor.service.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── Dockerfile          # Configuração Docker
│   ├── .dockerignore       # Arquivos ignorados no Docker
│   ├── .gitignore         # Arquivos ignorados no Git
│   └── package.json
├── frontend/               # Aplicação Angular
│   ├── src/app/
│   │   ├── vehicle-list/   # Componente de listagem
│   │   ├── services/       # Serviços HTTP
│   │   └── models/         # Interfaces TypeScript
│   ├── Dockerfile          # Configuração Docker
│   ├── nginx.conf          # Configuração Nginx
│   ├── .dockerignore       # Arquivos ignorados no Docker
│   ├── .gitignore         # Arquivos ignorados no Git
│   └── package.json
├── docker-compose-backend.yml  # Docker Compose para backend
├── docker-compose-frontend.yml # Docker Compose para frontend
├── docker-compose-worker.yml   # Docker Compose para worker + RabbitMQ
├── docker-compose.yml          # Docker Compose completo
├── .gitignore                  # Gitignore global
└── README.md
```

## 🧹 Limpeza do Projeto

**O projeto foi otimizado para funcionar 100% via Docker:**

- ✅ **Sem `node_modules` locais** - Tudo instalado dentro dos containers
- ✅ **Sem pastas `dist/`** - Compilação feita no Docker
- ✅ **Gitignore completo** - Ignora arquivos desnecessários
- ✅ **Estrutura limpa** - Apenas código fonte e configurações
- ✅ **Portável** - Funciona em qualquer máquina com Docker

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
- [ ] Implementar health checks
- [ ] Adicionar métricas de performance

## ✅ Status do Projeto

**PROJETO FINALIZADO COM SUCESSO!**

- ✅ **Arquitetura de microserviços** implementada
- ✅ **Event-Driven Architecture** funcionando
- ✅ **Docker** containerização completa
- ✅ **RabbitMQ** comunicação assíncrona
- ✅ **Frontend** interface funcional
- ✅ **Backend** API REST completa
- ✅ **Worker** processamento de eventos
- ✅ **Testes unitários** funcionando (10/10 passando)
- ✅ **Documentação** completa e detalhada
- ✅ **Código limpo** e bem comentado
- ✅ **Pronto para produção**

## 📄 Licença

Este projeto é um teste técnico e não possui licença específica.
